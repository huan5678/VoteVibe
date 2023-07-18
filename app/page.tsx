import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';

import Navbar from '#/components/ui/Navbar/Navbar';

export default async function Index() {
  const supabase = createServerComponentClient({cookies});

  const {
    data: {user},
  } = await supabase.auth.getUser();

  console.log('user', user);

  return (
    <div className="flex flex-col items-center w-full">
      <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
        <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm text-foreground">
          <div />
          {/* @ts-expect-error */}
          <Navbar />
        </div>
      </nav>
      <div className="flex flex-col max-w-4xl px-3 py-16 animate-in gap-14 lg:py-24">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
          <p className=" mx-auto my-12 max-w-xl text-center text-3xl !leading-tight lg:text-4xl">
            The fastest way to start building apps with <strong>Supabase</strong> and{' '}
            <strong>Next.js</strong>
          </p>
          <div className="px-6 py-3 font-mono text-sm rounded-lg bg-foreground text-background">
            Get started by editing <strong>app/page.tsx</strong>
          </div>
        </div>

        <div className="via-foreground/10 w-full bg-gradient-to-r from-transparent to-transparent p-[1px]" />
      </div>
    </div>
  );
}
