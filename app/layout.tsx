import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import "@mantine/core/styles.css";
import { MantineProvider, Center } from "@mantine/core";

const inter = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "전국 문해력 테스트",
  description: "우리 학교의 문해력 랭킹은?",
  openGraph: {
    images: [
      {
        url: "https://ebneycbqwtuhyxggghia.supabase.co/storage/v1/object/public/jmt/jmt-banner.jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          backgroundImage: "url('/web-background.png')",
          backgroundRepeat: "repeat",
        }}
      >
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
