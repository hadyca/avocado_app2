import React, { useEffect, useState, useRef } from "react";
import { Platform, NativeModules, Alert } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import CompanyPostDetailPresenter from "./CompanyPostDetailPresenter";
import { useNavigation } from "@react-navigation/native";
import {
  POST_DETAIL_QUERY,
  DELETE_COMPANYPOST_MUTATION,
  TOGGLE_COMPANYPOST_LIKE_MUTATION,
} from "./CompanyPostDetailQueries";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import CompanyPostComment from "../../../../Components/Post/CompanyPostComment";
import ScreenLayout from "../../../../Components/ScreenLayout";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const navigation = useNavigation();

  const { StatusBarManager } = NativeModules;

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleCompanyPostLike: { ok },
      },
    } = result;
    if (ok) {
      const CompanyPostId = `CompanyPost:${params.id}`;
      cache.modify({
        id: CompanyPostId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          totalCompanyPostLikes(prev) {
            if (data?.seeCompanyPost?.isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const goDeleteCompanyPost = (cache, result) => {
    const {
      data: {
        deleteCompanyPost: { ok },
      },
    } = result;
    if (ok) {
      const CompanyPostId = `CompanyPost:${params.id}`;
      cache.modify({
        id: CompanyPostId,
        fields: {
          deleted(prev) {
            return !prev;
          },
        },
      });
    }
    Alert.alert("게시글이 삭제 되었습니다.");
    navigation.pop();
  };
  const { data, loading, refetch, error } = useQuery(POST_DETAIL_QUERY, {
    variables: {
      companyPostId: parseInt(params.id),
    },
  });

  const [deleteCompanyPostMutation] = useMutation(DELETE_COMPANYPOST_MUTATION, {
    update: goDeleteCompanyPost,
  });

  const [toggleCompanyPostLikeMutation, { loading: likeLoading }] = useMutation(
    TOGGLE_COMPANYPOST_LIKE_MUTATION,
    {
      variables: {
        companyPostId: parseInt(params.id),
      },
      update: updateToggleLike,
    }
  );

  const renderComment = ({ item }) => {
    return (
      <CompanyPostComment
        companyPostId={parseInt(params.id)}
        id={item.id}
        user={item.user}
        payload={item.payload}
        isMine={item.isMine}
        createdAt={item.createdAt}
        reComments={item.companyPostReComments}
      />
    );
  };

  const refresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const goToEditForm = () => {
    navigation.navigate("EditCompanyPostForm", {
      id: params.id,
      title: data?.seeCompanyPost?.title,
      content: data?.seeCompanyPost?.content,
      file: data?.seeCompanyPost?.file,
      screenName: params.fromWhere,
    });
  };

  const goToReportForm = () => {
    navigation.navigate("UserPostReportForm", {
      id: params.id,
    });
  };

  const goToDeletePost = () => {
    deleteCompanyPostMutation({
      variables: {
        companyPostId: parseInt(params.id),
      },
    });
  };

  //Action Sheet
  let myActionsheet = useRef();
  let notMeActionsheet = useRef();
  let myOptionArray = ["수정", "삭제", "취소"];
  let notMineOptionArray = ["신고", "취소"];

  const showActionSheet = () => {
    if (data?.seeCompanyPost?.isMine) {
      return myActionsheet.current.show();
    } else {
      return notMeActionsheet.current.show();
    }
  };

  const myHandleIndex = (index) => {
    if (index === 0) {
      goToEditForm();
    } else if (index === 1) {
      Alert.alert("게시글을 삭제하시겠어요?", "", [
        { text: "Cancel" },
        {
          text: "Ok",
          onPress: () => goToDeletePost(),
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

  return (
    <ScreenLayout loading={loading}>
      <CompanyPostDetailPresenter
        data={data}
        likeLoading={likeLoading}
        toggleCompanyPostLikeMutation={toggleCompanyPostLikeMutation}
        renderComment={renderComment}
        refreshing={refreshing}
        refresh={refresh}
        statusBarHeight={statusBarHeight}
        companyPostId={params.id}
        showActionSheet={showActionSheet}
        fromWhere={params.fromWhere}
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
    </ScreenLayout>
  );
}
