import React from "react";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";

const ButtonView = styled.View`
  position: absolute;
  bottom: ${(props) => props.bottom / 20}px;
  right: ${(props) => props.right / 15}px;
`;
const SPostFormButton = styled.TouchableOpacity`
  box-shadow: 2px 4px 3px grey;
`;
const ButtonImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export default function PostFormButton({ onPress }) {
  const { width, height } = useWindowDimensions();

  return (
    <ButtonView bottom={height} right={width}>
      <SPostFormButton onPress={onPress}>
        <ButtonImage source={require("../../assets/pen.png")} />
      </SPostFormButton>
    </ButtonView>
  );
}
