import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import UserAvatar from "../UserAvatar";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

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
const Header = styled.TouchableOpacity``;

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

export default function UserPostComment({
  userPostId,
  id,
  user,
  payload,
  isMine,
}) {
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

  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar username={user.username} uri={user.avatar} />
      </Header>
      <Comment>
        <CommentPayLoad>{payload}</CommentPayLoad>
        {isMine ? (
          <IconView onPress={showActionSheet}>
            <Ionicons name="ellipsis-vertical" color="grey" size={14} />
          </IconView>
        ) : null}
      </Comment>
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
