"use client";

import { Button, Center, Flex, Text, TextInput } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import html2canvas from "html2canvas";

import { useEffect, useRef, useState } from "react";
import { Gowun_Batang, IBM_Plex_Sans_KR, Noto_Sans_KR } from "next/font/google";
import { usePathname } from "next/navigation";
import axios from "axios";

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
  // 라우팅 처리
  const [schoolName, setSchoolName] = useState("");

  return (
    <div>
      <Center style={{ backgroundImage: "url('/web-background.png')" }}>
        <Flex
          direction={"column"}
          style={{
            width: "340px",
            marginTop: "50px",
          }}
          align={"center"}
        >
          <Flex direction={"column"} align={"center"}>
            <Text
              style={{ fontSize: "18px", fontWeight: "600", color: "gray" }}
            >
              1교시 국어영역
            </Text>
            <Text style={{ fontSize: "25px", fontWeight: "700" }}>
              2023학년도 전국 문해능력시험
            </Text>
          </Flex>
        </Flex>
      </Center>

      <Center>
        <Flex
          style={{
            margin: "30px",
          }}
          direction={"column"}
          align={"center"}
        >
          <Flex>
            <TextInput
              placeholder="학교 이름을 입력해주세요"
              leftSection={
                <Image
                  src={"/search-icon.png"}
                  width={15}
                  height={15}
                  alt="search icon"
                />
              }
              onChange={(event) => {
                setSchoolName(event.currentTarget.value);
              }}
              style={{
                width: "330px",
              }}
              rightSection={
                <Link
                  href={{
                    pathname: "/result",
                    query: { name: schoolName },
                  }}
                >
                  <Button
                    variant="filled"
                    color="blue"
                    style={{
                      padding: "3px 10px 3px 10px",
                      height: "34.9px",
                      borderRadius: "0px 3px 3px 0px",
                    }}
                  >
                    <Text style={{ fontSize: "13px", fontWeight: "500" }}>
                      검색
                    </Text>
                  </Button>
                </Link>
              }
            />
          </Flex>
          <Flex
            direction={"column"}
            style={{
              border: "1px solid ",
              padding: "10px",
              width: "330px",
              marginTop: "50px",
            }}
            gap={3}
          >
            <Text style={{ fontSize: "15px" }}>
              ◦ 문제지의 해당란에 학교 이름을 정확히 쓰시오.{" "}
            </Text>
            <Text style={{ fontSize: "15px" }}>
              ◦ 답안지의 필적 확인란에 다음의 문구를 정자로 기재하시오.{" "}
            </Text>
            <Center
              style={{
                border: "0.5px solid ",
                backgroundColor: "rgba(0,0,0,0.2)",
                padding: "5px",
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                하루 5분 독서 챌린지, 도파민 디펜스!
              </Text>
            </Center>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
}
