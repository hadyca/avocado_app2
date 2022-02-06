import React from "react";
import ScreenLayout from "../Components/ScreenLayout";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../Colors";
import { categories } from "../Constant";

const Container = styled.View``;

const CategoryView = styled.TouchableOpacity`
  padding: 25px 15px;
  color: black;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
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
          <CategoryView key={index} onPress={() => selectCategory(item)}>
            <CategoryText>{item}</CategoryText>
          </CategoryView>
        ))}
      </Container>
    </ScreenLayout>
  );
}
