import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import getAllFilesRecursively from "#/lib/utils/files";
// Remark packages
import remarkGfm from "remark-gfm";
// import remarkFootnotes from 'remark-footnotes'
import remarkMath from "remark-math";
// import remarkExtractFrontmatter from './remark-extract-frontmatter'
// import remarkCodeTitles from './remark-code-title'
import remarkTocHeadings from "./remark-toc-headings";
// import remarkImgToJsx from './remark-img-to-jsx'
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkToc from "remark-toc";

import rehypeKatex from "rehype-katex";
// import rehypeCitation from 'rehype-citation'
import rehypePrism from "rehype-prism-plus";
// import rehypePresetMinify from 'rehype-preset-minify'
import { default as dayjs } from "dayjs";
const root = process.cwd();

export function getFiles(type: any) {
  const prefixPaths = path.join(root, "data", type);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file: any) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/")
  );
}

export function formatSlug(slug: any) {
  return slug.replace(/\.(mdx|md)/, "");
}

export function dateSortDesc(a: any, b: any) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export async function getFileBySlug(type: any, slug: any) {
  const mdxPath = path.join(root, "data", type, `${slug}.mdx`);
  const mdPath = path.join(root, "data", type, `${slug}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf8")
    : fs.readFileSync(mdPath, "utf8");

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  let toc: any = [];

  const { code, frontmatter } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, "components"),
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        // remarkExtractFrontmatter,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        // remarkCodeTitles,
        // [remarkFootnotes, { inlineNotes: true }],
        remarkToc,
        remarkMath,
        // remarkImgToJsx,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        // [rehypeCitation, { path: path.join(root, 'data') }],
        [
          rehypePrism,
          {
            ignoreMissing: true, // 忽略不支持语言的报错行为
            // showLineNumbers: true // 是否显示行号
          },
        ],
        // rehypePresetMinify,
      ];
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".ts": "tsx",
      };
      return options;
    },
  });

  return {
    code,
    toc,
    frontMatter: {
      ...frontmatter,

      readingTime: readingTime(code),
      publishedOn: dayjs(frontmatter?.publishedOn).format(
        "YYYY/MM/DD HH:mm:ss"
      ),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
    },
  };
}

// 获取所有文件的元信息
export async function getAllFilesFrontMatter(folder: any) {
  const prefixPaths = path.join(root, "data", folder);

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter: any = [];

  files.forEach((file: any) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    // Remove Unexpected File
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }
    const source = fs.readFileSync(file, "utf8");
    const { data: frontmatter, content } = matter(source);
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        title: frontmatter?.title,
        publishedOn: dayjs(frontmatter?.publishedOn).format(
          "YYYY/MM/DD HH:mm:ss"
        ),
        // publishedOn: dayjs(frontmatter?.publishedOn).format('YYYY/MM/DD HH:mm:ss'),
        readingTime: readingTime(source).text,
        slug: formatSlug(fileName),
        // date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      });
    }
  });

  return allFrontMatter.sort((a: any, b: any) => dateSortDesc(a.date, b.date));
}
