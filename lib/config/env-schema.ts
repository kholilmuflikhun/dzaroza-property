import { z } from "zod";

const optionalUrl = z.union([z.string().url(), z.literal("")]).optional();
const optionalSecret = z.string().min(1).optional();

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_WHATSAPP_PRIMARY: z.string().default(""),
  NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: z.string().default(""),
  NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION: z.enum(["true", "false"]).default("false"),
});

export const serverEnvSchema = z.object({
  DATABASE_URL: optionalUrl,
  NEXTAUTH_URL: optionalUrl,
  NEXTAUTH_SECRET: optionalSecret,
  GOOGLE_CLIENT_ID: optionalSecret,
  GOOGLE_CLIENT_SECRET: optionalSecret,
  ADMIN_EMAILS: z.string().default(""),
  GOOGLE_SHEETS_CLIENT_EMAIL: z.string().email().optional().or(z.literal("")),
  GOOGLE_SHEETS_PRIVATE_KEY: optionalSecret,
  GOOGLE_SHEETS_SPREADSHEET_ID: z.string().default(""),
  GOOGLE_SHEETS_ORDER_RANGE: z.string().default("Order!A:G"),
  GOOGLE_SHEETS_TESTIMONIAL_RANGE: z.string().default("Testimoni!A:G"),
  MIDTRANS_SERVER_KEY: optionalSecret,
  MIDTRANS_CLIENT_KEY: optionalSecret,
  MIDTRANS_IS_PRODUCTION: z.enum(["true", "false"]).default("false"),
  BLOB_READ_WRITE_TOKEN: optionalSecret,
  UPLOAD_SECRET: optionalSecret,
  UPSTASH_REDIS_REST_URL: optionalUrl,
  UPSTASH_REDIS_REST_TOKEN: optionalSecret,
});
