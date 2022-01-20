import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import UserAvatar from "../UserAvatar";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { Alert, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation, useQuery } from "@apollo/client";
import timeForToday from "../../utils";
import { colors } from "../../colors";
import ReCommentPaint from "./ReCommentPaint";

const RECOMMENTS_QUERY = gql`
  query seeUserPostReComments($userPostCommentId: Int!) {
    seeUserPostReComments(userPostCommentId: $userPostCommentId) {
      id
      user {
        id
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
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteUserPostComment($commentId: Int!) {
    deleteUserPostComment(commentId: $commentId) {
      ok
      error
    }
  }
`;
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
  font-weight: 600;
`;

export default function CommentHeader({
  userPostId,
  id,
  user,
  payload,
  isMine,
  createdAt,
  commentUpdate,
  screenName,
}) {
  const { data, refetch } = useQuery(RECOMMENTS_QUERY, {
    variables: {
      userPostCommentId: parseInt(id),
    },
  });

  const deleteUserComment = async (cache, result) => {
    const {
      data: {
        deleteUserPostComment: { ok },
      },
    } = result;
    if (ok) {
      const CommentId = `UserPostComment:${id}`;
      const UserPostId = `UserPost:${userPostId}`;
      await cache.modify({
        id: CommentId,
        fields: {
          deleted(prev) {
            return !prev;
          },
        },
      });
      await cache.modify({
        id: UserPostId,
        fields: {
          totalUserPostComments(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteUserCommentMutation, { loading }] = useMutation(
    DELETE_COMMENT_MUTATION,
    {
      update: deleteUserComment,
    }
  );

  let actionsheet = useRef();
  let optionArray = ["Edit", "Delete", "Cancel"];
  const navigation = useNavigation();

  const showActionSheet = () => {
    actionsheet.current.show();
  };

  const goToEditCommentForm = () => {
    navigation.navigate("EditUserPostCommentForm", {
      commentId: id,
      payload,
    });
  };

  const goToDeleteComment = () => {
    deleteUserCommentMutation({
      variables: {
        commentId: parseInt(id),
      },
    });
  };

  const handleIndex = (index) => {
    if (index === 0) {
      Alert.alert("Edit", "Do you want edit comment?", [
        { text: "Cancel" },
        { text: "Ok", onPress: () => goToEditCommentForm() },
      ]);
    } else if (index === 1) {
      Alert.alert("Delete", "Do you want delete comment?", [
        { text: "Cancel" },
        {
          text: "Ok",
          onPress: () => goToDeleteComment(),
        },
      ]);
    } else {
      return;
    }
  };

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
      username: user.username,
    });
  };

  const goToReComment = () => {
    navigation.navigate("ReComment", {
      userPostId,
      id,
      user,
      payload,
      isMine,
      createdAt,
    });
  };
  const date = new window.Date(parseInt(createdAt));

  const time = timeForToday(date);

  const renderReComment = ({ item }) => {
    if (item.deleted === false) {
      return (
        <ReCommentPaint
          user={item.user}
          payload={item.payload}
          isMine={item.isMine}
          createdAt={item.createdAt}
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    refetch();
  }, [commentUpdate]);

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
        {screenName === "ReComment" ? null : (
          <ReplyButton onPress={goToReComment}>
            <ReplyText>답글 쓰기</ReplyText>
          </ReplyButton>
        )}
      </SubContainer>
      <FlatList
        showsVerticalScrollIndicator={true}
        data={data?.seeUserPostReComments}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderReComment}
      />
      <ActionSheet
        ref={actionsheet}
        options={optionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => handleIndex(index)}
      />
    </Container>
  );
}
