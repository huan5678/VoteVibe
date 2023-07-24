import { getFileBySlug } from "#/lib/mdx";
import { MDXLayoutRenderer } from "#/components/mdx";
import ArticlePanel from "#/components/ui/Articles/ArticlePanel";
import ArticleTableOfContents from "#/components/ui/Articles/ArticleTableOfContents";
import ContentWrapper from "#/layouts/ContentWrapper";

const Page = async ({ params }: any) => {
  const contents = getFileBySlug("contents", params.slug);
  const { code, toc, frontMatter } = (await contents) as any;

  return (
    <>
      <div className="mt-[-6.25rem] h-[6.25rem] bg-sky-100 dark:bg-sky-950"></div>
      <ArticlePanel frontMatter={frontMatter} />
      <ContentWrapper>
        <div className="sticky top-0 h-[4rem] bg-white dark:bg-black"></div>
        <section className="flex justify-between space-x-28">
          <section className="reset dark:reset-dark mt-[6.25rem] w-full flex-auto">
            <MDXLayoutRenderer code={code} />
          </section>
          <section className="mt-[6.25rem] hidden w-[12.5rem] sm:block">
            <ArticleTableOfContents headings={toc} />
          </section>
        </section>
      </ContentWrapper>
    </>
  );
};

export default Page;
