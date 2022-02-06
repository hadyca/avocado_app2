import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import timeForToday from "../../../Utils";
import ReCommentPaintPresenter from "./ReCommentPaintPresenter";
import { DELETE_COMMENT_MUTATION } from "./ReCommentPaintQueries";

export default function ({ id, userPostId, user, payload, isMine, createdAt }) {
  const deleteUserComment = (cache, result) => {
    const {
      data: {
        deleteUserPostReComment: { ok },
      },
    } = result;
    if (ok) {
      const ReCommentId = `UserPostReComment:${id}`;
      const UserPostId = `UserPost:${userPostId}`;
      cache.evict({
        id: ReCommentId,
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
    <>
      <ReCommentPaintPresenter
        goToProfile={goToProfile}
        user={user}
        showActionSheet={showActionSheet}
        payload={payload}
        time={time}
      />
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
    </>
  );
}
