import React, { useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { Subtitle } from "../../../../Components/Auth/Subtitle";
import { TextInput } from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";

export default function AskCompanyName() {
  const navigation = useNavigation();
  const [focus1, setFocus1] = useState(false);
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
      <Subtitle>
        기업 회원 가입해주셔서 감사합니다. 7개의 정보만 알려주시면 금방
        끝납니다.
      </Subtitle>
      <Text>회사 이름을 알려주세요. 1/7</Text>
      <Controller
        name="companyName"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Company name"
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={false}
            onSubmitEditing={goToAboutUs}
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
        onPress={goToAboutUs}
      />
    </AuthLayout>
  );
}
