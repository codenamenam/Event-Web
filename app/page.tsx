import { Button, Center, Flex, Text, Grid } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

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
    <div>
      <Grid>
        <Grid.Col span={3}>1</Grid.Col>
        <Grid.Col span={3}>2</Grid.Col>
        <Grid.Col span={3}>3</Grid.Col>
        <Grid.Col span={3}>4</Grid.Col>
      </Grid>
    </div>
  );

  // return (
  //   <Center style={{ backgroundImage: "url('/web-background.png')" }}>
  //     <Flex
  //       direction={"column"}
  //       style={{
  //         width: "340px",
  //         marginTop: "50px",
  //       }}
  //       align={"center"}
  //     >
  //       <Flex direction={"column"} align={"center"}>
  //         <Text style={{ fontSize: "20px", fontWeight: "500", color: "gray" }}>
  //           2023학년도
  //         </Text>
  //         <Text style={{ fontSize: "27px", fontWeight: "800" }}>
  //           전국 문해력능력시험 성적통지표
  //         </Text>
  //       </Flex>

  //       <Button
  //         component={Link}
  //         href="https://pf.kakao.com/_zmTAG/friend"
  //         variant="outline"
  //         radius={"xl"}
  //         style={{ margin: "10px 0 30px 0", width: "20 0px" }}
  //         color="red"
  //       >
  //         <Text style={{ fontWeight: "700", fontSize: "18px" }}>
  //           능력시험 응시하기
  //         </Text>
  //       </Button>
  //       <div
  //         style={{
  //           backgroundColor: "white",
  //           padding: "20px",
  //           borderRadius: "10px",
  //         }}
  //       >
  //         <Flex direction={"column"} align={"center"}>
  //           <Text
  //             style={{
  //               fontSize: "15px",
  //               fontWeight: "600",
  //             }}
  //           >
  //             나의 학교
  //           </Text>
  //           <Text
  //             style={{
  //               fontSize: "30px",
  //               fontWeight: "700",
  //               marginBottom: "10px",
  //             }}
  //           >
  //             {myRanking["schoolName"]}
  //           </Text>
  //         </Flex>
  //         <Flex align={"center"}>
  //           <Flex direction={"column"} align={"center"}>
  //             <Center
  //               style={{
  //                 backgroundColor: "rgba(0,0,0,0.05)",
  //                 width: "100px",
  //                 height: "30px",
  //               }}
  //             >
  //               <Text style={{ fontSize: "15px", fontWeight: "600" }}>
  //                 학교 순위
  //               </Text>
  //             </Center>
  //             <Center
  //               style={{
  //                 width: "100px",
  //                 height: "50px",
  //                 backgroundColor: "rgba(0,0,0,0.02)",
  //               }}
  //             >
  //               <Text style={{ fontSize: "20px", fontWeight: "500" }}>
  //                 {myRanking["ranking"]}위
  //               </Text>
  //             </Center>
  //           </Flex>
  //           <Flex direction={"column"} align={"center"}>
  //             <Center
  //               style={{
  //                 backgroundColor: "rgba(0,0,0,0.05)",
  //                 width: "100px",
  //                 height: "30px",
  //               }}
  //             >
  //               <Text style={{ fontSize: "15px", fontWeight: "600" }}>
  //                 내 점수
  //               </Text>
  //             </Center>
  //             <Center
  //               style={{
  //                 width: "100px",
  //                 height: "50px",
  //                 backgroundColor: "rgba(0,0,0,0.02)",
  //               }}
  //             >
  //               <Text style={{ fontSize: "20px", fontWeight: "500" }}>9.6</Text>
  //             </Center>
  //           </Flex>
  //           <Flex direction={"column"} align={"center"}>
  //             <Center
  //               style={{
  //                 backgroundColor: "rgba(0,0,0,0.05)",
  //                 width: "100px",
  //                 height: "30px",
  //               }}
  //             >
  //               <Text style={{ fontSize: "15px", fontWeight: "600" }}>
  //                 교내 순위
  //               </Text>
  //             </Center>

  //             <Center
  //               style={{
  //                 width: "100px",
  //                 height: "50px",
  //                 backgroundColor: "rgba(0,0,0,0.02)",
  //               }}
  //             >
  //               <Text style={{ fontSize: "20px", fontWeight: "500" }}>2등</Text>
  //             </Center>
  //           </Flex>
  //         </Flex>

  //         <Flex align={"center"}>
  //           <Flex direction={"column"} align={"center"}>
  //             <Center
  //               style={{
  //                 backgroundColor: "rgba(0,0,0,0.05)",
  //                 width: "100px",
  //                 height: "30px",
  //               }}
  //             >
  //               <Text style={{ fontSize: "15px", fontWeight: "600" }}>
  //                 전체 참여자수
  //               </Text>
  //             </Center>
  //             <Center
  //               style={{
  //                 width: "100px",
  //                 height: "50px",
  //                 backgroundColor: "rgba(0,0,0,0.02)",
  //               }}
  //             >
  //               <Text style={{ fontSize: "20px", fontWeight: "500" }}>
  //                 {myRanking["total"]}명
  //               </Text>
  //             </Center>
  //           </Flex>
  //           <Flex direction={"column"} align={"center"}>
  //             <Center
  //               style={{
  //                 backgroundColor: "rgba(0,0,0,0.05)",
  //                 width: "100px",
  //                 height: "30px",
  //               }}
  //             >
  //               <Text style={{ fontSize: "15px", fontWeight: "600" }}>
  //                 총점
  //               </Text>
  //             </Center>
  //             <Center
  //               style={{
  //                 width: "100px",
  //                 height: "50px",
  //                 backgroundColor: "rgba(0,0,0,0.02)",
  //               }}
  //             >
  //               <Text style={{ fontSize: "20px", fontWeight: "500" }}>
  //                 {myRanking["totalScore"]}점
  //               </Text>
  //             </Center>
  //           </Flex>
  //           <Flex direction={"column"} align={"center"}>
  //             <Center
  //               style={{
  //                 backgroundColor: "rgba(0,0,0,0.05)",
  //                 width: "100px",
  //                 height: "30px",
  //               }}
  //             >
  //               <Text style={{ fontSize: "15px", fontWeight: "600" }}>
  //                 평균 점수
  //               </Text>
  //             </Center>

  //             <Center
  //               style={{
  //                 backgroundColor: "rgba(0,0,0,0.02)",
  //                 width: "100px",
  //                 height: "50px",
  //               }}
  //             >
  //               <Text style={{ fontSize: "20px", fontWeight: "500" }}>
  //                 {myRanking["average"]}점
  //               </Text>
  //             </Center>
  //           </Flex>
  //         </Flex>
  //       </div>

  //       <Flex direction={"column"} style={{ margin: "20px" }} align={"center"}>
  //         <Text style={{ fontSize: "23px", fontWeight: "700", margin: "10px" }}>
  //           테스트 공유하기
  //         </Text>
  //         <Image
  //           src={"/insta-logo.png"}
  //           alt="instagram logo"
  //           width={30}
  //           height={30}
  //         ></Image>
  //       </Flex>
  //     </Flex>
  //   </Center>
  // );
}
