import React, { useRef, useEffect } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../Components/ScreenLayout";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import {
  useWindowDimensions,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../Colors";
import { useNavigation } from "@react-navigation/native";
import useMe from "../../../Hooks/useMe";

const Container = styled.View``;

const TitleImg = styled.ImageBackground`
  width: 100%;
  height: ${(props) => Math.floor(props.height * 0.3)}px;
  justify-content: center;
  align-items: center;
`;

const TopText = styled.Text`
  color: white;
  font-size: 30px;
  margin-bottom: ${(props) => (props.lastOne ? 0 : 5)}px;
`;

const CompanyView = styled.View`
  background-color: ${colors.buttonBackground};
  height: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const HelloText = styled.Text`
  color: white;
  font-size: 17px;
`;

const Button = styled.TouchableOpacity`
  background-color: white;
  border-radius: 30px;
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.Text`
  color: ${colors.buttonBackground};
`;

const Contents = styled.View`
  justify-content: center;
  align-items: center;
`;

const ImageHome = styled.Image`
  width: ${(props) => props.width * 0.5}px;
  height: ${(props) => props.width * 0.5}px;
  margin-top: 50px;
`;

const SubTitle = styled.Text`
  color: ${colors.black};
  font-weight: bold;
  margin-top: 20px;
  font-size: 25px;
`;

const SubContent = styled.Text`
  font-size: 20px;
  margin-top: ${(props) => (props.firstOne ? 10 : 5)}px;
`;

const FooterView = styled.View`
  justify-content: flex-end;
  align-items: center;
  height: 100px;
  margin-bottom: 10px;
`;

const FooterText = styled.Text`
  color: ${colors.borderThick};
`;

export default function Home() {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const { data: userData } = useMe();

  const { t, i18n } = useTranslation();
  const changelanguageToKo = () => i18n.changeLanguage("ko");
  const changelanguageToEn = () => i18n.changeLanguage("en");

  const ref = useRef(null);
  useScrollToTop(ref);

  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const goToCreateCompany = () => {
    navigation.navigate("CreateCompanyFinish");
    if (userData?.me?.myCompany) {
      Alert.alert("이미 가입되어 있습니다.");
    } else {
      navigation.navigate("AskCompanyName");
    }
  };
  useEffect(() => {
    if (
      lastNotificationResponse?.notification?.request?.content?.data?.userPostId
    ) {
      navigation.navigate("UserPostListDetail", {
        id: lastNotificationResponse.notification.request.content.data
          .userPostId,
      });
    }
    if (
      lastNotificationResponse?.notification?.request?.content?.data
        ?.companyPostId
    ) {
      navigation.navigate("CompanyPostListDetail", {
        id: lastNotificationResponse.notification.request.content.data
          .companyPostId,
      });
    }
    if (
      lastNotificationResponse?.notification?.request?.content?.data?.sendUserId
    ) {
      navigation.navigate("Profile", {
        id: lastNotificationResponse.notification.request.content.data
          .sendUserId,
      });
    }
  }, [lastNotificationResponse]);
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
            source={require("../../../assets/main_pic.jpg")}
            height={height}
          >
            <View
              style={{
                position: "absolute",
                backgroundColor: "black",
                opacity: 0.5,
                width: "100%",
                height: Math.floor(height * 0.3),
              }}
            />
            <TopText>{i18n.language}</TopText>
            <TopText>{t("welcome")}</TopText>
            <TouchableOpacity onPress={changelanguageToKo}>
              korean
            </TouchableOpacity>
            <TouchableOpacity onPress={changelanguageToEn}>
              english
            </TouchableOpacity>
            <TopText>구인, 구직자들을 위한</TopText>
            <TopText>맞춤형 소통 공간</TopText>
            <TopText lastOne={true}>VinaArba</TopText>
          </TitleImg>
          <CompanyView>
            <HelloText>기업 회원이세요?</HelloText>
            <Button onPress={goToCreateCompany}>
              <ButtonText>기업 회원 가입</ButtonText>
              <Ionicons
                name="chevron-forward"
                color="black"
                size={17}
                style={{ color: colors.buttonBackground }}
              />
            </Button>
          </CompanyView>
          <Contents>
            <ImageHome
              resizeMode="contain"
              source={{
                uri: "https://avocadotalkbucket.s3.ap-northeast-2.amazonaws.com/asset/home_1.png",
              }}
              width={width}
              height={width}
            />
            <SubTitle>다채로운 정보 공유</SubTitle>
            <SubContent firstOne={true}>
              일자리 정보부터, 인생 꿀팁 정보 까지
            </SubContent>
            <SubContent>
              옆 공장의 월급은 얼마일까? 동네 맛집은 어디지?
            </SubContent>
            <SubContent>당신의 정보를 공유해주세요</SubContent>
          </Contents>
          <Contents>
            <ImageHome
              resizeMode="contain"
              source={{
                uri: "https://avocadotalkbucket.s3.ap-northeast-2.amazonaws.com/asset/home_2.png",
              }}
              width={width}
              height={width}
            />
            <SubTitle>한 눈에 보는 채용 정보</SubTitle>
            <SubContent firstOne={true}>
              한 눈에 쏙! 공장 알바 채용 게시판
            </SubContent>
            <SubContent>봉제 작업자, 카페 알바 등 친숙한 우리의 일</SubContent>
            <SubContent>지역별로 채용 글을 확인해 보세요</SubContent>
          </Contents>
          <Contents>
            <ImageHome
              resizeMode="contain"
              source={{
                uri: "https://avocadotalkbucket.s3.ap-northeast-2.amazonaws.com/asset/home_3.png",
              }}
              width={width}
              height={width}
            />
            <SubTitle>소셜 미디어를 이용한 소통</SubTitle>
            <SubContent firstOne={true}>
              내가 좋아하는 기업을 Follow 해보세요
            </SubContent>
            <SubContent>방금 전에 올린 채용글을 확인할 수 있어요!</SubContent>
          </Contents>
          <FooterView>
            <FooterText>©별보는 캐리어. All rights reserved</FooterText>
          </FooterView>
        </Container>
      </ScrollView>
    </ScreenLayout>
  );
}
