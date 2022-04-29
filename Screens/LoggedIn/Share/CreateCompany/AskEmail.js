import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { emailRule } from "../../../../RegExp";
import FormError from "../../../../Components/Auth/FormError";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

export default function AskEmail({ route: { params } }) {
  const navigation = useNavigation();
  const { control, handleSubmit, getValues, formState, setError, clearErrors } =
    useForm({
      mode: "onChange",
    });

  const goToContactNumber = () => {
    const { email } = getValues();
    return navigation.navigate("AskContactNumber", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      sector: params.sector,
      totalEmployees: params.totalEmployees,
      email,
    });
  };

  const clearEmailError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <ProgressCreateCompany title={"이메일 주소를 알려주세요!"} step={"5"} />
      <Controller
        name="email"
        rules={{
          required: true,
          pattern: emailRule,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder="Your@Eamil.com"
            autoCapitalize="none"
            returnKeyType="done"
            keyboardType="email-address"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearEmailError}
            hasError={false}
            onSubmitEditing={goToContactNumber}
            maxLength={50}
          />
        )}
      />
      <UnderBar
        lastOne={!formState?.errors?.result?.message}
        hasError={formState?.errors?.result?.message}
      />
      <FormError message={formState?.errors?.result?.message} />
      <AuthButton
        text="다음"
        disabled={!formState.isValid}
        onPress={goToContactNumber}
      />
    </AuthLayout>
  );
}
