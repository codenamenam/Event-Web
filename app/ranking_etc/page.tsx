"use client";

import {
  Button,
  Center,
  Flex,
  Text,
  Table,
  Divider,
  rgba,
} from "@mantine/core";
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


  // 내 학교 정보
  interface schoolInfo {
    school_name: string;
    school_ranking: number;
    student_count: number;
    total_score: number;
    average_score: number;
    school_id: number;
  }

  const [mySchoolRanking, setMySchoolRanking] = useState<schoolInfo>({
    school_name: "",
    school_ranking: 0,
    student_count: 0,
    total_score: 0,
    average_score: 0,
    school_id: 0,
  });

  // 학교별 랭킹 정보
  const [rankings, setRankings] = useState<schoolInfo[]>([
    {
      school_name: "",
      school_ranking: 1,
      student_count: 0,
      total_score: 0,
      average_score: 0,
      school_id: 0,
    },
  ]);


  // 링크 복사
  const handleCopy = () => {
    let nowUrl = window.location.href;
    //nowUrl 변수에 담긴 주소를 복사
    navigator.clipboard.writeText(nowUrl).then((res) => {
      alert("주소가 복사되었습니다!");
    });
  };

  useEffect(() => {
    handleLeagueClick("etc");
  }, []);

  // 학생 리그 분류
  const [activeButton, setActiveButton] = useState<string>("etc");

  const handleLeagueClick = async (type: string) => {
    setActiveButton(type);
    const result = await axios.get(
      "/ranking_etc/api/getTopSchoolRankingGroup/?type=" + type
    );
    if (result.status === 200) {
      setRankings(result.data);
    }
  };

  return (
    <div style={{ backgroundImage: "url('/web-background.png')" }}>
      <Center
        style={{ backgroundImage: "url('/web-background.png')" }}
      >
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
              2023학년도
            </Text>
            <Text style={{ fontSize: "25px", fontWeight: "700" }}>
              전국 문해능력시험 성적통지표
            </Text>
          </Flex>

          <Button
            component={Link}
            href="https://pf.kakao.com/_zmTAG/chat"
            variant="outline"
            radius={"xl"}
            style={{ margin: "10px 0 30px 0", width: "20 0px" }}
            color="red"
          >
            <Text style={{ fontWeight: "600", fontSize: "16px" }}>
              시험 응시하기
            </Text>
          </Button>
          
          <Button.Group style={{ marginTop: "20px" }}>
            <Button
              variant="default"
              style={{
                width: "100px",
                backgroundColor:
                  activeButton === "etc"
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(0,0,0,0.02)",
                borderRadius: "5px 0px 0px 5px",
              }}
              onClick={() => handleLeagueClick("etc")}
            >
              <Text style={{ fontSize: "13px", fontWeight: "700" }}>학생</Text>
            </Button>
            <Button
              variant="default"
              style={{
                width: "100px",
                backgroundColor:
                  activeButton === "univ"
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(0,0,0,0.02)",
                borderRadius: "0px 5px 5px 0px",
              }}
              onClick={() => handleLeagueClick("univ")}
            >
              <Text style={{ fontSize: "13px", fontWeight: "700" }}>
                대학생
              </Text>
            </Button>
          </Button.Group>

          <div
            style={{
              minHeight: "100px",
              maxHeight: "370px",
              overflowY: "auto",
              margin: "10px 0px 30px 0px",
            }}
          >
            <Table
              style={{
                margin: "0px",
                width: "345px",
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th
                    style={{
                      textAlign: "center",
                      fontSize: "13px",
                      padding: "0px",
                    }}
                  >
                    등수
                  </Table.Th>
                  <Table.Th
                    style={{
                      textAlign: "center",
                      fontSize: "13px",
                      padding: "0px",
                    }}
                  >
                    학교 이름
                  </Table.Th>
                  <Table.Th style={{ textAlign: "center", fontSize: "13px" }}>
                    참여
                  </Table.Th>

                  <Table.Th
                    style={{
                      textAlign: "center",
                      fontSize: "13px",
                      padding: "0px",
                    }}
                  >
                    평균
                  </Table.Th>
                  <Table.Th
                    style={{
                      textAlign: "center",
                      fontSize: "13px",
                      padding: "0px",
                    }}
                  >
                    총점
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rankings.map((element) => (
                  <Table.Tr key={element.school_id}>
                    <Table.Td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "0px",
                      }}
                    >
                      {element.school_ranking}
                    </Table.Td>
                    <Table.Td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "0px",
                      }}
                      className={gowun.className}
                    >
                      {element.school_name}
                    </Table.Td>
                    <Table.Td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "7px 0px 7px 0px",
                      }}
                      className={gowun.className}
                    >
                      {element.student_count}
                    </Table.Td>

                    <Table.Td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "7px 0px 7px 0px",
                      }}
                      className={gowun.className}
                    >
                      {element.average_score}
                    </Table.Td>
                    <Table.Td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className={gowun.className}
                    >
                      {element.total_score}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Flex>
      </Center>
      <Center>
        <Flex
          direction="column"
          style={{ margin: "0px 0px 20px 0px", width: "330px" }}
        >
          <Text
            style={{
              fontSize: "18px",
              fontWeight: "600",
            }}
            className={ibm.className}
          >
            참여 방법
          </Text>

          <Divider style={{ margin: "3px 0px 9px 0px" }} />

          <Flex direction={"column"}>
            <Flex justify={"space-between"}>
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "rgba(0,0,0,0.7)",
                }}
                className={ibm.className}
              >
                1. [시험 응시하기] 누르고 [문해력 테스트] 클릭하기
              </Text>
            </Flex>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "rgba(0,0,0,0.7)",
                margin: "10px 0px 0px 0px"
              }}
              className={ibm.className}
            >
              2. 카카오 채널에서 [문해력 테스트] 응시하기
            </Text>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "rgba(0,0,0,0.7)",
                margin: "10px 0px 0px 0px"
              }}
              className={ibm.className}
            >
              3. 우리 학교 1등 만들고 간식 받기 🍔
            </Text>
          </Flex>
        </Flex>
      </Center>
     
    </div>
  );
}
