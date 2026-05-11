import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ClientOnly } from "@/components/ClientOnly";
import { Suspense } from "react";
import { UserInfo } from "@/components/UserInfo";
import { UserQueryPreloadLink } from "@/utils/users";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Next.js Example: SSR Cacheable Content & Preload Dynamic Content",
  description: "Next.js Example: SSR Cacheable Content & Preload Dynamic Content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname()
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Providers>
          <div className="p-2 flex gap-2 text-lg">
            <Link
              href="/"
              // className={pathname === '/' ? 'font-bold' : ''}
            >
              Home
            </Link>{' '}
            <Link
              href="/posts"
              // className={pathname.startsWith('/posts') ? 'font-bold' : ''}
            >
              Posts
            </Link>{' '}
            <UserQueryPreloadLink />
            <Suspense fallback='⌛'>
              <ClientOnly fallback='⌛'>
                <UserInfo />
              </ClientOnly>
            </Suspense>
          </div>
          <hr />
          {children}
        </Providers>
      </body>
    </html>
    )
}
