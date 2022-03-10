import React, { useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { TextInput } from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { emailRule } from "../../../../RegExp";

export default function AskEmail({ route: { params } }) {
  const navigation = useNavigation();
  const [focus1, setFocus1] = useState(false);
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const goToAskContactNumber = () => {
    const { email } = getValues();
    navigation.navigate("AskContactNumber", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      sector: params.sector,
      totalEmployees: params.totalEmployees,
      email,
    });
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
            hasError={false}
            onSubmitEditing={goToAskContactNumber}
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

      <AuthButton
        text="다음"
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAskContactNumber}
      />
    </AuthLayout>
  );
}
