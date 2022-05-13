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
  font-size: 11px;
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

export default function CompanyPostContents({
  file,
  userId,
  username,
  avatarUrl,
  title,
  content,
  wage,
  toggleLikeMutation,
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
      {file.length !== 0 ? <ImageSlider file={file} /> : null}
      <Container>
        <Header onPress={goToProfile}>
          <UserAvatar username={username} uri={avatarUrl} />
        </Header>
        <Separator />
        <Contents>
          <Title>{title}</Title>
          <Content>{content}</Content>
          <Content>{wage}</Content>
        </Contents>
        <Actions>
          {likeLoading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Action onPress={toggleLikeMutation}>
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
