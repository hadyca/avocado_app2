import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AuthButton from "../../Components/Auth/AuthButton";
import { logUserIn } from "../../apollo";
import FormError from "../../Components/Auth/FormError";
import { TextInput } from "../../Components/Auth/AuthShared";
import { passwordRule } from "../../RegExp";
import CreateAccountLayout from "../../Components/CreateAccountLayout";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";

const CREATE_PASSWORD_MUTATION = gql`
  mutation createPassword(
    $password: String!
    $email: String!
    $username: String!
    $language: String!
    $pushToken: String!
  ) {
    createPassword(
      password: $password
      email: $email
      username: $username
      language: $language
      pushToken: $pushToken
    ) {
      ok
      error
      token
    }
  }
`;

export default function AskPassword({ route: { params } }) {
  const { t } = useTranslation();

  const onCompleted = async (data) => {
    const {
      createPassword: { ok, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: t("share.5"),
      });
    } else {
      await logUserIn(token);
    }
  };

  const [confirmSecretMutation, { loading }] = useMutation(
    CREATE_PASSWORD_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = (data) => {
    if (!loading) {
      confirmSecretMutation({
        variables: {
          password: data.password,
          email: params.email,
          username: params.username,
          language: params.language,
          pushToken: params.pushToken,
        },
      });
    }
  };

  const { control, handleSubmit, getValues, formState, setError } = useForm({
    mode: "onChange",
  });

  const passwordRef = useRef();
  const password2Ref = useRef();
  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  return (
    <CreateAccountLayout step={4}>
      <ProgressCreateCompany title={t("askPassword.1")} />
      <FormError message={formState?.errors?.result?.message} />
      <FormError message={formState?.errors?.password?.message} />
      <Controller
        name="password"
        rules={{
          required: true,
          pattern: {
            value: passwordRule,
            message: t("askPassword.3"),
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder={t("askPassword.1")}
            placeholderTextColor="#cccccc"
            secureTextEntry
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={() => onNext(password2Ref)}
            hasError={Boolean(formState?.errors?.password?.message)}
          />
        )}
      />
      <FormError message={formState?.errors?.password2?.message} />
      <Controller
        name="password2"
        rules={{
          required: true,
          validate: {
            checkAgain: () => {
              const { password, password2 } = getValues();
              return password === password2 || t("askPassword.4");
            },
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={password2Ref}
            lastOne={true}
            placeholder={t("askPassword.2")}
            placeholderTextColor="#cccccc"
            secureTextEntry
            returnKeyType="done"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={handleSubmit(onValid)}
            hasError={Boolean(formState?.errors?.password2?.message)}
          />
        )}
      />
      <AuthButton
        text={t("share.3")}
        disabled={!formState.isValid}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </CreateAccountLayout>
  );
}
