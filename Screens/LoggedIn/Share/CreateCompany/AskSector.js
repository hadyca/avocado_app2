import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import AuthButton from "../../../../Components/Auth/AuthButton";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import { sectors } from "../../../../Constant";
import ModalSelector from "react-native-modal-selector";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

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
      <ProgressCreateCompany
        title={"어떤 업종인지 선택해 주세요!"}
        step={"3"}
      />
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
        <TextInput_Company
          placeholder={"Select your sector!"}
          value={selectedSector}
        />
      </ModalSelector>
      <UnderBar lastOne={true} />

      <AuthButton
        text="다음"
        disabled={!selectedSector}
        loading={false}
        onPress={goTototalEmployees}
      />
    </AuthLayout>
  );
}
