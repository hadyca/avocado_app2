import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import AuthButton from "../../Components/Auth/AuthButton";
import AuthLayout from "../../Components/Auth/AuthLayout";
import FormError from "../../Components/Auth/FormError";
import { Subtitle } from "../../Components/Auth/Subtitle";
import { TextInput } from "../../Components/Auth/AuthShared";
import { emailRule, passwordRule, usernameRule } from "../../RegExp";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(email: $email, username: $username, password: $password) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { control, handleSubmit, getValues, formState, setError, clearErrors } =
    useForm({
      mode: "onChange",
    });

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    const { email, username, password } = getValues();
    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      return navigation.navigate("ConfirmSecret", {
        email,
        username,
        password,
      });
    }
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [focus3, setFocus3] = useState(false);
  const [focus4, setFocus4] = useState(false);

  return (
    <AuthLayout>
      <Subtitle>Welcome to Avocado Talk! ????</Subtitle>

      {/* email form */}
      <Controller
        name="email"
        rules={{
          required: "???????????? ?????? ?????? ?????????.",
          pattern: {
            value: emailRule,
            message: "????????? ????????? ???????????? ????????????.",
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(usernameRef)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearLoginError}
            hasError={Boolean(formState?.errors?.email)}
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

      {/* {username form} */}
      <Controller
        name="username"
        rules={{
          required: "????????? ????????? ?????? ?????? ?????????.",
          pattern: {
            value: usernameRule,
            message: "??????????????? ????????? ??? ?????????, 20?????? ?????? ??? ????????????.",
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={usernameRef}
            placeholder="Username"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => onChange(text)}
            value={value}
            hasError={Boolean(formState?.errors?.username?.message)}
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
      <FormError message={formState?.errors?.username?.message} />

      {/* password form */}
      <Controller
        name="password"
        rules={{
          required: "??????????????? ?????? ?????? ?????????.",
          pattern: {
            value: passwordRule,
            message:
              "??????, ??????, ???????????? ??? 1?????? ??????????????? ?????? 8????????? ???????????????.",
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={() => onNext(password2Ref)}
            hasError={Boolean(formState?.errors?.password?.message)}
            onFocus={() => {
              setFocus3(true);
            }}
            onBlur={() => {
              setFocus3(false);
            }}
            focus={focus3}
          />
        )}
      />
      <FormError message={formState?.errors?.password?.message} />

      {/* password2 form */}
      <Controller
        name="password2"
        rules={{
          required: "??????????????? ?????? ?????? ?????????.",
          validate: {
            checkAgain: () => {
              const { password, password2 } = getValues();
              return password === password2 || "???????????? ?????????";
            },
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={password2Ref}
            placeholder="Password ??? ??????"
            secureTextEntry
            returnKeyType="done"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={handleSubmit(onValid)}
            hasError={Boolean(formState?.errors?.password2?.message)}
            onFocus={() => {
              setFocus4(true);
            }}
            onBlur={() => {
              setFocus4(false);
            }}
            focus={focus4}
          />
        )}
      />
      <FormError message={formState?.errors?.password2?.message} />

      <AuthButton
        text="??????"
        disabled={!formState.isValid}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
      <FormError message={formState?.errors?.result?.message} />
    </AuthLayout>
  );
}
