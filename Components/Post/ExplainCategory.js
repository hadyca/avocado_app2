import React from "react";
import styled from "styled-components/native";
import { categories_KR, CategoryExplain_KR } from "../../Constant";
const ExplainText = styled.Text`
  font-size: 13px;
`;

export default function ExplainCategory({ categoryName }) {
  return categoryName === categories_KR[0] ? (
    <ExplainText>{CategoryExplain_KR[0]}</ExplainText>
  ) : categoryName === categories_KR[1] ? (
    <ExplainText>{CategoryExplain_KR[1]}</ExplainText>
  ) : categoryName === categories_KR[2] ? (
    <ExplainText>{CategoryExplain_KR[2]}</ExplainText>
  ) : categoryName === categories_KR[3] ? (
    <ExplainText>{CategoryExplain_KR[3]}</ExplainText>
  ) : categoryName === categories_KR[4] ? (
    <ExplainText>{CategoryExplain_KR[4]}</ExplainText>
  ) : categoryName === categories_KR[5] ? (
    <ExplainText>{CategoryExplain_KR[5]}</ExplainText>
  ) : categoryName === categories_KR[6] ? (
    <ExplainText>{CategoryExplain_KR[6]}</ExplainText>
  ) : categoryName === categories_KR[7] ? (
    <ExplainText>{CategoryExplain_KR[7]}</ExplainText>
  ) : categoryName === categories_KR[8] ? (
    <ExplainText>{CategoryExplain_KR[8]}</ExplainText>
  ) : null;
}

// categoryName === categories_KR[0]
// ? CategoryExplain_KR[0]
// : categoryName === categories_KR[1]
// ? CategoryExplain_KR[1]
// : categoryName === categories_KR[2]
// ? CategoryExplain_KR[2]
// : categoryName === categories_KR[3]
// ? CategoryExplain_KR[3]
// : categoryName === categories_KR[4]
// ? CategoryExplain_KR[4]
// : categoryName === categories_KR[5]
// ? CategoryExplain_KR[5]
// : categoryName === categories_KR[6]
// ? CategoryExplain_KR[6]
// : categoryName === categories_KR[7]
// ? CategoryExplain_KR[7]
// : categoryName === categories_KR[8]
// ? CategoryExplain_KR[8]
// : CategoryExplain_KR[9]
