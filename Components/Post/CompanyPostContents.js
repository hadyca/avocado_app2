import React from "react";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";
import UserAvatar from "../UserAvatar";
import Separator from "../Separator";
import { Ionicons } from "@expo/vector-icons";
import ImageSlider from "./ImageSlider";
import { useNavigation } from "@react-navigation/native";
import BaseInfo from "./BaseInfo";

const Container = styled.View`
  margin: 10px;
`;

const Header = styled.TouchableOpacity``;

const Title = styled.Text`
  margin-top: 10px;
  font-size: 16px;
`;
const Content = styled.Text`
  margin-top: 10px;
  font-size: 16px;
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
  wageType,
  workingDay,
  dayOption,
  startTime,
  finishTime,
  timeOption,
  toggleLikeMutation,
  likeLoading,
  isLiked,
}) {
  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: userId,
      username,
    });
  };

  return (
    <View>
      {file?.length !== 0 ? <ImageSlider file={file} /> : null}
      <Container>
        <Header onPress={goToProfile}>
          <UserAvatar username={username} uri={avatarUrl} />
        </Header>
        <Separator />
        <Title>{title}</Title>
        <BaseInfo
          wageType={wageType}
          wage={wage}
          workingDay={workingDay}
          dayOption={dayOption}
          startTime={startTime}
          finishTime={finishTime}
          timeOption={timeOption}
        />
        <Content>{content}</Content>
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
