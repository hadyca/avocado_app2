import React, { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { colors } from "../../../../Colors";
import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import { UnderBar } from "../../../../Components/Auth/AuthShared";

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

export default function EditUsernamePresenter({
  editUsernameMutation,
  countingText,
  counting,
  loading,
  originUsername,
  todayTime,
  betweenTimeDay,
}) {
  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: originUsername,
    },
    mode: "onChange",
  });

  const onValid = async ({ username }) => {
    if (!loading) {
      editUsernameMutation({
        variables: {
          username,
          usernameEditDate: todayTime,
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
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading, formState.isValid]);

  return (
    <DismissKeyboard>
      <Container>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Username"
              textAlignVertical={"top"}
              maxLength={150}
              autoCapitalize="none"
              onChangeText={(text) => {
                onChange(text);
                countingText(text);
              }}
              value={value}
            />
          )}
        />
        <UnderBar />
        <CountingText>({counting}/150)</CountingText>
      </Container>
    </DismissKeyboard>
  );
}
