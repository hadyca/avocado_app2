import React, { useState, useRef } from "react";
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
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

export default function AskAddress_2({ route: { params } }) {
  const navigation = useNavigation();
  const [add_2, setAdd_2] = useState("");

  const goToAddress_3 = () => {
    navigation.navigate("AskAddress_3", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      sector: params.sector,
      totalEmployees: params.totalEmployees,
      email: params.email,
      contactNumber: params.contactNumber,
      addressStep1: params.addressStep1.value,
      addressStep2: add_2,
    });
  };
  return (
    <AuthLayout>
      <ProgressCreateCompany
        title={"두번째 도시를 선택해 주세요."}
        step={"7"}
      />
      <ModalSelector
        data={smallDistrict[params.addressStep1.id - 1]}
        keyExtractor={(item) => item.id}
        labelExtractor={(item) => item.value}
        accessible={true}
        onChange={(item) => {
          setAdd_2(item.value);
        }}
        // cancelText={"Cancel"}
        optionContainerStyle={{ height: 500 }}
      >
        <TextInput_Company
          placeholder={"Select your second city!"}
          value={add_2}
        />
      </ModalSelector>
      <UnderBar lastOne={true} />
      <AuthButton
        text="다음"
        disabled={!add_2}
        loading={false}
        onPress={goToAddress_3}
      />
    </AuthLayout>
  );
}
