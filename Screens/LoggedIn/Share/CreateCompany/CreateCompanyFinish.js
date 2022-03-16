import React, { useRef } from "react";
import { useWindowDimensions, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { colors } from "../../../../Colors";
import AuthButton from "../../../../Components/Auth/AuthButton";

export default function CreateCompanyFinish() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <ScreenLayout>
      <Text>아보카도 파트너 회원사가 되신 것을 진심으로 감사 드립니다.</Text>
      <Text>
        이제 이러 이러한 서비스를 이용하실 수 있고, 향 후 이러이러한 서비스를
        진행 할 예정입니다. 감사의 메시지~ 사용하는데 있어, 궁금하신점이나 기타
        문의사항은 아래 이메일 혹은 연락처로 연락해주세요. 24시간 이내 답변
        드리겠습니다.
      </Text>
      <AuthButton
        text="확인"
        disabled={false}
        loading={false}
        onPress={goToHome}
      />
    </ScreenLayout>
  );
}
