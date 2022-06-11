import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import CreatCompanyLayout from "../../../../Components/CreatCompanyLayout";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { onlyNumber } from "../../../../RegExp";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

export default function AskTotalEmployees({ route: { params } }) {
  const navigation = useNavigation();
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const goToAskEmail = () => {
    const { totalEmployees } = getValues();
    navigation.navigate("AskEmail", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      sector: params.sector,
      totalEmployees,
    });
  };

  return (
    <CreatCompanyLayout>
      <ProgressCreateCompany title={"총 임직원 수를 알려주세요!"} step={"4"} />
      <Controller
        name="totalEmployees"
        rules={{
          required: true,
          pattern: {
            value: onlyNumber,
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder="Your company total Employees"
            autoCapitalize="none"
            returnKeyType="done"
            keyboardType="number-pad"
            onChangeText={(text) => onChange(text)}
            value={value}
            hasError={false}
            onSubmitEditing={goToAskEmail}
            maxLength={7}
          />
        )}
      />
      <UnderBar lastOne={true} />
      <AuthButton
        text="다음"
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAskEmail}
      />
    </CreatCompanyLayout>
  );
}
