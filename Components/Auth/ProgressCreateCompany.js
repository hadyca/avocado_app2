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

const ProgressContainer = styled.View`
  flex-direction: row;
`;
const Progress = styled.Text`
  font-size: 18px;
  color: ${colors.buttonBackground};
`;

const Nine = styled.Text`
  font-size: 18px;
  color: ${colors.borderThick};
`;

export default function ProgressCreateCompany({ title, step }) {
  return (
    <TitleView>
      <Title>{title}</Title>
      <ProgressContainer>
        <Progress>{step}</Progress>
        <Nine>/9</Nine>
      </ProgressContainer>
    </TitleView>
  );
}
