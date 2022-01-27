import React, { useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import UserAvatar from "../UserAvatar";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import timeForToday from "../../utils";
import { colors } from "../../colors";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteUserPostReComment($reCommentId: Int!) {
    deleteUserPostReComment(reCommentId: $reCommentId) {
      ok
      error
    }
  }
`;
const Container = styled.View`
  margin-left: 35px;
  margin-top: 20px;
`;
const HeaderContainer = styled.View`
  justify-content: center;
`;
const Header = styled.TouchableOpacity``;

const CommentView = styled.View`
  margin-top: 2px;
  margin-left: 35px;
`;

const CommentPayLoad = styled.Text`
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

export default function ReCommentPaint({
  id,
  user,
  payload,
  isMine,
  createdAt,
}) {
  const deleteUserComment = async (cache, result) => {
    const {
      data: {
        deleteUserPostReComment: { ok },
      },
    } = result;
    if (ok) {
      const ReCommentId = `UserPostReComment:${id}`;
      // const UserPostId = `UserPost:${userPostId}`;
      await cache.modify({
        id: ReCommentId,
        fields: {
          deleted(prev) {
            return !prev;
          },
        },
      });
      // await cache.modify({
      //   id: UserPostId,
      //   fields: {
      //     totalUserPostComments(prev) {
      //       return prev - 1;
      //     },
      //   },
      // });
    }
  };

  const [deleteUserReCommentMutation, { loading }] = useMutation(
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
    navigation.navigate("EditUserPostReCommentForm", {
      reCommentId: id,
      payload,
    });
  };

  const goToDeleteComment = () => {
    deleteUserReCommentMutation({
      variables: {
        reCommentId: parseInt(id),
      },
    });
  };

  const goToReportForm = () => {
    navigation.navigate("UserPostReCommentReportForm", {
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
      user,
      payload,
      isMine,
      createdAt,
    });
  };

  const date = new window.Date(parseInt(createdAt));

  const time = timeForToday(date);

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
        <CommentPayLoad>{payload}</CommentPayLoad>
      </CommentView>
      <SubContainer>
        <Date>{time}</Date>
      </SubContainer>
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
