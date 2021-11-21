import React, { useEffect, useRef, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  View,
} from "react-native";
import styled from "styled-components/native";
import UserAvatar from "../UserAvatar";
import Separator from "../Separator";
import { Ionicons } from "@expo/vector-icons";
import ImageSlider from "./ImageSlider";

const PostContainer = styled.View`
  flex: 7;
`;
const Container = styled.View`
  margin: 10px;
`;
const Header = styled.View``;
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
  username,
  avatar,
  title,
  content,
  toggleUserPostLike,
  likeLoading,
  isLiked,
}) {
  return (
    <View>
      {file !== 0 ? <ImageSlider data={data} /> : null}
      <Container>
        <Header>
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
            <Action onPress={toggleUserPostLike}>
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
