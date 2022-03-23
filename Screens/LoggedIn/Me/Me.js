import React, { useEffect, useRef, useState } from "react";
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
      <Text>{data?.me?.myCompany?.id}</Text>
      <Text>{data?.me?.myCompany?.email}</Text>
      <Text>{data?.me?.myCompany?.companyName}</Text>
      <Text>{data?.me?.myCompany?.addressStep1}</Text>
      <Text>{data?.me?.myCompany?.addressStep2}</Text>
    </ScreenLayout>
  );
}
