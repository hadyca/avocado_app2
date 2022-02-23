import React from "react";
import styled from "styled-components/native";
import { categories } from "../../Constant";

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
  return categoryName === categories.[0] ? (
    <SContentInput
      multiline={multiline}
      placeholder="일이나 직업관련해서 얘기해봐요"
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      value={value || ""}
    />
  ) : (
    <SContentInput
      multiline={multiline}
      placeholder="동나이 지역 사람들과 질문이나 이야기를 해보세요"
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      value={value || ""}
    />
  );
}
