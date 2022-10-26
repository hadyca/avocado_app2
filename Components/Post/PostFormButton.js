import React from "react";
import styled, { css } from "styled-components/native";
import { Shadow } from "react-native-shadow-2";
import { useWindowDimensions, Platform, StyleSheet } from "react-native";

const SPostFormButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${(props) => props.bottom / 20}px;
  right: ${(props) => props.right / 15}px;
  /* ${(props) =>
    props.platform === "ios"
      ? css`
          box-shadow: 2px 4px 5px grey;
        `
      : css`
          box-shadow: 2px 4px 5px grey;
        `} */
`;
const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        borderRadius: 30,
        elevation: 30,
      },
    }),
  },
});
const ButtonImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export default function PostFormButton({ onPress }) {
  const { width, height } = useWindowDimensions();
  console.log(Platform.OS);
  return (
    <Shadow>
      <SPostFormButton
        platform={Platform.OS}
        onPress={onPress}
        bottom={height}
        right={width}
      >
        <ButtonImage
          source={require("../../assets/pen.png")}
          styles={styles.shadow}
        />
      </SPostFormButton>
    </Shadow>
  );
}
