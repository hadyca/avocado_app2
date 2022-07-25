import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components/native";
import CreatCompanyLayout from "../../../../Components/CreatCompanyLayout";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";
import { colors } from "../../../../Colors";

const AboutUsView = styled.View`
  margin-bottom: 25px;
`;

const CountingText = styled.Text`
  color: ${colors.buttonBackground};
  align-self: flex-end;
  font-size: 11px;
`;

export default function AskAboutUs({ route: { params } }) {
  const navigation = useNavigation();
  const [counting, setCounting] = useState(0);
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });
  const countingText = (value) => {
    return setCounting(value.length);
  };

  const goToAskTotalEmployees = () => {
    const { aboutUs } = getValues();
    navigation.navigate("AskTotalEmployees", {
      companyName: params.companyName,
      aboutUs,
    });
  };

  return (
    <CreatCompanyLayout>
      <ProgressCreateCompany
        title={"어떤 회사인지 멋지게 소개해 주세요!"}
        step={"2"}
      />
      <Controller
        name="aboutUs"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <AboutUsView>
            <TextInput_Company
              placeholder={"ex)직원 복지가 좋은, 동나이 최고의 garment회사!"}
              autoCapitalize="none"
              returnKeyType="done"
              onChangeText={(text) => {
                onChange(text);
                countingText(text);
              }}
              value={value || ""}
              hasError={false}
              onSubmitEditing={goToAskTotalEmployees}
              maxLength={150}
            />
            <UnderBar lastOne={false} />
            <CountingText>글자수 제한 ({counting}/150)</CountingText>
          </AboutUsView>
        )}
      />

      <AuthButton
        text="다음"
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAskTotalEmployees}
      />
    </CreatCompanyLayout>
  );
}
