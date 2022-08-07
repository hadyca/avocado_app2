import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import ScreenLayout from "../../../Components/ScreenLayout";
import { colors } from "../../../Colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  text-align: center;
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;

export default function MyProfileSetting() {
  return (
    <ScreenLayout>
      <Button onPress={() => null}>
        <ButtonText>MyProfileSetting 화면</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Button onPress={() => null}>
        <ButtonText>MyProfileSetting 화면</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Button onPress={() => null}>
        <ButtonText>MyProfileSetting 화면</ButtonText>
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
