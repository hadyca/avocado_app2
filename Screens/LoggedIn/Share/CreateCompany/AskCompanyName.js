import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components/native";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

export default function AskCompanyName() {
  const navigation = useNavigation();
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const goToAboutUs = () => {
    const { companyName } = getValues();
    navigation.navigate("AskAboutUs", {
      companyName,
    });
  };

  return (
    <AuthLayout>
      <ProgressCreateCompany title={"회사 이름을 알려주세요"} step={"1"} />
      <Controller
        name="companyName"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder="Company name"
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={false}
            onSubmitEditing={goToAboutUs}
            maxLength={100}
          />
        )}
      />
      <UnderBar lastOne={true} />
      <AuthButton
        text="다음"
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAboutUs}
      />
    </AuthLayout>
  );
}
