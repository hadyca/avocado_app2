import React, { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { colors } from "../../../../Colors";
import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import { UnderBar } from "../../../../Components/Auth/AuthShared";
import { emailRule } from "../../../../RegExp";

const HeaderRightText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const Container = styled.View`
  margin: 10px;
`;
const TextInput = styled.TextInput`
  padding: 15px 7px 0px 3px;
  color: black;
`;

const CountingText = styled.Text`
  color: ${colors.buttonBackground};
  font-size: 11px;
`;

export default function EditCompanyEmailPresenter({
  editEmailMutation,
  countingText,
  counting,
  loading,
  originEmail,
}) {
  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: originEmail,
    },
    mode: "onChange",
  });

  const onValid = async ({ email }) => {
    if (!loading) {
      editEmailMutation({
        variables: {
          email,
        },
      });
    }
  };
  const NoHeaderRight = () => (
    <TouchableOpacity disabled={true} style={{ marginRight: 10, opacity: 0.5 }}>
      <HeaderRightText>Done</HeaderRightText>
    </TouchableOpacity>
  );

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText>Done</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading
        ? HeaderRightLoading
        : !formState.isValid
        ? NoHeaderRight
        : OkHeaderRight,
    });
  }, [loading, formState.isValid]);
  return (
    <DismissKeyboard>
      <Container>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: emailRule,
              message: "이메일 주소가 올바르지 않습니다.",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Your@Eamil.com"
              textAlignVertical={"top"}
              maxLength={50}
              autoCapitalize="none"
              returnKeyType="done"
              keyboardType="email-address"
              onChangeText={(text) => {
                onChange(text);
                countingText(text);
              }}
              value={value}
            />
          )}
        />
        <UnderBar />
        <CountingText>({counting}/50)</CountingText>
      </Container>
    </DismissKeyboard>
  );
}
