import "#/styles/global.css";
import { Metadata } from "next";
import SupabaseProvider from "#/components/providers/supabase-provider";
import { Toaster } from "#/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "Next.js App Router",
    template: "%s | Next.js App Router",
  },
  description:
    "A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        {/* <SupabaseProvider> */}
        <main className="md:min-h[calc(100dvh-5rem)] min-h-[calc(100dvh-4rem)]">
          {children}
        </main>
        <Toaster />
        {/* </SupabaseProvider> */}
      </body>
    </html>
  );
}
