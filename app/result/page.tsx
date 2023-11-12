"use client";

import { Button, Center, Flex, Text, Table } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { Gowun_Batang, IBM_Plex_Sans_KR, Noto_Sans_KR } from "next/font/google";
import { useSearchParams } from "next/navigation";
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

  // 라우팅 처리
  const searchParams = useSearchParams();
  const school_name = searchParams.get("name");

  useEffect(() => {
    handleLeagueClick("etc");
  }, []);

  // 학생 리그 분류
  const [activeButton, setActiveButton] = useState<string>("etc");

  const handleLeagueClick = async (type: string) => {
    setActiveButton(type);
    const result = await axios.get("result/api/?query=" + type);
    if (result.status === 200) {
      const smallResult = result.data.slice(0, 3);
      setRankings(smallResult);
    }
  };

  return (
    <div style={{ backgroundImage: "url('/web-background.png')" }}>
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
            style={{ margin: "10px 0 15px 0", width: "20 0px" }}
            color="red"
          >
            <Text style={{ fontWeight: "600", fontSize: "16px" }}>
              시험 응시하기
            </Text>
          </Button>
          <Text
            style={{
              fontSize: "14px",
              fontWeight: "700",
              margin: "0px 0px 0px 0px",
              padding: "5px",
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            시험 응시하기를 누르고 전체 순위를 확인해보세요!
          </Text>
          <div
            className={ibm.className}
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              padding: "10px 0px 0 0",
              borderRadius: "10px",
              backdropFilter: "blur(10px)",
            }}
          >
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              style={{ width: "300px", padding: "10px" }}
            >
              <Text
                style={{
                  fontSize: "27px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                {school_name}
              </Text>
            </Flex>
            <Flex align={"center"}>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.02)",
                    width: "100px",
                    height: "30px",
                    borderRadius: "5px 0 0 0",
                  }}
                >
                  <Text style={{ fontSize: "14px", fontWeight: "600" }}>
                    학교 순위
                  </Text>
                </Center>
                <Center
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Text
                    style={{ fontSize: "20px", fontWeight: "500" }}
                    className={ibm.className}
                  >
                    ?위
                  </Text>
                </Center>
              </Flex>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.02)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "14px", fontWeight: "600" }}>
                    내 점수
                  </Text>
                </Center>
                <Center
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Text
                    style={{ fontSize: "20px", fontWeight: "500" }}
                    className={ibm.className}
                  >
                    ?
                  </Text>
                </Center>
              </Flex>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.02)",
                    width: "100px",
                    height: "30px",
                    borderRadius: "0 5px 0 0",
                  }}
                >
                  <Text style={{ fontSize: "14px", fontWeight: "600" }}>
                    교내 순위
                  </Text>
                </Center>

                <Center
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Text
                    style={{ fontSize: "20px", fontWeight: "500" }}
                    className={ibm.className}
                  >
                    ?등
                  </Text>
                </Center>
              </Flex>
            </Flex>

            <Flex align={"center"}>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.02)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "14px", fontWeight: "600" }}>
                    전체 참여자수
                  </Text>
                </Center>
                <Center
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Text
                    style={{ fontSize: "20px", fontWeight: "500" }}
                    className={ibm.className}
                  >
                    ?명
                  </Text>
                </Center>
              </Flex>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.02)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "14px", fontWeight: "600" }}>
                    총점
                  </Text>
                </Center>
                <Center
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Text
                    style={{ fontSize: "20px", fontWeight: "500" }}
                    className={ibm.className}
                  >
                    ?점
                  </Text>
                </Center>
              </Flex>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.02)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "14px", fontWeight: "600" }}>
                    평균 점수
                  </Text>
                </Center>

                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.02)",
                    width: "100px",
                    height: "50px",
                  }}
                >
                  <Text
                    style={{ fontSize: "20px", fontWeight: "500" }}
                    className={ibm.className}
                  >
                    ?점
                  </Text>
                </Center>
              </Flex>
            </Flex>
          </div>

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
                      className={ibm.className}
                    >
                      {element.school_name}
                    </Table.Td>
                    <Table.Td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "7px 0px 7px 0px",
                      }}
                      className={ibm.className}
                    >
                      {element.student_count}
                    </Table.Td>

                    <Table.Td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "7px 0px 7px 0px",
                      }}
                      className={ibm.className}
                    >
                      {element.average_score}
                    </Table.Td>
                    <Table.Td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className={ibm.className}
                    >
                      {element.total_score}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            {rankings.length > 1 && (
              <Image
                src={"/blur-result.png"}
                width={0}
                height={0}
                sizes="100vh"
                style={{
                  width: "100%",
                  height: "auto",
                  filter: "blur(3px)",
                }}
                alt="asdf"
              />
            )}
          </div>
        </Flex>
      </Center>
    </div>
  );
}
