import React, { useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components/native";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { Subtitle } from "../../../../Components/Auth/Subtitle";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";

const Title = styled.Text`
  font-size: 20px;
`;

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
      <TitleView>
      <Title>회사 이름을 알려주세요.</Title>
      <Process>회사 이름을 알려주세요.</Title>
      </TitleView>
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
      <UnderBar />
      <AuthButton
        text="다음"
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAboutUs}
      />
    </AuthLayout>
  );
}
