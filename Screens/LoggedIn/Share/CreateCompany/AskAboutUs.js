import React, { useState } from "react";
import { Text, useWindowDimensions, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { Subtitle } from "../../../../Components/Auth/Subtitle";
import {
  MultiTextInput,
  TextInput,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";

export default function AskAboutUs({ route: params }) {
  const { height } = useWindowDimensions();
  const [focus1, setFocus1] = useState(false);
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });
  return (
    <AuthLayout>
      <Text>어떤 회사인지 짧게 소개해주세요. 2/7</Text>
      <Controller
        name="abousUs"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <MultiTextInput
            height={height}
            placeholder={"ex)직원 복지가 좋은, 동나이 최고의 garment회사!"}
            autoCapitalize="none"
            multiline={true}
            textAlignVertical={"top"}
            returnKeyType="done"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={Boolean(formState?.errors?.companyName)}
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
        onPress={console.log("next")}
      />
    </AuthLayout>
  );
}
