import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const directoryPath = path.join(process.cwd(), "public", "images");
  const files = await fs.promises.readdir(directoryPath);
  const randomImage = files[Math.floor(Math.random() * files.length)];
  return new Response(`images/${randomImage}`, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}