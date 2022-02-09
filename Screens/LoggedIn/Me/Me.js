import React, { useEffect, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { Text } from "react-native";
import ScreenLayout from "../../../Components/ScreenLayout";
import useMe from "../../../Hooks/useMe";

export default function Me({ navigation }) {
  const ref = useRef(null);
  useScrollToTop(ref);
  const { data } = useMe();

  useEffect(() => {
    if (data?.me?.username) {
      navigation.setOptions({
        title: data?.me?.username,
      });
    }
  }, [data]);

  return (
    <ScreenLayout>
      <Text>Me화면</Text>
    </ScreenLayout>
  );
}
