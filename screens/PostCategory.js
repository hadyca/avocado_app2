import React from "react";
import { Text } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../colors";

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
const categories = [
  "일/직업",
  "질문",
  "피부 미용",
  "출산/육아",
  "동네 정보",
  "연애/결혼",
  "요리/음식",
  "일상",
  "일반/기타",
];

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
