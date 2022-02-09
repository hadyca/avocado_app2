import React, { useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { Text } from "react-native";
import ScreenLayout from "../../../Components/ScreenLayout";

export default function FavoriteCompanyPost() {
  const ref = useRef(null);
  useScrollToTop(ref);
  return (
    <ScreenLayout>
      <Text>즐겨찾기 해놓은 채용 글</Text>
    </ScreenLayout>
  );
}
