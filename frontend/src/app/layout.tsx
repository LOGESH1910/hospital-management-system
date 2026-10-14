import "./global.css";

export const metadata = {
  title: "MediCare Pro",
  description: "Smarter Healthcare. Better Patient Care.",
};

import type { ReactNode } from "react";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>MediCare Pro - Smarter Healthcare. Better Patient Care.</title>
      </Head>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}