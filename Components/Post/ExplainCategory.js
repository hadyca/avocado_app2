import React from "react";
import styled from "styled-components/native";
import { categories_KR } from "../../Constant";
const Text = styled.Text`
  font-size: 13px;
`;

export default function ExplainCategory({ categoryName }) {
  return categories_KR.map((item, index) =>
    categoryName === item.categoryName ? (
      <Text key={index}>{item.content}</Text>
    ) : null
  );
}
