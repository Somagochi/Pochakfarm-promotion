import {
  downloadImage,
  getDownloadFilename,
  getContentDisposition,
} from "../server/download-image.mjs";

export const config = {
  maxDuration: 15,
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const payload = await downloadImage(req.query || {});
    res.setHeader("Content-Type", payload.contentType);
    res.setHeader(
      "Content-Disposition",
      getContentDisposition(getDownloadFilename(req.query || {})),
    );
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(payload.body);
  } catch (error) {
    res.status(error.status || 500).json({
      error:
        error instanceof Error
          ? error.message
          : "이미지 다운로드 중 오류가 발생했어요.",
    });
  }
}
