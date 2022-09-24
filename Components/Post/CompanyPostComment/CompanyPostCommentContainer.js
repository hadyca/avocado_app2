import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import CompanyPostCommentPresenter from "./CompanyPostCommentPresenter";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { DELETE_COMMENT_MUTATION } from "./CompanyPostCommentQueries";
import { timeForToday } from "../../../Utils";

export default function ({
  companyPostId,
  id,
  user,
  payload,
  isMine,
  createdAt,
  reComments,
  reCommentScreen,
}) {
  const deleteCompanyComment = (cache, result) => {
    const {
      data: {
        deleteCompanyPostComment: { ok, totalRecomments },
      },
    } = result;
    if (ok) {
      const CommentId = `CompanyPostComment:${id}`;
      const CompanyPostId = `CompanyPost:${companyPostId}`;
      cache.evict({
        id: CommentId,
      });

      cache.modify({
        id: CompanyPostId,
        fields: {
          totalCompanyPostComments(prev) {
            return prev - (1 + totalRecomments);
          },
        },
      });
    }
  };

  const [deleteCompanyCommentMutation, { loading }] = useMutation(
    DELETE_COMMENT_MUTATION,
    {
      update: deleteCompanyComment,
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
    navigation.navigate("EditCompanyPostCommentForm", {
      commentId: id,
      payload,
    });
  };

  const goToDeleteComment = () => {
    deleteCompanyCommentMutation({
      variables: {
        commentId: parseInt(id),
      },
    });
  };

  const goToReportForm = () => {
    navigation.navigate("CompanyPostCommentReportForm", {
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
    });
  };

  const goToReComment = () => {
    navigation.navigate("CompanyReComment", {
      companyPostId,
      id,
      user,
      payload,
      isMine,
      createdAt,
      reComments,
    });
  };

  const time = timeForToday(parseInt(createdAt));

  return (
    <>
      <CompanyPostCommentPresenter
        goToProfile={goToProfile}
        user={user}
        showActionSheet={showActionSheet}
        payload={payload}
        time={time}
        reCommentScreen={reCommentScreen}
        goToReComment={goToReComment}
        reComments={reComments}
        companyPostId={companyPostId}
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
