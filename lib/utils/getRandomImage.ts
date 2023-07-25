import fs from "fs";
import path from "path";

export const getRandomImage = async () => {
  const directoryPath = path.join(process.cwd(), "public", "images");
  const files = await fs.promises.readdir(directoryPath);
  const randomImage = files[Math.floor(Math.random() * files.length)];
  return randomImage;
};
