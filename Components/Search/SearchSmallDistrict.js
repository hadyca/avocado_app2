import React from "react";
import { View, Text } from "react-native";
import { smallDistrict } from "../../DistrictList";
import styled from "styled-components/native";
import { colors } from "../../Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Button = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
  margin-left: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  text-align: center;
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;

export default function SearchSmallDistrict({ districtCode, handleAddress }) {
  const navigation = useNavigation();
  const goToCompanyPostList = (addressStep2) => {
    handleAddress(addressStep2);
  };
  return (
    <View>
      <Button>
        <ButtonText>전체</ButtonText>
      </Button>
      {smallDistrict[districtCode].map((item, index) => (
        <Button key={index} onPress={() => goToCompanyPostList(item.value)}>
          <ButtonText key={index}>{item.value}</ButtonText>
        </Button>
      ))}
    </View>
  );
}
