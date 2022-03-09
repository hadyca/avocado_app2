import styled from "styled-components/native";
import { colors } from "../../Colors";

export const TextInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? colors.error
        : props.focus
        ? colors.focus
        : colors.borderThick};
  margin-bottom: ${(props) => (props.lastOne ? 25 : 8)}px;
`;

export const MultiTextInput = styled.TextInput`
  height: ${(props) => Math.ceil(props.height / 5)}px;
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? colors.error
        : props.focus
        ? colors.focus
        : colors.borderThick};
  margin-bottom: ${(props) => (props.lastOne ? 25 : 8)}px;
`;
