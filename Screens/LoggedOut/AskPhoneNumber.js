import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-native-phone-number-input";
import AuthButton from "../../Components/Auth/AuthButton";
import FormError from "../../Components/Auth/FormError";
import { colors } from "../../Colors";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";
import CreateAccountLayout from "../../Components/CreateAccountLayout";
import styled from "styled-components/native";

const CHECK_ACCOUNT_MUTATION = gql`
  mutation checkAccount(
    $language: String!
    $countryCode: String!
    $phoneNumber: String!
    $accountNumber: String!
  ) {
    checkAccount(
      language: $language
      countryCode: $countryCode
      phoneNumber: $phoneNumber
      accountNumber: $accountNumber
    ) {
      ok
    }
  }
`;

const InputContainer = styled.View`
  margin-bottom: 25px;
`;

export default function AskPhoneNumber({ route: { params } }) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(true);
  const phoneInput = useRef();
  const navigation = useNavigation();

  const { setError, clearErrors, formState } = useForm({
    mode: "onChange",
  });

  const clearLoginError = () => {
    clearErrors("result");
  };

  const onCompleted = (data) => {
    const {
      checkAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error === "100" ? t("askPhoneNumber.4") : null,
      });
    } else {
      return navigation.navigate("ConfirmSecret", {
        countryCode: phoneInput.current?.getCallingCode(),
        phoneNumber: value,
        accountNumber: formattedValue.substring(1),
        pushToken: params.pushToken,
        language: params.language,
      });
    }
  };

  const [createAccountMutation, { loading }] = useMutation(
    CHECK_ACCOUNT_MUTATION,
    {
      variables: {
        language: params.language,
        countryCode: phoneInput.current?.getCallingCode(),
        phoneNumber: value,
        accountNumber: formattedValue.substring(1),
      },
      onCompleted,
    }
  );

  return (
    <CreateAccountLayout step={"1"}>
      <ProgressCreateCompany title={t("askPhoneNumber.1")} />
      {!valid ? <FormError message={t("askPhoneNumber.2")} /> : null}
      {!formState.isValid ? (
        <FormError message={t("askPhoneNumber.4")} />
      ) : null}
      <InputContainer>
        <PhoneInput
          containerStyle={{
            width: "100%",
            backgroundColor: colors.greyBackround,
          }}
          // textInputStyle={{ color: "blue" }}
          // textContainerStyle={{ backgroundColor: "red" }}
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
      </InputContainer>
      <AuthButton
        text={t("share.4")}
        loading={loading}
        onPress={() => {
          const checkValid = phoneInput.current?.isValidNumber(value);
          setValid(checkValid ? checkValid : false);
          if (checkValid) {
            createAccountMutation();
          }
        }}
      />
    </CreateAccountLayout>
  );
}
