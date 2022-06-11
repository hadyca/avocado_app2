import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import CreatCompanyLayout from "../../../../Components/CreatCompanyLayout";
import AuthButton from "../../../../Components/Auth/AuthButton";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import { sectors } from "../../../../Constant";
import ModalSelector from "react-native-modal-selector";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

const TextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

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
    <CreatCompanyLayout>
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
        <TextView>
          <TextInput_Company
            placeholder={"Select your sector!"}
            value={selectedSector}
          />
          <Ionicons
            name="chevron-forward"
            color="black"
            size={17}
            style={{ paddingTop: 15 }}
          />
        </TextView>
      </ModalSelector>
      <UnderBar lastOne={true} />

      <AuthButton
        text="다음"
        disabled={!selectedSector}
        loading={false}
        onPress={goTototalEmployees}
      />
    </CreatCompanyLayout>
  );
}
