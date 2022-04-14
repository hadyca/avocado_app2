import React, { useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenLayout from "../../../Components/ScreenLayout";
import styled from "styled-components/native";
import { useWindowDimensions, TouchableOpacity, Text } from "react-native";
import { colors } from "../../../Colors";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const TitleImg = styled.ImageBackground``;

const Title = styled.Text`
  color: ${colors.black};
  font-weight: 500;
  margin: 0px auto;
  margin-top: 30px;
  font-size: 30px;
`;

const Content = styled.Text`
  font-weight: 500;
  margin: 0px auto;
  color: ${colors.greyText};
  font-size: 20px;
  margin-top: 5px;
`;

const Contents = styled.View``;

const SubTitle = styled.Text`
  color: ${colors.black};
  font-weight: 400;
  margin: 0px auto;
  margin-top: 30px;
  font-size: 25px;
`;

const SubContent = styled.Text`
  font-weight: 400;
  margin: 0px auto;
  color: ${colors.greyText};
  font-size: 20px;
  margin-top: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${colors.buttonBackground};
  padding: 15px 7px;
  border-radius: 3px;
  width: 50%;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export default function Home() {
  const ref = useRef(null);
  useScrollToTop(ref);
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const goToCreateCompany = () => {
    navigation.navigate("AskCompanyName");
  };

  return (
    <ScreenLayout>
      <ScrollView
        ref={ref}
        style={{
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <TitleImg
            resizeMode="cover"
            style={{
              width: "100%",
              height: height * 0.75,
            }}
            source={{
              uri: "https://post-phinf.pstatic.net/MjAxOTAyMjFfMjYy/MDAxNTUwNzA4OTA3MTUz.HLf2PEUJP6Ig9AIhG_UEJdRAchrrlKE2qC54fLYWRdkg.RuVJkkbgoeu4NKNXwU8rCYXGCzMILXVBMxy0al3lyBMg.PNG/mug_obj_201902210928277808.png?type=w1080",
            }}
          >
            <Title></Title>
          </TitleImg>
          <Contents>
            <TouchableOpacity onPress={goToCreateCompany}>
              <Text>기업 회원 가입 하러 가기</Text>
            </TouchableOpacity>
            <SubTitle>아보카도 소개</SubTitle>
            <SubContent>내용</SubContent>
          </Contents>
          <Contents>
            <SubTitle>제공 하는 서비스</SubTitle>
            <SubContent>서비스 내용</SubContent>
          </Contents>
          <Contents>
            <SubTitle>제공 하는 서비스</SubTitle>
            <SubContent>서비스 내용</SubContent>
          </Contents>
          <Contents>
            <SubTitle>Footer</SubTitle>
            <SubContent>푸터 내용</SubContent>
          </Contents>
        </Container>
      </ScrollView>
    </ScreenLayout>
  );
}
