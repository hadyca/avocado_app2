import React, { useState, useEffect } from "react";
import { Text, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { MultiTextInput } from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";

export default function AskAboutUs({ route: { params } }) {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [counting, setCounting] = useState(0);
  const [focus1, setFocus1] = useState(false);
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });
  const countingText = (value) => {
    return setCounting(value.length);
  };

  const goToAskSector = () => {
    const { aboutUs } = getValues();
    navigation.navigate("AskSector", {
      companyName: params.companyName,
      aboutUs,
    });
  };

  // useEffect(() => {
  //   if (params.companyName) {
  //     setCompanyName(params.companyName);
  //   }
  // }, [params]);

  return (
    <AuthLayout>
      <Text>어떤 회사인지 짧게 소개해주세요. 2/7 {counting}/100</Text>
      <Controller
        name="aboutUs"
        rules={{
          required: true,
          maxLength: 100,
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
            onChangeText={(text) => {
              onChange(text);
              countingText(text);
            }}
            value={value || ""}
            hasError={false}
            onSubmitEditing={goToAskSector}
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
        onPress={goToAskSector}
      />
    </AuthLayout>
  );
}
