"use client";

import { Button, Center, Flex, Text, Table, Divider } from "@mantine/core";
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
  //내 정보
  interface myInfo {
    schoolName: string;
    myScore: number;
    myRanking: number;
  }

  const [myData, setMyData] = useState<myInfo>({
    schoolName: "",
    myScore: 0,
    myRanking: 0,
  });

  // 내 학교 정보
  interface schoolInfo {
    schoolName: string;
    schoolRanking: number;
    studentCount: number;
    totalScore: number;
    averageScore: number;
  }

  const [mySchoolRanking, setMySchoolRanking] = useState<schoolInfo>({
    schoolName: "",
    schoolRanking: 0,
    studentCount: 0,
    totalScore: 0,
    averageScore: 0,
  });

  // 학교별 랭킹 정보
  const rankings: schoolInfo[] = [
    {
      schoolName: "북원여자고등학교",
      schoolRanking: 1,
      studentCount: 43,
      totalScore: 535,
      averageScore: 9.4,
    },
    {
      schoolName: "원주여자고등학교",
      schoolRanking: 2,
      studentCount: 35,
      totalScore: 252,
      averageScore: 9.3,
    },
    {
      schoolName: "상지여자고등학교",
      schoolRanking: 3,
      studentCount: 455,
      totalScore: 2442,
      averageScore: 9.1,
    },
  ];

  //캡처 다운로드
  const [imageURL, setImageURL] = useState("");
  const divRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    try {
      const div = divRef.current;
      if (div) {
        const canvas = await html2canvas(div, { scale: 2 });

        canvas.toBlob((blob) => {
          if (blob !== null) {
            //saveAs(blob, "result.png");
            const url = URL.createObjectURL(blob);
            setImageURL(url);
          }
        });
      }
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };
  useEffect(() => {
    handleDownload();
  }, []);

  // 라우팅 처리
  const pathName = usePathname();
  const user_id = pathName.substr(1);

  //SchoolSummaryData 값 읽어오기
  const handleSchoolSummaryData = async () => {
    const result = await axios.get(
      "[user_id]/api/getSchoolSummaryData/?query=" + user_id
    );
    if (result.status === 200) {
      const tempData: myInfo = {
        schoolName: result.data["school_name"],
        myScore: result.data["score"],
        myRanking: result.data["ranking"],
      };
      setMyData(tempData);
    }
  };

  //SchoolRankingData 값 읽어오기
  const handleSchoolRankingData = async (schoolName: string) => {
    const result = await axios.get(
      "[user_id]/api/getSchoolRankingData/?query=" + schoolName
    );
    if (result.status === 200) {
      const tempData: schoolInfo = {
        schoolName: result.data["school_name"],
        studentCount: result.data["student_count"],
        totalScore: result.data["total_score"],
        averageScore: result.data["average_score"],
        schoolRanking: result.data["school_ranking"],
      };
      setMySchoolRanking(tempData);
    }
  };

  useEffect(() => {
    handleSchoolSummaryData();
  }, []);

  useEffect(() => {
    if (!myData.schoolName) {
      return;
    } else {
      handleSchoolRankingData(myData.schoolName);
    }
  }, [myData.schoolName]);

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
              style={{ fontSize: "18px", fontWeight: "600", color: "gray" }}
            >
              2023학년도
            </Text>
            <Text style={{ fontSize: "25px", fontWeight: "700" }}>
              전국 문해력능력시험 성적통지표
            </Text>
          </Flex>

          <Button
            component={Link}
            href="https://pf.kakao.com/_zmTAG/friend"
            variant="outline"
            radius={"xl"}
            style={{ margin: "10px 0 30px 0", width: "20 0px" }}
            color="red"
          >
            <Text style={{ fontWeight: "600", fontSize: "16px" }}>
              시험 응시하기
            </Text>
          </Button>
          <div
            className={gowun.className}
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              padding: "10px 0px 0 0",
              borderRadius: "10px",
              backdropFilter: "blur(10px)",
            }}
          >
            <Flex direction={"column"} align={"center"}>
              <Text
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                {myData.schoolName}
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
                    className={ns.className}
                  >
                    {mySchoolRanking.schoolRanking}위
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
                    className={ns.className}
                  >
                    {myData.myScore}
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
                    className={ns.className}
                  >
                    {myData.myRanking}등
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
                    className={ns.className}
                  >
                    {mySchoolRanking.totalScore}명
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
                    className={ns.className}
                  >
                    {mySchoolRanking.totalScore}점
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
                    className={ns.className}
                  >
                    {mySchoolRanking.averageScore}점
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
              <Table.Th style={{ textAlign: "center", fontSize: "13px" }}>
                등수
              </Table.Th>
              <Table.Th style={{ textAlign: "center", fontSize: "13px" }}>
                학교 이름
              </Table.Th>
              <Table.Th style={{ textAlign: "center", fontSize: "13px" }}>
                참여자 수{" "}
              </Table.Th>
              <Table.Th style={{ textAlign: "center", fontSize: "13px" }}>
                총점
              </Table.Th>
              <Table.Th style={{ textAlign: "center", fontSize: "13px" }}>
                평균
              </Table.Th>
            </Table.Thead>
            <Table.Tbody>
              {rankings.map((element) => (
                <Table.Tr key={element.schoolName}>
                  <Table.Td style={{ textAlign: "center" }}>
                    {element.schoolRanking}
                  </Table.Td>
                  <Table.Td
                    style={{ textAlign: "center" }}
                    className={gowun.className}
                  >
                    {element.schoolName}
                  </Table.Td>
                  <Table.Td
                    style={{ textAlign: "center" }}
                    className={gowun.className}
                  >
                    {element.studentCount}
                  </Table.Td>
                  <Table.Td
                    style={{ textAlign: "center" }}
                    className={gowun.className}
                  >
                    {element.totalScore}
                  </Table.Td>
                  <Table.Td
                    style={{ textAlign: "center" }}
                    className={gowun.className}
                  >
                    {element.averageScore}
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
              fontSize: "18px",
              fontWeight: "600",
            }}
            className={ibm.className}
          >
            테스트 결과 공유하기
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
                1. 버튼을 눌러서 화면 캡처본을 다운로드!
              </Text>
            </Flex>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "rgba(0,0,0,0.7)",
              }}
              className={ibm.className}
            >
              2. 카카오톡, 인스타 등 SNS에 공유하기!
            </Text>
          </Flex>

          <Center style={{ margin: "10px 0 30px 0" }}>
            <Flex
              style={{
                width: "140px",
                backgroundColor: "rgba(0, 0, 0,0.036  )",
                padding: "10px 15px 10px 15px",
                borderRadius: "10px",
                backdropFilter: "blur(10px)",
              }}
              justify={"space-between"}
            >
              <Link href={imageURL}>
                <Image
                  src={"/download-icon.png"}
                  alt="download logo"
                  width={35}
                  height={35}
                  onClick={handleDownload}
                ></Image>
              </Link>
              <Image
                src={"/insta-logo.png"}
                alt="instagram logo"
                width={30}
                height={30}
                onClick={() => {
                  window.location.href = `instagram-stories://share?source_application=safari?media}`;
                }}
              ></Image>
            </Flex>
          </Center>
        </Flex>
      </Center>
    </div>
  );
}
