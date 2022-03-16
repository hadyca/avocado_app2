import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { TextInput } from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { emailRule } from "../../../../RegExp";
import FormError from "../../../../Components/Auth/FormError";

const CHECK_EMAIL_MUTATION = gql`
  mutation checkEmail($email: String!) {
    checkEmail(email: $email) {
      ok
      error
    }
  }
`;

export default function AskEmail({ route: { params } }) {
  const navigation = useNavigation();
  const [focus1, setFocus1] = useState(false);
  const { control, handleSubmit, getValues, formState, setError, clearErrors } =
    useForm({
      mode: "onChange",
    });

  const onCompleted = (data) => {
    const {
      checkEmail: { ok, error },
    } = data;
    const { email } = getValues();
    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      return navigation.navigate("AskContactNumber", {
        companyName: params.companyName,
        aboutUs: params.aboutUs,
        sector: params.sector,
        totalEmployees: params.totalEmployees,
        email,
      });
    }
  };

  const [checkEmailMutation, { loading }] = useMutation(CHECK_EMAIL_MUTATION, {
    onCompleted,
  });

  const clearEmailError = () => {
    clearErrors("result");
  };

  const onValid = (data) => {
    if (!loading) {
      checkEmailMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <Text>이메일 주소를 넣어주세요. 5/7</Text>
      <Controller
        name="email"
        rules={{
          required: true,
          pattern: emailRule,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={"Email"}
            autoCapitalize="none"
            returnKeyType="done"
            keyboardType="email-address"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearEmailError}
            hasError={Boolean(formState?.errors?.email)}
            onSubmitEditing={handleSubmit(onValid)}
            onFocus={() => {
              setFocus1(true);
            }}
            onBlur={() => {
              setFocus1(false);
            }}
            focus={focus1}
          />
        )}
      />
      <FormError message={formState?.errors?.result?.message} />
      <AuthButton
        text="다음"
        disabled={!formState.isValid}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
