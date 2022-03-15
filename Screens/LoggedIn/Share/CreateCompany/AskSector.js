import React, { useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import AuthButton from "../../../../Components/Auth/AuthButton";
// import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import { colors } from "../../../../Colors";
import { UnderBar } from "../../../../Components/Auth/AuthShared";

// const PickerView = styled.View`
//   border-radius: 4px;
//   /* padding: 15px 7px; */
//   border: 1px solid ${colors.borderThick};
//   margin-bottom: 25px;
// `;

export default function AskSector({ route: { params } }) {
  const navigation = useNavigation();
  const [selectedSector, setSelectedSector] = useState("sector1");

  const goTototalEmployees = () => {
    navigation.navigate("AskTotalEmployees", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      sector: selectedSector,
    });
  };

  return (
    <AuthLayout>
      {/* <Text>어떤 업종인지 알려주세요 3/7 </Text>
      <Picker
        selectedValue={selectedSector}
        onValueChange={(itemValue, itemIndex) => setSelectedSector(itemValue)}
      >
        <Picker.Item label="Sector1" value="sector1" />
        <Picker.Item label="Sector2" value="sector2" />
        <Picker.Item label="Sector3" value="sector3" />
        <Picker.Item label="Sector4" value="sector4" />
        <Picker.Item label="Sector1" value="sector1" />
        <Picker.Item label="Sector2" value="sector2" />
        <Picker.Item label="Sector3" value="sector3" />
        <Picker.Item label="Sector4" value="sector4" />
      </Picker>
      <UnderBar />
      <AuthButton
        text="다음"
        disabled={false}
        loading={false}
        onPress={goTototalEmployees}
      /> */}
    </AuthLayout>
  );
}
