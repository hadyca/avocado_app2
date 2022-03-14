import React, { useState, useRef } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { bigDistrict } from "../../../../DistrictList";
import styled from "styled-components/native";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { Subtitle } from "../../../../Components/Auth/Subtitle";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";

export default function AskAddress({ route: { params } }) {
  const searchRef = useRef(null);
  const dropdownController = useRef(null);

  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const { height } = useWindowDimensions;

  const goToAboutUs = () => {
    // const { companyName } = getValues();
    // navigation.navigate("AskAboutUs", {
    //   companyName,
    // });
  };

  return <View></View>;
}
