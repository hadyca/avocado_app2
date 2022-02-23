import React from "react";
import styled from "styled-components/native";
import { categories } from "../../Constant";

const ExplainText = styled.Text`
  padding: 15px 7px;
  color: black;
`;

export default function ExplainCategory({
  categoryName,
}) {
  return categoryName === categories.[0] ? (
    <ExplainText>으하하</ExplainText>
  ) : (
    <ExplainText>으하하2</ExplainText>
  );
}
