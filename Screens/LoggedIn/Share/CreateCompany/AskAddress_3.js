import React, { useState, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { View, Text, useWindowDimensions, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { bigDistrict, smallDistrict } from "../../../../DistrictList";
import styled from "styled-components/native";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { Subtitle } from "../../../../Components/Auth/Subtitle";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import ModalSelector from "react-native-modal-selector";
import FormError from "../../../../Components/Auth/FormError";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

const CREATE_COMPANY_MUTATION = gql`
  mutation createCompany(
    $companyName: String!
    $aboutUs: String!
    $sector: String!
    $totalEmployees: Int!
    $email: String!
    $contactNumber: String!
    $addressStep1: String!
    $addressStep2: String!
    $addressStep3: String!
  ) {
    createCompany(
      companyName: $companyName
      aboutUs: $aboutUs
      sector: $sector
      totalEmployees: $totalEmployees
      email: $email
      contactNumber: $contactNumber
      addressStep1: $addressStep1
      addressStep2: $addressStep2
      addressStep3: $addressStep3
    ) {
      ok
      error
    }
  }
`;

export default function AskAddress_3({ route: { params } }) {
  const navigation = useNavigation();
  const [focus1, setFocus1] = useState(false);

  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
  });

  const onCompleted = async (data) => {
    const {
      createCompany: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      navigation.navigate("CreateCompanyFinish");
    }
  };

  const [createCompanytMutation, { loading }] = useMutation(
    CREATE_COMPANY_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = (data) => {
    if (!loading) {
      createCompanytMutation({
        variables: {
          companyName: params.companyName,
          aboutUs: params.aboutUs,
          sector: params.sector,
          totalEmployees: parseInt(params.totalEmployees),
          email: params.email,
          contactNumber: params.contactNumber,
          addressStep1: params.addressStep1,
          addressStep2: params.addressStep2,
          addressStep3: data.addressStep3,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <ProgressCreateCompany
        title={"마지막 세부주소를 입력해 주세요."}
        step={"9"}
      />
      <Controller
        name="addressStep3"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder="01 Công xã Paris, Bến Nghé"
            autoCapitalize="none"
            returnKeyType="done"
            maxLength={100}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={false}
            onSubmitEditing={handleSubmit(onValid)}
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
      <UnderBar lastOne={true} />
      <FormError message={formState?.errors?.result?.message} />
      <AuthButton
        text="완료"
        disabled={!formState.isValid}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
