import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import ModalSelector from "react-native-modal-selector";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../../../Colors";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { emailRule } from "../../../../RegExp";
import { questionType } from "../../../../Constant";

const Container = styled.View`
  margin: 10px;
`;

const TopContainer = styled.View``;
const Title = styled.Text`
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const TextView = styled.View`
  border: 1px solid ${colors.borderThick};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
`;

const TypeInput = styled.TextInput`
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
  width: 100%;
  margin-top: 30px;
`;

const TitleInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid ${colors.borderThick};
`;

export default function ContactPresenter({ contactMutation, loading }) {
  const [type, setType] = useState({});
  const { control, handleSubmit } = useForm();

  const onValid = async ({ content, email }) => {
    if (!type.value) {
      Alert.alert("유형을 입력해주세요.");
    } else if (!content) {
      Alert.alert("내용을 입력해주세요.");
    } else if (!email) {
      Alert.alert("이메일을 입력해주세요.");
    } else if (!emailRule.test(email)) {
      Alert.alert("이메일 형식이 잘못 되었습니다.");
    } else {
      if (!loading) {
        contactMutation({
          variables: {
            type: type.value,
            content,
            email,
          },
        });
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      extraHeight={150}
      style={{
        backgroundColor: colors.backgraound,
      }}
    >
      <Container>
        <TopContainer>
          <Title>유형</Title>
          <ModalSelector
            data={questionType}
            keyExtractor={(item) => item.id}
            labelExtractor={(item) => item.value}
            accessible={true}
            onChange={(item) => {
              setType({ id: item.id, value: item.value });
            }}
          >
            <TextView>
              <TypeInput
                placeholder={"문의 유형을 선택하세요."}
                placeholderTextColor="#cccccc"
                value={type.value}
              />
              <Ionicons
                name="chevron-forward"
                color="black"
                size={17}
                style={{ marginRight: 10 }}
              />
            </TextView>
          </ModalSelector>
          <Title>내용</Title>
          <Controller
            name="content"
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
              />
            )}
          />
          <Title>Email</Title>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TitleInput
                placeholder="답변 받을 이메일을 입력하세요."
                placeholderTextColor="#cccccc"
                autoCapitalize="none"
                maxLength={100}
                multiline={false}
                returnKeyType="next"
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
          />
        </TopContainer>
        <SubmitContainer>
          <AuthButton
            text={"작성 완료"}
            onPress={handleSubmit(onValid)}
            loading={loading}
          />
        </SubmitContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
}