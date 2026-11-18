import { ApiError } from "./api-error";

export function successResponse<T>(data: T, init?: ResponseInit): Response {
  return Response.json({ ok: true, data }, init);
}

export function errorResponse(error: unknown, requestId?: string): Response {
  const known = error instanceof ApiError;
  const status = known ? error.status : 500;
  const payload = {
    ok: false,
    error: {
      code: known ? error.code : "INTERNAL_SERVER_ERROR",
      message: known ? error.message : "Terjadi kesalahan pada server.",
      ...(requestId ? { requestId } : {}),
    },
  };

  return Response.json(payload, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
