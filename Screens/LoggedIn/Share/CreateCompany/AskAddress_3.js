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

export default function AskAddress_3({ route: { params } }) {
  const navigation = useNavigation();
  const [add_1, setAdd_1] = useState({});
  const [add_2, setAdd_2] = useState("");

  const goToAboutUs = () => {
    // const { companyName } = getValues();
    // navigation.navigate("AskAboutUs", {
    //   companyName,
    // });
  };
  return (
    <View>
      <ModalSelector
        data={bigDistrict}
        keyExtractor={(item) => item.id}
        labelExtractor={(item) => item.value}
        accessible={true}
        onChange={(item) => {
          if (add_1.id !== item.id) {
            setAdd_1({ id: item.id, value: item.value });
            setAdd_2("");
          } else {
            return null;
          }
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
      <ModalSelector
        data={smallDistrict[add_1.id - 1]}
        keyExtractor={(item) => item.id}
        labelExtractor={(item) => item.value}
        accessible={true}
        onChange={(item) => {
          setAdd_2(item.value);
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
          placeholder="Select your next address!"
          value={add_2}
        />
      </ModalSelector>
    </View>
  );
}
