import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import UserAvatar from "../UserAvatar";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation, useQuery } from "@apollo/client";
import timeForToday from "../../utils";
import { colors } from "../../colors";
import ReCommentPaint from "./ReCommentPaint";

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
  font-weight: bold;
`;

export default function UserPostComment({
  userPostId,
  id,
  user,
  payload,
  isMine,
  createdAt,
  reComments,
  reCommentScreen,
  refHandler,
}) {
  const deleteUserComment = (cache, result) => {
    const {
      data: {
        deleteUserPostComment: { ok },
      },
    } = result;
    if (ok) {
      const CommentId = `UserPostComment:${id}`;
      const UserPostId = `UserPost:${userPostId}`;
      cache.modify({
        id: CommentId,
        fields: {
          deleted(prev) {
            return !prev;
          },
        },
      });
      cache.modify({
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

  let myActionsheet = useRef();
  let notMeActionsheet = useRef();

  let myOptionArray = ["수정", "삭제", "취소"];
  let notMineOptionArray = ["신고", "취소"];

  const navigation = useNavigation();

  const showActionSheet = () => {
    if (isMine) {
      return myActionsheet.current.show();
    } else {
      return notMeActionsheet.current.show();
    }
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

  const goToReportForm = () => {
    navigation.navigate("UserPostCommentReportForm", {
      id,
    });
  };

  const myHandleIndex = (index) => {
    if (index === 0) {
      goToEditCommentForm();
    } else if (index === 1) {
      Alert.alert("댓글을 삭제하시겠어요?", "", [
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

  const notMineHandleIndex = (index) => {
    if (index === 0) {
      goToReportForm();
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
      <ScrollView showsVerticalScrollIndicator={true}>
        {reComments.map((item, index) => (
          <ReCommentPaint
            key={index}
            user={item.user}
            payload={item.payload}
            isMine={item.isMine}
            createdAt={item.createdAt}
          />
        ))}
      </ScrollView>
      <ActionSheet
        ref={myActionsheet}
        options={myOptionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => myHandleIndex(index)}
      />
      <ActionSheet
        ref={notMeActionsheet}
        options={notMineOptionArray}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index) => notMineHandleIndex(index)}
      />
    </Container>
  );
}
