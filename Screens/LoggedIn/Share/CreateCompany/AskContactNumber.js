import React, { useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { TextInput } from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { onlyNumber } from "../../../../RegExp";

export default function AskContactNumber({ route: { params } }) {
  const navigation = useNavigation();
  const [focus1, setFocus1] = useState(false);
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const goToAskAddress = () => {
    const { contactNumber } = getValues();
    navigation.navigate("AskAddress", {
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
      <Text>
        연락받을 수 있는 전화번호를 넣어주세요. (숫자만 넣어주세요.) 6/7
      </Text>
      <Controller
        name="contactNumber"
        rules={{
          required: true,
          pattern: {
            value: onlyNumber,
          },
          minLength: 5,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={"Contanct Number"}
            autoCapitalize="none"
            returnKeyType="done"
            keyboardType="number-pad"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={false}
            onSubmitEditing={goToAskAddress}
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
        onPress={goToAskAddress}
      />
    </AuthLayout>
  );
}
