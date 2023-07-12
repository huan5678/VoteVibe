export default function Template({children}: {children: React.ReactNode}) {
  return <main className="flex min-h-screen w-full flex-col">{children}</main>;
}
