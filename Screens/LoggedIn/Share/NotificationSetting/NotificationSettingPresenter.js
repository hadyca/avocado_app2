import React, { useState } from "react";
import { Switch, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;

export default function NotificationSettingPresenter({ userPostLikeMutation }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    // await userPostLikeMutation({
    //   variables: {
    //     state: isEnabled,
    //   },
    // });
    setIsEnabled((previousState) => !previousState);
  };
  const test = () => {
    userPostLikeMutation({
      variables: {
        state: false,
      },
    });
  };
  return (
    <Container>
      <Text>알람설정화면</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={test}
        value={isEnabled}
      />
      {/* <TouchableOpacity onPress={test}>
        <Text>터치</Text>
      </TouchableOpacity> */}
    </Container>
  );
}
