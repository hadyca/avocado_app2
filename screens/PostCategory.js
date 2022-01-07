import React from "react";
import { Text } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { categories } from "../constant";

const Container = styled.View``;

const CategoryView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;
const CategoryView2 = styled.TouchableOpacity`
  padding: 25px 7px;
  color: black;
`;

const CategoryText = styled.Text``;

export default function PostCategory() {
  const navigation = useNavigation();
  const selectCategory = (item) => {
    navigation.navigate("UserPostUploadForm", {
      category: item,
    });
  };
  return (
    <ScreenLayout>
      <Container>
        {categories.map((item, index) => (
          <CategoryView key={index}>
            <CategoryView2 onPress={() => selectCategory(item)}>
              <CategoryText>{item}</CategoryText>
            </CategoryView2>
          </CategoryView>
        ))}
      </Container>
    </ScreenLayout>
  );
}
