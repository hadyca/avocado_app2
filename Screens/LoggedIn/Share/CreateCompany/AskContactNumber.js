import React, { useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import {
  TextInput,
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { onlyNumber } from "../../../../RegExp";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

export default function AskContactNumber({ route: { params } }) {
  const navigation = useNavigation();
  const [focus1, setFocus1] = useState(false);
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const goToAskAddress = () => {
    const { contactNumber } = getValues();
    navigation.navigate("AskAddress_1", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      sector: params.sector,
      totalEmployees: params.totalEmployees,
      email: params.email,
      contactNumber,
    });
  };

  return (
    <AuthLayout>
      <ProgressCreateCompany title={"연락처를 알려주세요"} step={"5"} />

      <Controller
        name="contactNumber"
        rules={{
          required: true,
          pattern: {
            value: onlyNumber,
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder="Contact Number"
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={false}
            onSubmitEditing={goToAskAddress}
            maxLength={100}
          />
        )}
      />
      <UnderBar lastOne={true} />

      <AuthButton
        text="다음"
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAskAddress}
      />
    </AuthLayout>
  );
}
