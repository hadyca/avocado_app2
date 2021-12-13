import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Ionicons } from "@expo/vector-icons";

const IconView = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  position: absolute;
  right: 10px;
`;

export default function SendButton({ disabled, onPress }) {
  return (
    <IconView disabled={disabled} onPress={onPress}>
      <Ionicons name="arrow-forward-circle-outline" size={40} color="black" />
    </IconView>
  );
}
