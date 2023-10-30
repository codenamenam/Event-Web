import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@mantine/core/styles.css";
import { MantineProvider, Center } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "전국 문해력 테스트",
  description: "우리 학교의 문해력 랭킹은?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
