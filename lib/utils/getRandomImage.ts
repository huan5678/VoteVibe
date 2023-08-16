import fs from "fs";
import path from "path";

export const getRandomImage = async (folder: string) => {
  const directoryPath = path.join(process.cwd(), 'public', folder);
  const files = await fs.promises.readdir(directoryPath);
  const randomImage = files[Math.floor(Math.random() * files.length)];
  return randomImage;
};
