import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import timeForToday from "../../../Utils";
import CompanyReCommentPaintPresenter from "./CompanyReCommentPaintPresenter";
import { DELETE_COMMENT_MUTATION } from "./CompanyReCommentPaintQueries";

export default function ({
  id,
  companyPostId,
  user,
  payload,
  isMine,
  createdAt,
}) {
  const deleteCompanyComment = (cache, result) => {
    const {
      data: {
        deleteCompanyPostReComment: { ok },
      },
    } = result;
    if (ok) {
      const ReCommentId = `CompanyPostReComment:${id}`;
      const CompanyPostId = `CompanyPost:${companyPostId}`;
      cache.evict({
        id: ReCommentId,
      });
      cache.modify({
        id: CompanyPostId,
        fields: {
          totalCompanyPostComments(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteCompanyReCommentMutation, { loading }] = useMutation(
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
    navigation.navigate("EditCompanyPostReCommentForm", {
      reCommentId: id,
      payload,
    });
  };

  const goToDeleteComment = () => {
    deleteCompanyReCommentMutation({
      variables: {
        reCommentId: parseInt(id),
      },
    });
  };

  const goToReportForm = () => {
    navigation.navigate("CompanyPostReCommentReportForm", {
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
      <CompanyReCommentPaintPresenter
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
