import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import ModalSelector from "react-native-modal-selector";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../Colors";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { questionType } from "../../../../DistrictList";
import { emailRule } from "../../../../RegExp";

const Container = styled.ScrollView`
  margin: 10px;
`;

const TextView = styled.View`
  border: 1px solid ${colors.borderThick};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TypeInput = styled.TextInput`
  background-color: white;
  padding: 10px;
  color: black;
`;

const ContentInput = styled.TextInput`
  background-color: white;
  height: 300px;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid ${colors.borderThick};
`;

const SubmitContainer = styled.View`
  justify-content: center;
  margin: 10px auto 20px;
  width: 90%;
  border-top-width: 1px;
  border-top-color: ${colors.borderThin};
  border-style: solid;
`;

const TitleInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid ${colors.borderThick};
`;
export default function QuestionPresenter({ questionMutation, loading }) {
  const [type, setType] = useState({});
  const { control, handleSubmit } = useForm();

  const onValid = async ({ content, email }) => {
    if (!loading) {
      questionMutation({
        variables: {
          type: type.value,
          content,
          email,
        },
      });
    }
  };
  return (
    <>
      <Container>
        <ModalSelector
          data={questionType}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.value}
          accessible={true}
          onChange={(item) => {
            setType({ id: item.id, value: item.value });
          }}
          optionContainerStyle={{ height: 500 }}
        >
          <TextView>
            <TypeInput placeholder={"Type"} value={type.value} />
            <Ionicons name="chevron-forward" color="black" size={17} />
          </TextView>
        </ModalSelector>
        <Controller
          name="content"
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ContentInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical={"top"}
              maxLength={1000}
              autoCapitalize="none"
              onChangeText={(text) => onChange(text)}
              value={value || ""}
              placeholder={"적으시오"}
            />
          )}
        />
        <Controller
          name="email"
          rules={{
            required: "이메일 주소를 입력해 주세요.",
            pattern: {
              value: emailRule,
              message: "이메일 주소가 올바르지 않습니다.",
            },
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TitleInput
              placeholder="abc@gamil.com"
              autoCapitalize="none"
              maxLength={100}
              multiline={false}
              returnKeyType="next"
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
      </Container>
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
