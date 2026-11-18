const REQUEST_ID_PATTERN = /^[a-zA-Z0-9._-]{8,128}$/;

export function getRequestId(request: Request): string {
  const supplied = request.headers.get("x-request-id");
  if (supplied && REQUEST_ID_PATTERN.test(supplied)) return supplied;
  return crypto.randomUUID();
}
