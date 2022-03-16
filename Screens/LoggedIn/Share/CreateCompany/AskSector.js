import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import AuthButton from "../../../../Components/Auth/AuthButton";
// import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import { colors } from "../../../../Colors";
import { UnderBar } from "../../../../Components/Auth/AuthShared";
import { sectors } from "../../../../Constant";
import ModalSelector from "react-native-modal-selector";

// const PickerView = styled.View`
//   border-radius: 4px;
//   /* padding: 15px 7px; */
//   border: 1px solid ${colors.borderThick};
//   margin-bottom: 25px;
// `;

export default function AskSector({ route: { params } }) {
  const navigation = useNavigation();
  const [selectedSector, setSelectedSector] = useState("");

  const goTototalEmployees = () => {
    navigation.navigate("AskTotalEmployees", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      sector: selectedSector,
    });
  };

  return (
    <AuthLayout>
      <ModalSelector
        data={sectors}
        keyExtractor={(item) => item.id}
        labelExtractor={(item) => item.value}
        accessible={true}
        onChange={(item) => {
          setSelectedSector(item.value);
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
          placeholder="Select your sector!"
          value={selectedSector}
        />
      </ModalSelector>
      <AuthButton
        text="다음"
        disabled={!selectedSector}
        loading={false}
        onPress={goTototalEmployees}
      />
    </AuthLayout>
  );
}
