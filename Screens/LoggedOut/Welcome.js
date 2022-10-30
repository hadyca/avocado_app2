import React, { useEffect, useState } from "react";
import * as Device from "expo-device";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import * as Notifications from "expo-notifications";
import { colors } from "../../Colors";
import AuthButton from "../../Components/Auth/AuthButton";
import AuthLayout from "../../Components/Auth/AuthLayout";

const LoginLink = styled.Text`
  color: ${colors.buttonBackground};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

const LngContainer = styled.View`
  margin-top: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LngText = styled.Text`
  color: ${colors.blue};
  margin-right: 10px;
`;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Welcome({ navigation }) {
  const [pushToken, setPushToken] = useState();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, [navigation]);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (existingStatus !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      setPushToken(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "VinaArba",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  };

  const goToCreateAccount = () =>
    navigation.navigate("CreateAccount", {
      pushToken,
    });
  const goToLogIn = () =>
    navigation.navigate("LogIn", {
      pushToken,
    });

  return (
    <AuthLayout>
      <AuthButton
        text="Creat New Account"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
      <LngContainer>
        <TouchableOpacity>
          <LngText>Tiếng Việt</LngText>
        </TouchableOpacity>
        <LngText>|</LngText>
        <TouchableOpacity>
          <LngText>English</LngText>
        </TouchableOpacity>
        <LngText>|</LngText>
        <TouchableOpacity>
          <LngText>한국어</LngText>
        </TouchableOpacity>
      </LngContainer>
    </AuthLayout>
  );
}
