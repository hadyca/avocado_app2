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
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { colors } from "../../../Colors";
import { useNavigation } from "@react-navigation/native";
import useMe from "../../../Hooks/useMe";

const Container = styled.View``;

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

const FooterView = styled.View`
  justify-content: flex-end;
  align-items: center;
  margin-top: 100px;
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

  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const goToCreateCompany = () => {
    if (userData?.me?.myCompany) {
      Alert.alert(t("home.3"));
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
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        <Container>
          <AutoHeightImage
            width={width}
            source={require("../../../assets/top_main.png")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <AutoHeightImage
              width={width * 0.8}
              source={
                i18n.language === "vn"
                  ? require("../../../assets/top_vn_text.png")
                  : i18n.language === "en"
                  ? require("../../../assets/top_en_text.png")
                  : require("../../../assets/top_ko_text.png")
              }
            />
          </AutoHeightImage>
          <CompanyView>
            <HelloText>{t("home.1")}</HelloText>
            <Button onPress={goToCreateCompany}>
              <ButtonText>{t("home.2")}</ButtonText>
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
            <AutoHeightImage
              width={width}
              source={
                i18n.language === "vn"
                  ? require("../../../assets/vn_btm.png")
                  : i18n.language === "en"
                  ? require("../../../assets/en_btm.png")
                  : require("../../../assets/ko_btm.png")
              }
            />
          </Contents>
          <FooterView>
            <FooterText>©별보는 캐리어. All rights reserved</FooterText>
          </FooterView>
        </Container>
      </ScrollView>
    </ScreenLayout>
  );
}
