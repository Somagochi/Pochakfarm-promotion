export async function downloadImage(query) {
  const imageUrl = typeof query.url === "string" ? query.url : "";
  if (!/^https?:\/\//.test(imageUrl) && !imageUrl.startsWith("data:image/")) {
    throw httpError(400, "다운로드할 이미지 주소가 올바르지 않아요.");
  }

  if (imageUrl.startsWith("data:image/")) {
    const match = imageUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (!match) {
      throw httpError(400, "다운로드할 이미지 데이터가 올바르지 않아요.");
    }

    return {
      body: Buffer.from(match[2], "base64"),
      contentType: match[1],
    };
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw httpError(response.status, "이미지를 다운로드하지 못했어요.");
  }

  const contentType = response.headers.get("content-type") || "image/png";
  const body = Buffer.from(await response.arrayBuffer());
  return { body, contentType };
}

export function getDownloadFilename(query) {
  const rawName = typeof query.name === "string" ? query.name : "character-card";
  const safeName = rawName
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "-")
    .trim();
  return `${safeName || "character-card"}.png`;
}

// HTTP header values must be Latin1 — Korean/emoji characters in the
// filename throw "Invalid character in header content" if written as-is.
// RFC 6266 filename* carries the real UTF-8 name; filename is an ASCII
// fallback for clients that don't understand filename*.
export function getContentDisposition(filename) {
  const asciiFallback = filename.replace(/[^\x20-\x7e]/g, "_");
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
