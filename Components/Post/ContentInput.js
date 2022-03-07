import React from "react";
import styled from "styled-components/native";
import { categories, CategoryExplain } from "../../Constant";

const SContentInput = styled.TextInput`
  padding: 15px 7px;
  color: black;
`;

export default function ContentInput({
  multiline,
  autoCapitalize,
  onChangeText,
  value,
  categoryName,
}) {
  return (
    <SContentInput
      multiline={multiline}
      placeholder={
        categoryName === categories[0]
          ? CategoryExplain[0]
          : categoryName === "질문"
          ? "궁금한 것을 물어보세요! 누군가가 친절하게 답변 해줄거에요."
          : categoryName === "피부 미용"
          ? "미용 관련해서 정보를 나누어 주세요."
          : categoryName === "출산/육아"
          ? "아이 키우는데 필요한 정보나 노하우를 공유해주세요."
          : categoryName === "동네 정보"
          ? "동네 여러 이슈들을 공유해주세요!"
          : categoryName === "연애/결혼"
          ? "연애나 결혼에 대해 가지고 있는 고민거리나 좋은 정보들을 알려주세요."
          : categoryName === "요리/음식"
          ? "요리방법, 맛집과 같은 음식 관련 정보들을 공유해주세요."
          : categoryName === "일상"
          ? "오늘 하루 어땠는지 다른사람들과 이야기 해보세요."
          : categoryName === "일반/기타"
          ? "여러사람들과 정보를 공유하고 대화해보세요."
          : "다른사람들에게 질문이나 이야기를 해보세요."
      }
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      value={value || ""}
    />
  );
}
