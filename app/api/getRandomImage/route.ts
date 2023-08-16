import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const folder = request.url.split('?')[1];
  const directoryPath = path.join(process.cwd(), 'public', folder);
  const files = await fs.promises.readdir(directoryPath);
  const randomImage = files[Math.floor(Math.random() * files.length)];

  return new Response(JSON.stringify({name: `/images/${randomImage}`}), {
    status: 200,
    headers: {
      'content-type': 'text/plain',
    },
  });
}
