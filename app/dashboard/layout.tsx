import Link from 'next/link';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <nav className="border-b-2 border-b-slate-100 py-4">
        <div className="flex justify-between items-center container">
          <Link href="/">
            <h2 className="font-bold font-mono text-3xl">LOGO</h2>
          </Link>
          <div className="flex gap-4">
            <Link href="/login">Login</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>
      </nav>
      {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div> */}
      {children}
    </section>
  );
}
