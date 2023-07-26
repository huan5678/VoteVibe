export default function Template({children}: {children: React.ReactNode}) {
  return <div className="flex min-h-screen w-full flex-col">{children}</div>;
}
