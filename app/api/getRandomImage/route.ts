import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const directoryPath = path.join(process.cwd(), "public", "images");
  const files = await fs.promises.readdir(directoryPath);
  const randomImage = files[Math.floor(Math.random() * files.length)];
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return new Response(JSON.stringify({ name: `/images/${randomImage}` }), {
    status: 200,
    headers: {
      "content-type": "text/plain",
=======
  return new Response(JSON.stringify({name: `/images/${randomImage}`}), {
    status: 200,
    headers: {
      'content-type': 'text/plain',
>>>>>>> Stashed changes
=======
  return new Response(JSON.stringify({name: `/images/${randomImage}`}), {
    status: 200,
    headers: {
      'content-type': 'text/plain',
>>>>>>> Stashed changes
    },
  });
}
