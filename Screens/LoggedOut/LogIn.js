import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-native-phone-number-input";
import { logUserIn } from "../../apollo";
import { colors } from "../../Colors";
import AuthButton from "../../Components/Auth/AuthButton";
import { TextInput } from "../../Components/Auth/AuthShared";
import FormError from "../../Components/Auth/FormError";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";
import CreateAccountLayout from "../../Components/CreateAccountLayout";

const LOGIN_MUTATION = gql`
  mutation login(
    $accountNumber: String!
    $password: String!
    $pushToken: String!
    $language: String!
  ) {
    login(
      accountNumber: $accountNumber
      password: $password
      pushToken: $pushToken
      language: $language
    ) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(true);
  const phoneInput = useRef();

  const { handleSubmit, watch, control, setError, clearErrors, formState } =
    useForm();

  const passwordRef = useRef();

  const onCompleted = async (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error === "200" ? t("logIn.3") : t("share.5"),
      });
    } else {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = async ({ password }) => {
    if (!loading) {
      await logInMutation({
        variables: {
          accountNumber: formattedValue.substring(1),
          password,
          pushToken: params.pushToken,
          language: params.language,
        },
      });
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <CreateAccountLayout>
      <ProgressCreateCompany title={"haha"} />
      <FormError message={formState?.errors?.result?.message} />
      <PhoneInput
        containerStyle={{
          width: "100%",
          backgroundColor: "white",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: colors.borderThick,
          borderRadius: 4,
          paddingRight: 5,
          marginBottom: 8,
          height: 55,
        }}
        textContainerStyle={{
          backgroundColor: "white",
        }}
        filterProps={{ placeholder: t("askPhoneNumber.3") }}
        ref={phoneInput}
        defaultValue={value}
        placeholder={t("createAccount.1")}
        defaultCode="VN"
        layout="first"
        onChangeText={(text) => {
          setValue(text);
          setValid(true);
          clearLoginError();
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
          setValid(true);
          clearLoginError();
        }}
      />
      <Controller
        name="password"
        rules={{
          required: "비밀번호를 입력 해주세요.",
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            lastOne={true}
            value={value || ""}
            ref={passwordRef}
            placeholder={t("logIn.2")}
            placeholderTextColor="#cccccc"
            secureTextEntry
            returnKeyType="done"
            hasError={Boolean(formState?.errors?.password?.message)}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => onChange(text)}
            onChange={clearLoginError}
          />
        )}
      />
      <AuthButton
        text={t("logIn.4")}
        loading={loading}
        disabled={!valid || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </CreateAccountLayout>
  );
}
