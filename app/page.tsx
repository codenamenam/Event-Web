"use client";

import { Button, Center, Flex, Text, Table, Divider } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef } from "react";

export default function Home() {
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
            saveAs(blob, "result.png");
          }
        });
      }
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  return (
    <div style={{ backgroundImage: "url('/web-background.png')" }}>
      <Center
        ref={divRef}
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
              style={{ fontSize: "20px", fontWeight: "500", color: "gray" }}
            >
              2023학년도
            </Text>
            <Text style={{ fontSize: "27px", fontWeight: "800" }}>
              전국 문해력능력시험 성적통지표
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
            <Text style={{ fontWeight: "700", fontSize: "18px" }}>
              시험 응시하기
            </Text>
          </Button>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Flex direction={"column"} align={"center"}>
              <Text
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                나의 학교
              </Text>
              <Text
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                {myRanking["schoolName"]}
              </Text>
            </Flex>
            <Flex align={"center"}>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "15px", fontWeight: "600" }}>
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
                  <Text style={{ fontSize: "20px", fontWeight: "500" }}>
                    {myRanking["ranking"]}위
                  </Text>
                </Center>
              </Flex>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "15px", fontWeight: "600" }}>
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
                  <Text style={{ fontSize: "20px", fontWeight: "500" }}>
                    9.6
                  </Text>
                </Center>
              </Flex>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "15px", fontWeight: "600" }}>
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
                  <Text style={{ fontSize: "20px", fontWeight: "500" }}>
                    2등
                  </Text>
                </Center>
              </Flex>
            </Flex>

            <Flex align={"center"}>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "15px", fontWeight: "600" }}>
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
                  <Text style={{ fontSize: "20px", fontWeight: "500" }}>
                    {myRanking["total"]}명
                  </Text>
                </Center>
              </Flex>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "15px", fontWeight: "600" }}>
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
                  <Text style={{ fontSize: "20px", fontWeight: "500" }}>
                    {myRanking["totalScore"]}점
                  </Text>
                </Center>
              </Flex>
              <Flex direction={"column"} align={"center"}>
                <Center
                  style={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    width: "100px",
                    height: "30px",
                  }}
                >
                  <Text style={{ fontSize: "15px", fontWeight: "600" }}>
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
                  <Text style={{ fontSize: "20px", fontWeight: "500" }}>
                    {myRanking["average"]}점
                  </Text>
                </Center>
              </Flex>
            </Flex>
          </div>

          <Table
            style={{
              margin: "30px 0px 30px 0px",
            }}
          >
            <Table.Thead>
              <Table.Th style={{ textAlign: "center" }}>등수</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>학교 이름</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>참여자 수 </Table.Th>
              <Table.Th style={{ textAlign: "center" }}>총점</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>평균</Table.Th>
            </Table.Thead>
            <Table.Tbody>
              {rankings.map((element) => (
                <Table.Tr key={element.schoolName}>
                  <Table.Td style={{ textAlign: "center" }}>
                    {element.ranking}
                  </Table.Td>
                  <Table.Td style={{ textAlign: "center" }}>
                    {element.schoolName}
                  </Table.Td>
                  <Table.Td style={{ textAlign: "center" }}>
                    {element.total}
                  </Table.Td>
                  <Table.Td style={{ textAlign: "center" }}>
                    {element.totalScore}
                  </Table.Td>
                  <Table.Td style={{ textAlign: "center" }}>
                    {element.average}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Flex>
      </Center>
      <Center>
        <Flex
          direction="column"
          style={{ margin: "0px 0px 20px 0px", width: "330px" }}
        >
          <Text
            style={{
              fontSize: "16px",
              color: "gray",
              fontWeight: "600",
            }}
          >
            테스트 결과 공유하기
          </Text>

          <Divider style={{ margin: "3px 0px 9px 0px" }} />

          <Flex direction={"column"}>
            <Flex justify={"space-between"}>
              <Text>1. 버튼을 눌러서 화면 캡처본을 다운로드!</Text>
            </Flex>
            <Text>2. 카카오톡, 인스타 등 SNS에 공유하기!</Text>
          </Flex>

          <Center style={{ margin: "10px 0 30px 0" }}>
            <Flex style={{ width: "150px" }} justify={"space-between"}>
              <Image
                src={"/download-icon.png"}
                alt="instagram logo"
                width={35}
                height={35}
                onClick={handleDownload}
              ></Image>
              <Image
                src={"/insta-logo.png"}
                alt="instagram logo"
                width={30}
                height={30}
                onClick={() => {
                  window.location.href =
                    "instagram-stories://share?source_application=%@";
                }}
              ></Image>
            </Flex>
          </Center>
        </Flex>
      </Center>
    </div>
  );
}
