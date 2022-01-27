import React, { useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { Text } from "react-native";
import ScreenLayout from "../components/ScreenLayout";

export default function FavoriteCompany() {
  const ref = useRef(null);
  useScrollToTop(ref);
  return (
    <ScreenLayout>
      <Text>즐겨찾기 해놓은 회사 목록</Text>
    </ScreenLayout>
  );
}
