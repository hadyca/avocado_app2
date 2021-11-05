import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import UserAvatar from "../UserAvatar";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../colors";

const COMMENTS_QUERY = gql`
  query seeUserPostComments($userPostId: Int!) {
    seeUserPostComments(userPostId: $userPostId) {
      id
      user {
        username
        avatar
      }
      payload
      createdAt
      updatedAt
      deleted
      isMine
    }
  }
`;

const Container = styled.View``;

const CommentContainer = styled.View`
  margin-bottom: 20px;
`;

const Comment = styled.View`
  margin-top: 2px;
  margin-left: 35px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CommentPayLoad = styled.Text`
  font-size: 14px;
`;

const IconView = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  padding: 10px;
`;

const NoCommentView = styled.View``;
const NoComment = styled.Text`
  margin: auto;
  font-size: 14px;
  color: ${colors.greyText};
`;

export default function SeeComments({ userPostId, comment }) {
  const { data, loading } = useQuery(COMMENTS_QUERY, {
    variables: {
      userPostId,
    },
  });

  const renderComment = ({ item }) => {
    if (item.deleted === false) {
      return (
        <>
          <UserAvatar username={item.user.username} uri={item.user.avatar} />
          <Comment>
            <CommentPayLoad>{item.payload}</CommentPayLoad>
            {item.isMine ? (
              <IconView onPress={showActionSheet}>
                <Ionicons name="ellipsis-vertical" color="grey" size={14} />
              </IconView>
            ) : null}
          </Comment>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Container>
      {comment ? (
        <CommentContainer>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.seeUserPostComments}
            keyExtractor={(item) => "" + item.id}
            renderItem={renderComment}
          />
        </CommentContainer>
      ) : (
        <NoCommentView>
          <NoComment>There is no comment. Please write a comment.</NoComment>
        </NoCommentView>
      )}
    </Container>
  );
}

// flatlist 데이터
