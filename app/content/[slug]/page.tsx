import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';

import {MDXRemote} from 'next-mdx-remote/rsc';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('contents'));

  console.log('generateStaticParams-files', files);

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));

  return paths;
}

export async function generateMetadata({params}: any) {
  const content = getPost(params);

  return {
    title: content.frontMatter.title,
    description: content.frontMatter.description,
  };
}

function getPost({slug}: {slug: string}) {
  const markdownFile = fs.readFileSync(path.join('contents', slug + '.mdx'), 'utf-8');

  const {data: frontMatter, content} = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export default async function Page({params}: {params: {slug: string}}) {
  const props = getPost(params);
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
      <h1>{props.frontMatter.title}</h1>

      {/* @ts-expect-error Server Component*/}
      <MDXRemote source={props.content} options={options} />
    </article>
  );
}
