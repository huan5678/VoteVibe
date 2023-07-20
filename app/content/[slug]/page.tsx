import {getFileBySlug} from '#/lib/mdx';
import {MDXLayoutRenderer} from '#/components/mdx';
import ArticlePanel from '#/components/ui/Articles/ArticlePanel';
import ArticleTableOfContents from '#/components/ui/Articles/ArticleTableOfContents';
import ContentWrapper from '#/layouts/ContentWrapper';

const Page = async ({params}: any) => {
  const contents = getFileBySlug('contents', params.slug);
  const {code, toc, frontMatter} = (await contents) as any;

  return (
    <>
      <div
        className="bg-sky-100 dark:bg-sky-950"
        style={{height: '100px', marginTop: '-100px'}}
      ></div>
      <ArticlePanel frontMatter={frontMatter} />
      <ContentWrapper>
        <div className="sticky top-0 bg-white dark:bg-black" style={{height: '64px'}}></div>
        <section className="flex justify-between space-x-28">
          <section
            className="reset dark:reset-dark flex-auto"
            style={{width: '100%', maxWidth: 'none', marginTop: '100px'}}
          >
            <MDXLayoutRenderer code={code} />
          </section>
          <section className="hidden sm:block" style={{marginTop: '100px', width: '200px'}}>
            <ArticleTableOfContents headings={toc} />
          </section>
        </section>
      </ContentWrapper>
    </>
  );
};

export default Page;
