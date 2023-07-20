'use client';
import React from 'react';

import {throttle} from '#/lib/utils/format';

const ArticleTableOfContents = ({headings}: any) => {
  const largeEnoughHeadings = headings.filter((h: any) => h.depth <= 3);
  const headingsWithIds = largeEnoughHeadings.map((h: any) => ({
    ...h,
    id: h.url,
  }));
  const activeHeadingId = useActiveHeading(headingsWithIds);

  return headingsWithIds.length < 1 ? null : (
    <aside className="sticky top-20 max-h-[calc(100vh-120px)] overflow-auto pl-5">
      <h3 className="mb-4">目錄</h3>
      {headingsWithIds.map((heading: any, index: any) => (
        <a
          key={index}
          href={`${heading.id}`}
          className={`${
            activeHeadingId === heading.id ? 'text-primary' : 'text-black dark:text-white'
          }
block text-ellipsis text-xl opacity-70 transition-opacity duration-500 hover:opacity-100 hover:duration-0 focus:opacity-100 focus:duration-0`}
          style={{
            fontSize: '14px',
            lineHeight: 1.8,
            paddingLeft: `${(heading.depth - 2) * 18}px`,
          }}
        >
          {heading.value}
        </a>
      ))}
    </aside>
  );
};

const useActiveHeading = (headings: any) => {
  const [activeHeadingId, setActiveHeading] = React.useState(null);
  React.useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.pageYOffset === 0) {
        return setActiveHeading(null);
      }

      let headingBoxes = headings.map(({id}: any) => {
        const elem: any = document.querySelector(`${id}`);
        return {id: id, box: elem.getBoundingClientRect()};
      });

      const TOP_OFFSET = 120;
      let firstHeadingInViewport = headingBoxes.find(({box}: any) => {
        return box.bottom > TOP_OFFSET && box.top < window.innerHeight;
      });

      if (!firstHeadingInViewport) {
        const reversedBoxes = [...headingBoxes].reverse();

        firstHeadingInViewport = reversedBoxes.find(({box}) => {
          return box.bottom < TOP_OFFSET;
        });
      }

      if (!firstHeadingInViewport) {
        setActiveHeading(null);
      } else if (firstHeadingInViewport.id !== activeHeadingId) {
        setActiveHeading(firstHeadingInViewport.id);
      }
    }, 500);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeHeadingId, headings]);

  return activeHeadingId;
};

export default ArticleTableOfContents;
