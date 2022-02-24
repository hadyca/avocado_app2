import React from "react";
import styled from "styled-components/native";

const ExplainText = styled.Text`
  font-size: 13px;
`;

export default function ExplainCategory({ categoryName }) {
  return categoryName === "일/직업" ? (
    <ExplainText>여러 사람들과 일과 관련된 이야기를 해보세요.</ExplainText>
  ) : categoryName === "질문" ? (
    <ExplainText>
      궁금한 것을 물어보세요! 누군가가 친절하게 답변 해줄거에요.
    </ExplainText>
  ) : categoryName === "피부 미용" ? (
    <ExplainText>미용 관련해서 정보를 나누어 주세요.</ExplainText>
  ) : categoryName === "출산/육아" ? (
    <ExplainText>
      아이 키우는데 필요한 정보나 노하우를 공유해주세요.
    </ExplainText>
  ) : categoryName === "동네 정보" ? (
    <ExplainText>동네 여러 이슈들을 공유해주세요!</ExplainText>
  ) : categoryName === "연애/결혼" ? (
    <ExplainText>
      연애나 결혼에 대해 가지고 있는 고민거리나 좋은 정보들을 알려주세요.
    </ExplainText>
  ) : categoryName === "요리/음식" ? (
    <ExplainText>
      요리방법, 맛집과 같은 음식 관련 정보들을 공유해주세요.
    </ExplainText>
  ) : categoryName === "일상" ? (
    <ExplainText>오늘 하루 어땠는지 다른사람들과 이야기 해보세요.</ExplainText>
  ) : categoryName === "일반/기타" ? (
    <ExplainText>여러사람들과 정보를 공유하고 대화해보세요.</ExplainText>
  ) : null;
}
