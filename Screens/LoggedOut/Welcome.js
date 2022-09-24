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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Welcome({ navigation }) {
  const [pushToken, setPushToken] = useState();
  const [statusNotification, setStatusNotification] = useState();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        console.log("nowStatus:", status);

        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("token:", token);
      setPushToken(token);
      setStatusNotification(finalStatus);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
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
      statusNotification,
    });
  const goToLogIn = () =>
    navigation.navigate("LogIn", {
      pushToken,
      statusNotification,
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
    </AuthLayout>
  );
}
