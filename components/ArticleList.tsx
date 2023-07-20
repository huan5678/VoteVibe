import Link from 'next/link';

import {getAllFilesFrontMatter} from '#/lib/mdx';

export default async function ArticleList() {
  const content: any = (await getAllFilesFrontMatter('content')) || [];

  return (
    <>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!content.length && 'No content found.'}
        {content.map((frontMatter: any) => {
          const {slug, publishedOn, readingTime, title, summary, tags} = frontMatter;
          console.log('frontMatter', frontMatter);

          return (
            <li key={slug} className="py-12">
              <article>
                <Link href={`/posts/${slug}`}>
                  <h2>{title}</h2>
                  {/* <h4 className='line-clamp-2 text-gray-400 dark:text-while' >{summary}12312331</h4> */}
                  <p className="text-xs text-gray-400">
                    {' '}
                    {publishedOn} · {readingTime}
                  </p>
                  {/* {tags && <Tags tags={tags} />} */}
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}
