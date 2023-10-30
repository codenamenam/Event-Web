import { Button, Center, Flex, Text, Divider } from "@mantine/core";
import Image from "next/image";

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

  return (
    <Center>
      <Flex
        direction={"column"}
        style={{
          width: "340px",
        }}
        align={"center"}
      >
        <h1>전국 문해력 테스트!</h1>

        <Button>
          <Text>도전하기</Text>
        </Button>

        <Flex>
          <Flex direction={"column"} align={"center"}>
            <h1>내 점수</h1>
            <div
              style={{
                backgroundColor: "grey",
                width: "200px",
                height: "100px",
              }}
            >
              <Center>
                <h1>721</h1>
              </Center>
            </div>
          </Flex>

          <Flex direction={"column"}>
            <Button>교내 순위</Button>
            <Button>올린 순위</Button>
          </Flex>
        </Flex>

        <Flex direction={"column"} align={"center"}>
          <h1>{myRanking["schoolName"]}</h1>
          <Flex>
            <Text>
              {myRanking["ranking"]}위 | {myRanking["total"]}명
              {myRanking["totalScore"]}점 | {myRanking["average"]}점
            </Text>
          </Flex>
        </Flex>

        {rankings.map((myRanking) => (
          <Flex
            direction={"column"}
            align={"center"}
            key={myRanking.schoolName}
          >
            <h1>
              {myRanking.ranking}위 {myRanking.schoolName}
            </h1>
            <Flex>
              <Text>
                {myRanking.total}명 {myRanking.totalScore}점 |{" "}
                {myRanking.average}점
              </Text>
            </Flex>
          </Flex>
        ))}

        <Flex direction={"column"} style={{ margin: "20px" }} align={"center"}>
          <Text>테스트 공유하기</Text>
          <Image
            src={"/insta-logo.png"}
            alt="instagram logo"
            width={30}
            height={30}
          ></Image>
        </Flex>
      </Flex>
    </Center>
  );
}
