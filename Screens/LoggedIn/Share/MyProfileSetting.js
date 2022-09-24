import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
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
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;

export default function MyProfileSetting({ route: { params } }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
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
      <Button onPress={() => null}>
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
      <Button onPress={() => null}>
        <ButtonText>현재 1.0.0 / 최신 1.0.0</ButtonText>
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
