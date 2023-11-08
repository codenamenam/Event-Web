"use client";

import { Button, Center, Flex, Text, Table, Divider } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useEffect, useRef, useState } from "react";
import {
  Noto_Serif_KR,
  Gowun_Batang,
  IBM_Plex_Sans_KR,
  Noto_Sans_KR,
} from "next/font/google";
import { useRouter } from "next/navigation";

const gowun = Gowun_Batang({
  subsets: ["latin"],
  weight: "700",
});
const ibm = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: "600",
});
const ns = Noto_Sans_KR({ subsets: ["latin"], weight: "500", display: "swap" });

export default function Home() {
  const router = useRouter();

  interface rankingInfo {
    schoolName: string;
    ranking: number;
    total: number;
    totalScore: number;
    average: number;
  }

  const myRanking: rankingInfo = {
    schoolName: "반곡중학교",
    ranking: 244,
    total: 44,
    totalScore: 424,
    average: 9.4,
  };

  const rankings: rankingInfo[] = [
    {
      schoolName: "북원여자고등학교",
      ranking: 1,
      total: 43,
      totalScore: 535,
      average: 9.4,
    },
    {
      schoolName: "원주여자고등학교",
      ranking: 2,
      total: 35,
      totalScore: 252,
      average: 9.3,
    },
    {
      schoolName: "상지여자고등학교",
      ranking: 3,
      total: 455,
      totalScore: 2442,
      average: 9.1,
    },
  ];

  const divRef = useRef<HTMLDivElement>(null);

  // 다운로드 제어
  const handleDownload = async () => {
    try {
      const div = divRef.current;
      if (div) {
        const canvas = await html2canvas(div, { scale: 2 });

        canvas.toBlob((blob) => {
          if (blob !== null) {
            //saveAs(blob, "result.png");
            const url = URL.createObjectURL(blob);
            router.push(url);
          }
        });
      }
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/web-background.png')",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        style={{ padding: "20px" }}
      >
        <Text
          style={{ fontSize: "25px", fontWeight: "500", marginTop: "200px" }}
        >
          채팅방 하단의 <br />
          문해력 테스트를 클릭하고 <br />
          바로 참여해보세요!
        </Text>
      </Flex>
    </div>
  );
}
