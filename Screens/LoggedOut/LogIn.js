import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { logUserIn } from "../../apollo";
import AuthButton from "../../Components/Auth/AuthButton";
import AuthLayout from "../../Components/Auth/AuthLayout";
import { TextInput } from "../../Components/Auth/AuthShared";
import FormError from "../../Components/Auth/FormError";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!, $pushToken: String!) {
    login(email: $email, password: $password, pushToken: $pushToken) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);

  const { handleSubmit, watch, setError, control, formState, clearErrors } =
    useForm();

  const passwordRef = useRef();

  const onCompleted = async (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
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

  const onValid = async ({ email, password }) => {
    if (!loading) {
      await logInMutation({
        variables: {
          email,
          password,
          pushToken: params.pushToken,
        },
      });
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <Controller
        name="email"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearLoginError}
            hasError={Boolean(formState.errors?.email?.message)}
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
      <Controller
        name="password"
        rules={{
          required: "비밀번호를 입력 해주세요.",
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value || ""}
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            returnKeyType="done"
            hasError={Boolean(formState?.errors?.password?.message)}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => onChange(text)}
            onChange={clearLoginError}
            onFocus={() => {
              setFocus2(true);
            }}
            onBlur={() => {
              setFocus2(false);
            }}
            focus={focus2}
          />
        )}
      />
      <FormError message={formState?.errors?.result?.message} />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
