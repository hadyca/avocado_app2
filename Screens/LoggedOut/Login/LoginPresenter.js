import React, { useRef } from "react";
import styled from "styled-components/native";
import { Controller } from "react-hook-form";
import AuthButton from "../../../components/auth/AuthButton";
import { TextInput } from "../../../components/auth/AuthShared";
import FormError from "../../../components/auth/FormError";

const Container = styled.View`
  flex: 1;
`;

function LoginPresenter({ onCompleted, onValid }) {
  return (
    <Container>
      <Controller
        name="email"
        rules={{
          required: "이메일을 입력 해주세요.",
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
            value={value}
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
    </Container>
  );
}

export default LoginPresenter;
