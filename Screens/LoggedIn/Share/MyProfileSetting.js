import React, { useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../Components/ScreenLayout";
import { colors } from "../../../Colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;

export default function MyProfileSetting({ route: { params } }) {
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <Button
        onPress={() =>
          navigation.navigate("Account", {
            email: params.email,
          })
        }
      >
        <ButtonText>계정안내</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Button onPress={() => navigation.navigate("NotificationSetting")}>
        <ButtonText>알림</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Button onPress={() => navigation.navigate("Contact")}>
        <ButtonText>문의하기</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Button onPress={() => null}>
        <ButtonText>이용약관</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Button onPress={() => null}>
        <ButtonText>개인정보처리방침</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
    </ScreenLayout>
  );
}
