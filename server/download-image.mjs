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

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
