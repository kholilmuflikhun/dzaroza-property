export type BoundedBodyResult =
  | { ok: true; bytes: Uint8Array }
  | { ok: false; status: 400 | 413; message: string };

export type BoundedJsonResult<T> =
  | { ok: true; value: T }
  | { ok: false; status: 400 | 413; message: string };

/**
 * Reads a request body with a hard streaming byte limit. Content-Length is an
 * early rejection hint only; the streamed byte count is always authoritative.
 */
export async function readBoundedBody(
  request: Request,
  maxBytes: number
): Promise<BoundedBodyResult> {
  if (!Number.isSafeInteger(maxBytes) || maxBytes < 1) {
    throw new RangeError("maxBytes must be a positive safe integer");
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    if (!/^\\d+$/.test(declaredLength)) {
      return { ok: false, status: 400, message: "Format data tidak valid." };
    }
    if (Number(declaredLength) > maxBytes) {
      return { ok: false, status: 413, message: "Payload terlalu besar." };
    }
  }

  if (!request.body) {
    return { ok: false, status: 400, message: "Format data tidak valid." };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { ok: false, status: 413, message: "Payload terlalu besar." };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400, message: "Format data tidak valid." };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { ok: true, bytes };
}

export async function readBoundedJson<T>(
  request: Request,
  maxBytes: number
): Promise<BoundedJsonResult<T>> {
  const body = await readBoundedBody(request, maxBytes);
  if (!body.ok) return body;

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(body.bytes);
    return { ok: true, value: JSON.parse(text) as T };
  } catch {
    return { ok: false, status: 400, message: "Format data tidak valid." };
  }
}
