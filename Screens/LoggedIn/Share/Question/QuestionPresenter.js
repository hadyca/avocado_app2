import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { colors } from "../../../../Colors";
import AuthButton from "../../../../Components/Auth/AuthButton";

const Container = styled.ScrollView``;
const SubmitContainer = styled.View`
  justify-content: center;
  margin: 10px auto 20px;
  width: 90%;
  border-top-width: 1px;
  border-top-color: ${colors.borderThin};
  border-style: solid;
`;
export default function QuestionPresenter({ refreshing, refresh, data }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  return (
    <>
      <Container></Container>
      <SubmitContainer>
        <AuthButton
          text={"작성 완료"}
          onPress={handleSubmit(onValid)}
          loading={loading}
        />
      </SubmitContainer>
    </>
  );
}
