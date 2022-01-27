import React, { useEffect, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";

export default function Profile({ navigation, route }) {
  const ref = useRef(null);
  useScrollToTop(ref);
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);

  return (
    <ScreenLayout>
      <Text>프로필 화면</Text>
    </ScreenLayout>
  );
}
