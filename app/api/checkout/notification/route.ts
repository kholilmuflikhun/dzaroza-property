import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getOrder, isRedisConfigured, updateOrder, type OrderStatus } from "@/lib/redis";

// ---------------------------------------------------------------------------
// app/api/checkout/notification/route.ts
//
// Endpoint webhook yang dipanggil Midtrans secara server-to-server setiap kali
// status transaksi berubah (settlement, pending, deny, expire, cancel).
// Daftarkan URL ini di dashboard Midtrans:
//   Settings → Configuration → Payment Notification URL
//   -> https://domain-anda.com/api/checkout/notification
//
// PENTING: jangan percaya status dari redirect di browser (bisa dimanipulasi).
// Selalu verifikasi lewat signature_key di webhook ini sebelum menandai
// pesanan sebagai "lunas".
// ---------------------------------------------------------------------------

function verifySignature(payload: {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
}) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
  const raw = `${payload.order_id}${payload.status_code}${payload.gross_amount}${serverKey}`;
  const expected = crypto.createHash("sha512").update(raw).digest("hex");

  // Bandingkan dengan timingSafeEqual, bukan `===`, untuk mencegah timing
  // attack saat menebak signature yang valid.
  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(payload.signature_key ?? "", "hex");
  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}

export async function POST(request: NextRequest) {
  try {
    if (!isRedisConfigured()) {
      return NextResponse.json({ success: false, message: "Order storage belum dikonfigurasi." }, { status: 503 });
    }
    if (!process.env.MIDTRANS_SERVER_KEY) {
      return NextResponse.json({ success: false, message: "Payment gateway belum dikonfigurasi." }, { status: 503 });
    }

    const payload = await request.json();
    const { order_id, status_code, gross_amount, signature_key } = payload ?? {};

    if (
      typeof order_id !== "string" ||
      typeof status_code !== "string" ||
      typeof gross_amount !== "string" ||
      typeof signature_key !== "string" ||
      typeof payload.transaction_status !== "string" ||
      order_id.length < 1 || order_id.length > 128 ||
      !/^\d{3}$/.test(status_code) ||
      !/^\d+(?:\.\d{1,2})?$/.test(gross_amount) ||
      !/^[a-f0-9]{128}$/i.test(signature_key)
    ) {
      return NextResponse.json({ success: false, message: "Payload tidak valid." }, { status: 400 });
    }

    const isValid = verifySignature({ order_id, status_code, gross_amount, signature_key });
    if (!isValid) {
      console.warn("[api/checkout/notification] Signature tidak valid untuk order:", order_id);
      return NextResponse.json({ success: false, message: "Signature tidak valid." }, { status: 403 });
    }

    const order = await getOrder(order_id);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order tidak ditemukan." }, { status: 404 });
    }
    if (Number(gross_amount) !== order.grossAmount) {
      return NextResponse.json({ success: false, message: "Nominal transaksi tidak cocok." }, { status: 400 });
    }

    if (payload.transaction_status === "capture" && payload.fraud_status !== "accept") {
      return NextResponse.json({ success: true, ignored: true });
    }

    const statusMap: Record<string, OrderStatus> = Object.assign(Object.create(null) as Record<string, OrderStatus>, {
      settlement: "paid",
      capture: "paid",
      pending: "pending",
      deny: "failed",
      expire: "expired",
      cancel: "cancelled",
      failure: "failed",
    });
    if (!Object.hasOwn(statusMap, payload.transaction_status)) {
      return NextResponse.json({ success: true, ignored: true });
    }
    const nextStatus = statusMap[payload.transaction_status];

    // Never downgrade a terminal order because webhook deliveries can arrive out of order.
    const shouldUpdate = order.status === "pending" || nextStatus === "paid";
    if (shouldUpdate) {
      await updateOrder(order_id, {
        status: nextStatus,
        transactionStatus: payload.transaction_status,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/checkout/notification] Gagal memproses notifikasi:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
