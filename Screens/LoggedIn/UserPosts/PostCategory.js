import React from "react";
import ScreenLayout from "../../../Components/ScreenLayout";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../../../Colors";
import { categories_KR } from "../../../Constant";

const Container = styled.View``;

const CategoryContainer = styled.View``;

const CategoryView = styled.TouchableOpacity`
  padding: 25px 15px;
  color: black;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
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
        {categories_KR.map((item, index) => (
          <CategoryContainer key={index}>
            <CategoryView onPress={() => selectCategory(item.categoryName)}>
              <CategoryText>{item.categoryName}</CategoryText>
            </CategoryView>
            <Separator />
          </CategoryContainer>
        ))}
      </Container>
    </ScreenLayout>
  );
}
