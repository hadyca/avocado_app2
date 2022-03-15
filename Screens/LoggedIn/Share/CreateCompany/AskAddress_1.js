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

export default function AskAddress_1({ route: { params } }) {
  const navigation = useNavigation();
  const [add_1, setAdd_1] = useState({});

  const goToAddress_2 = () => {
    console.log(add_1);
    navigation.navigate("AskAddress_2", {
      // companyName: params.companyName,
      // aboutUs: params.aboutUs,
      // sector: params.sector,
      // totalEmployees: params.totalEmployees,
      // email: params.email,
      // contactNumber: params.contactNumber,
      addressStep1: add_1,
    });
  };

  return (
    <AuthLayout>
      <ModalSelector
        data={bigDistrict}
        keyExtractor={(item) => item.id}
        labelExtractor={(item) => item.value}
        accessible={true}
        onChange={(item) => {
          setAdd_1({ id: item.id, value: item.value });
        }}
        // cancelText={"Cancel"}
        optionContainerStyle={{ height: 500 }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            height: 50,
            color: "black",
          }}
          editable={false}
          placeholder="Select your first address!"
          value={add_1.value}
        />
      </ModalSelector>
      <AuthButton
        text="다음"
        disabled={!add_1.value}
        loading={false}
        onPress={goToAddress_2}
      />
    </AuthLayout>
  );
}
