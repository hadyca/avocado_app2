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
  Text,
  Image,
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
  justify-content: space-around;
  align-items: center;
`;

const HelloText = styled.Text`
  color: white;
  font-size: 17px;
  margin: 10px 0px;
`;

const Button = styled.TouchableOpacity`
  background-color: white;
  border-radius: 30px;
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: ${colors.buttonBackground};
  align-items: center;
  margin-right: 10px;
`;

const Contents = styled.View`
  justify-content: center;
  align-items: center;
`;

const BtmImg = styled.Image`
  width: ${(props) => props.width}px;
  height: 100%;
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
  margin-top: ${(props) => (props.firstOne ? 15 : 10)}px;
  margin-left: 40px;
  margin-right: 40px;
  text-align: center;
`;

const SubContent2 = styled.Text`
  font-size: 20px;
  margin-left: 40px;
  margin-right: 40px;
  text-align: center;
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
  const changelanguageToVn = () => i18n.changeLanguage("vn");

  const ref = useRef(null);
  useScrollToTop(ref);

  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const goToCreateCompany = () => {
    if (userData?.me?.myCompany) {
      Alert.alert(t("home.12"));
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
            <TopText>{t("home.1_1")}</TopText>
            <TopText>{t("home.1_2")}</TopText>
          </TitleImg>
          <CompanyView>
            <HelloText>{t("home.2")}</HelloText>
            <Button onPress={goToCreateCompany}>
              <ButtonText>{t("home.3")}</ButtonText>
              <Ionicons
                name="chevron-forward"
                color="black"
                size={17}
                style={{ color: colors.buttonBackground }}
              />
            </Button>
          </CompanyView>
          <Contents>
            <TouchableOpacity onPress={changelanguageToKo}>
              <Text>한국어</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changelanguageToEn}>
              <Text>영어</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changelanguageToVn}>
              <Text>베트남어</Text>
            </TouchableOpacity>
            {i18n.language === "vn" ? (
              <BtmImg
                width={width}
                source={require("../../../assets/vn_btm.png")}
              />
            ) : null}

            {/* <ImageHome
              resizeMode="contain"
              source={{
                uri: "https://avocadotalkbucket.s3.ap-northeast-2.amazonaws.com/asset/home_1.png",
              }}
              width={width}
              height={width}
            />
            <SubTitle>{t("home.4")}</SubTitle>
            <SubContent firstOne={true}>{t("home.5")}</SubContent>
            <SubContent>{t("home.6")}</SubContent>
            <SubContent2>{t("home.7")}</SubContent2>
            <SubContent>{t("home.8")}</SubContent>
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
            <SubTitle>{t("home.9")}</SubTitle>
            <SubContent firstOne={true}>{t("home.10")}</SubContent>
            <SubContent>{t("home.11")}</SubContent>
          </Contents>
          <Contents>
            {i18n.language === "ko" ? (
              <ImageHome
                resizeMode="contain"
                source={{
                  uri: "https://avocadotalkbucket.s3.ap-northeast-2.amazonaws.com/asset/home_3.png",
                }}
                width={width}
                height={width}
              />
            ) : (
              <ImageHome
                resizeMode="contain"
                source={{
                  uri: "https://avocadotalkbucket.s3.ap-northeast-2.amazonaws.com/asset/home_2_R.png",
                }}
                width={width}
                height={width}
              />
            )}
            <SubTitle>커뮤니케이션</SubTitle>
            <SubContent firstOne={true}>
              내가 좋아하는 기업을 Follow 해보세요
            </SubContent>
            <SubContent>방금 전에 올린 채용글을 확인할 수 있어요!</SubContent> */}
          </Contents>
          <FooterView>
            <FooterText>©별보는 캐리어. All rights reserved</FooterText>
          </FooterView>
        </Container>
      </ScrollView>
    </ScreenLayout>
  );
}
