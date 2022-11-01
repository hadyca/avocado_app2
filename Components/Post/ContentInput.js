import React from "react";
import styled from "styled-components/native";
import { categories } from "../../Constant";

const SContentInput = styled.TextInput`
  padding: 15px 7px;
  color: black;
  min-height: 250px;
`;

export default function ContentInput({
  multiline,
  autoCapitalize,
  onChangeText,
  maxLength,
  value,
  categoryId,
}) {
  return categories.map((item, index) =>
    categoryId === item.id ? (
      <SContentInput
        key={index}
        multiline={multiline}
        placeholder={item.content}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        textAlignVertical={"top"}
        onChangeText={onChangeText}
        value={value || ""}
      />
    ) : null
  );
}
