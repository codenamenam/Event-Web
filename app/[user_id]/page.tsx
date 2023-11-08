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
    school_name: string;
    school_ranking: number;
    student_count: number;
    total_score: number;
    average_score: number;
  }

  const [mySchoolRanking, setMySchoolRanking] = useState<schoolInfo>({
    school_name: "",
    school_ranking: 0,
    student_count: 0,
    total_score: 0,
    average_score: 0,
  });

  // 학교별 랭킹 정보
  const [rankings, setRankings] = useState<schoolInfo[]>([
    {
      school_name: "",
      school_ranking: 1,
      student_count: 0,
      total_score: 0,
      average_score: 0,
    },
  ]);

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

  // 링크 복사
  const handleCopy = () => {
    let nowUrl = window.location.href;
    //nowUrl 변수에 담긴 주소를 복사
    navigator.clipboard.writeText(nowUrl).then((res) => {
      alert("주소가 복사되었습니다!");
    });
  };

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
      setMySchoolRanking(result.data);
    }
  };

  //SchoolRankingData의 상위 10개 학교 읽어오기
  const handleTopSchoolRanking = async () => {
    const result = await axios.get("[user_id]/api/getTopSchoolRanking/");
    if (result.status === 200) {
      setRankings(result.data);
    }
  };

  useEffect(() => {
    if (!myData.schoolName) {
      return;
    } else {
      handleSchoolRankingData(myData.schoolName);
    }
  }, [myData.schoolName]);

  useEffect(() => {
    handleSchoolSummaryData();
  }, []);

  useEffect(() => {
    handleTopSchoolRanking();
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
          <div
            className={gowun.className}
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
                    {mySchoolRanking.school_ranking}위
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
                    {mySchoolRanking.student_count}명
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
                    {mySchoolRanking.total_score}점
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
                    {mySchoolRanking.average_score}점
                  </Text>
                </Center>
              </Flex>
            </Flex>
          </div>

          <div
            style={{
              minHeight: "100px",
              maxHeight: "370px",
              overflowY: "auto",
              margin: "40px 0px 30px 0px",
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
                    참여자 수
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
                  <Table.Tr key={element.school_ranking}>
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
                1. 결과 화면을 캡쳐하기!
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
              2. 주소를 복사하고 스토리에 캡처 화면을 함께 공유하기!
            </Text>
          </Flex>

          <Flex direction={"column"}>
            <Flex justify={"space-between"}>
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "rgba(0,0,0,0.7)",
                }}
                className={ibm.className}
              ></Text>
            </Flex>
          </Flex>
          <Center style={{ margin: "10px 0 30px 0" }}>
            <Flex
              style={{
                width: "150px",
                backgroundColor: "rgba(0, 0, 0,0.036  )",
                padding: "10px 15px 10px 15px",
                borderRadius: "10px",
                backdropFilter: "blur(10px)",
              }}
              justify={"space-between"}
            >
              <Flex direction="column" align="center" justify="space-between">
                <Image
                  src={"/copy-link.png"}
                  alt="주소를 복사합니다"
                  width={35}
                  height={35}
                  onClick={handleCopy}
                ></Image>
                <Text
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    marginTop: "5px",
                  }}
                >
                  주소 복사
                </Text>
              </Flex>
              <Flex direction="column" align="center" justify="space-between">
                <Image
                  src={"/insta-logo.png"}
                  alt="instagram logo"
                  width={35}
                  height={35}
                  onClick={() => {
                    window.location.href = `instagram://story-camera`;
                  }}
                ></Image>
                <Text
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  바로가기
                </Text>
              </Flex>
            </Flex>
          </Center>
        </Flex>
      </Center>
    </div>
  );
}
