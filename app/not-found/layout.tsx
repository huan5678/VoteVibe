import {getCategories} from '#/app/api/categories/getCategories';
import React from 'react';

export const metadata = {
  title: 'Not Found',
};

export default async function Layout({children}: {children: React.ReactNode}) {
  const categories = await getCategories();

  return (
    <div className="space-y-9">
      <div className="flex justify-between"></div>

      <div>{children}</div>
    </div>
  );
}
