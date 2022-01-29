import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";

import { colors } from "../../../colors";
import UserAvatar from "../../UserAvatar";

const Container = styled.View`
  margin: 10px;
`;
const HeaderContainer = styled.View`
  justify-content: center;
`;
const Header = styled.TouchableOpacity``;

const CommentView = styled.View`
  margin-top: 2px;
  margin-left: 35px;
`;

const CommentPayload = styled.Text`
  font-size: 14px;
  padding-right: 30px;
`;

const IconView = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  padding: 10px;
`;

const SubContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const Date = styled.Text`
  margin-top: 3px;
  margin-left: 35px;
  color: ${colors.homeText};
  font-size: 12px;
`;

const ReplyButton = styled.TouchableOpacity`
  margin-top: 3px;
  margin-left: 5px;
`;

const ReplyText = styled.Text`
  color: ${colors.homeText};
  font-size: 12px;
  font-weight: bold;
`;

export default function UserPostCommentPresenter({
  goToProfile,
  user,
  showActionSheet,
  payload,
  time,
  reCommentScreen,
  goToReComment,
  reComments,
  renderReComment,
}) {
  return (
    <Container>
      <HeaderContainer>
        <Header onPress={goToProfile}>
          <UserAvatar username={user.username} uri={user.avatar} />
        </Header>
        <IconView onPress={showActionSheet}>
          <Ionicons name="ellipsis-vertical" color="grey" size={14} />
        </IconView>
      </HeaderContainer>
      <CommentView>
        <CommentPayload>{payload}</CommentPayload>
      </CommentView>
      <SubContainer>
        <Date>{time}</Date>
        {!reCommentScreen ? (
          <ReplyButton onPress={goToReComment}>
            <ReplyText>답글 쓰기</ReplyText>
          </ReplyButton>
        ) : null}
      </SubContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={reComments}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderReComment}
      />
    </Container>
  );
}
