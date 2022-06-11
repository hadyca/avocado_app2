import React from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 0px 20px;
  background-color: #ffffff;
`;

const TopContainer = styled.View`
  flex: 0.3;
  justify-content: center;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin: 0 auto;
`;

export default function CreatCompanyLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <TopContainer>
          <Logo resizeMode="contain" source={require("../assets/logo.png")} />
        </TopContainer>
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
}
