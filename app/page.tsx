import Link from 'next/link';
import {cookies} from 'next/headers';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import Navbar from '#/components/ui/Navbar/Navbar';
import TypewriterText from '#/components/TypewriterText';

export default async function Index() {
  const supabase = createServerComponentClient({cookies});

  const {
    data: {user},
  } = await supabase.auth.getUser();

  console.log('user', user);

  return (
    <div className="flex w-full flex-col items-center">
      <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
        <div className="text-foreground flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <div />
          {/* @ts-expect-error */}
          <Navbar />
        </div>
      </nav>
      <div className="animate-in flex max-w-4xl flex-col gap-14 px-3 py-16 lg:py-24">
        <div className="mb-4 flex flex-col items-center lg:mb-12">
          <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
          <p className=" mx-auto my-12 max-w-xl text-center text-3xl !leading-tight lg:text-4xl">
            The fastest way to start building apps with <strong>Supabase</strong> and{' '}
            <strong>Next.js</strong>
          </p>
          <div className="bg-foreground text-background rounded-lg px-6 py-3 font-mono text-sm">
            Get started by editing <strong>app/page.tsx</strong>
          </div>
        </div>

        <div className="via-foreground/10 w-full bg-gradient-to-r from-transparent to-transparent p-[1px]" />
        <TypewriterText innerText="未完待續..." className="text-2xl font-bold tracking-[.25rem]" />
      </div>
    </div>
  );
}
