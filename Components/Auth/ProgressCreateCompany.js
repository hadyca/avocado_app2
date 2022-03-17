import React from "react";
import styled from "styled-components/native";
import { colors } from "../../Colors";

const TitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
`;

const Progress = styled.Text`
  font-size: 18px;
`;

export default function ProgressCreateCompany({ title, step }) {
  return (
    <TitleView>
      <Title>{title}</Title>
      <Progress>{step} / 9</Progress>
    </TitleView>
  );
}
