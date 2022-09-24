import React from "react";
import styled from "styled-components/native";
import { categories_KR, CategoryExplain_KR } from "../../Constant";

const SContentInput = styled.TextInput`
  padding: 15px 7px;
  color: black;
  min-height: 250px;
`;

export default function ContentInput({
  multiline,
  textAlignVertical,
  autoCapitalize,
  onChangeText,
  maxLength,
  value,
  categoryName,
}) {
  return (
    <SContentInput
      multiline={multiline}
      placeholder={
        categoryName === categories_KR[0]
          ? CategoryExplain_KR[0]
          : categoryName === categories_KR[1]
          ? CategoryExplain_KR[1]
          : categoryName === categories_KR[2]
          ? CategoryExplain_KR[2]
          : categoryName === categories_KR[3]
          ? CategoryExplain_KR[3]
          : categoryName === categories_KR[4]
          ? CategoryExplain_KR[4]
          : categoryName === categories_KR[5]
          ? CategoryExplain_KR[5]
          : categoryName === categories_KR[6]
          ? CategoryExplain_KR[6]
          : categoryName === categories_KR[7]
          ? CategoryExplain_KR[7]
          : categoryName === categories_KR[8]
          ? CategoryExplain_KR[8]
          : CategoryExplain_KR[9]
      }
      autoCapitalize={autoCapitalize}
      maxLength={maxLength}
      textAlignVertical={"top"}
      onChangeText={onChangeText}
      value={value || ""}
    />
  );
}
