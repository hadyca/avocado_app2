import React from "react";
import styled from "styled-components/native";
import { colors } from "../../Colors";

const SFormError = styled.Text`
  color: ${colors.error};
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 15px 0px;
`;

function FormError({ message }) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
