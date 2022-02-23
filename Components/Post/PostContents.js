import React from "react";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";
import UserAvatar from "../UserAvatar";
import Separator from "../Separator";
import { Ionicons } from "@expo/vector-icons";
import ImageSlider from "./ImageSlider";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Colors";

const Container = styled.View`
  margin: 10px;
`;

const CategoryView = styled.View`
  margin-bottom: 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: flex-start;
`;
const CategoryTouch = styled.TouchableOpacity``;

const CategoryText = styled.Text`
  font-size: 9px;
  padding: 5px 10px;
  background-color: ${colors.borderThin};
  font-weight: 600;
  text-align: center;
`;

const Header = styled.TouchableOpacity``;
const Contents = styled.View``;

const Title = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 900;
`;
const Content = styled.Text`
  margin-top: 10px;
  font-size: 14px;
`;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;

export default function PostContents({
  file,
  data,
  userId,
  username,
  avatar,
  title,
  content,
  category,
  toggleUserPostLikeMutation,
  likeLoading,
  isLiked,
}) {
  const navigation = useNavigation();

  const goToCategoryScreen = (category) => {
    navigation.navigate("CategoryBoard", {
      category,
    });
  };

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: userId,
      username,
    });
  };

  return (
    <View>
      {file !== 0 ? <ImageSlider data={data} /> : null}
      <Container>
        <CategoryView>
          <CategoryTouch onPress={() => goToCategoryScreen(category)}>
            <CategoryText>{category}</CategoryText>
          </CategoryTouch>
        </CategoryView>
        <Header onPress={goToProfile}>
          <UserAvatar username={username} uri={avatar} />
        </Header>
        <Separator />
        <Contents>
          <Title>{title}</Title>
          <Content>{content}</Content>
        </Contents>
        <Actions>
          {likeLoading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Action onPress={toggleUserPostLikeMutation}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                color={isLiked ? "tomato" : "black"}
                size={22}
              />
            </Action>
          )}
        </Actions>
        <Separator />
      </Container>
    </View>
  );
}
