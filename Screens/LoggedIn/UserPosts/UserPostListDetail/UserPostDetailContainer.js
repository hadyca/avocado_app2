import React, { useEffect, useState, useRef } from "react";
import { Platform, NativeModules, TouchableOpacity, Alert } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import UserPostDetailPresenter from "./UserPostDetailPresenter";
import { useNavigation } from "@react-navigation/native";
import {
  POST_DETAIL_QUERY,
  COMMENTS_QUERY,
  DELETE_USERPOST_MUTATION,
  TOGGLE_USERPOST_LIKE_MUTATION,
} from "./UserPostDetailQueries";
import { Ionicons } from "@expo/vector-icons";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import UserPostComment from "../../../../Components/Post/UserPostComment";
import ScreenLayout from "../../../../Components/ScreenLayout";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [updateComment, setUpdateComment] = useState(false);
  const navigation = useNavigation();

  const { StatusBarManager } = NativeModules;

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const { data, loading, fetchMore, refetch } = useQuery(POST_DETAIL_QUERY, {
    variables: {
      userPostId: parseInt(params?.id),
    },
  });

  const {
    data: commentData,
    loading: commentLoading,
    refetch: commentRefetch,
  } = useQuery(COMMENTS_QUERY, {
    variables: {
      userPostId: parseInt(params?.id),
    },
  });

  const [deleteUserPostMutation, { loading: deleteLoading }] = useMutation(
    DELETE_USERPOST_MUTATION,
    {
      update: goDeleteUserPost,
    }
  );

  const [toggleUserPostLikeMutation, { loading: likeLoading }] = useMutation(
    TOGGLE_USERPOST_LIKE_MUTATION,
    {
      variables: {
        userPostId: parseInt(params?.id),
      },
      update: updateToggleLike,
    }
  );

  const goDeleteUserPost = (cache, result) => {
    const {
      data: {
        deleteUserPost: { ok },
      },
    } = result;
    if (ok) {
      const UserPostId = `UserPost:${params?.id}`;
      cache.modify({
        id: UserPostId,
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

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleUserPostLike: { ok },
      },
    } = result;

    if (ok) {
      const UserPostId = `UserPost:${params?.id}`;
      cache.modify({
        id: UserPostId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          totalUserPostLikes(prev) {
            if (data.seeUserPost.isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const renderComment = ({ item, index }) => {
    if (item.deleted === false) {
      return (
        <UserPostComment
          userPostId={parseInt(params?.id)}
          id={item.id}
          user={item.user}
          payload={item.payload}
          isMine={item.isMine}
          createdAt={item.createdAt}
          reComments={item.userPostReComments}
        />
      );
    } else {
      return null;
    }
  };

  const validComment = (item) => item.deleted === true;

  const deletedComment = commentData?.seeUserPostComments.every(validComment);

  const headerLeftUserPostList = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("UserPostList")}
      stlye={{ marginLeft: 10 }}
    >
      <Ionicons name="chevron-back-outline" color="black" size={30} />
    </TouchableOpacity>
  );

  const headerLeftCategory = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CategoryBoard", {
          category: data?.seeUserPost?.category,
        })
      }
    >
      <Ionicons
        name="chevron-back-outline"
        color="black"
        size={30}
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  );

  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.pop()}>
      <Ionicons
        name="chevron-back-outline"
        color="black"
        size={30}
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  );

  const HeaderRight = () => (
    <TouchableOpacity onPress={showActionSheet}>
      <Ionicons
        name="ellipsis-vertical"
        color="grey"
        size={18}
        style={{ paddingLeft: 10, paddingRight: 10 }}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft:
        params?.fromWhere === "CategoryBoard"
          ? headerLeftCategory
          : params?.fromWhere === "UserPostList"
          ? headerLeftUserPostList
          : headerLeft,
      headerRight: HeaderRight,
    });
  }, [params, data]);

  const refresh = () => {
    setRefreshing(true);
    refetch();
    commentRefetch();
    setRefreshing(false);
  };

  const showActionSheet = () => {
    if (data?.seeUserPost?.isMine) {
      return myActionsheet.current.show();
    } else {
      return notMeActionsheet.current.show();
    }
  };

  const goToEditForm = () => {
    navigation.navigate("EditUserPostForm", {
      id: params.id,
      title: data?.seeUserPost?.title,
      content: data?.seeUserPost?.content,
      category: data?.seeUserPost?.category,
      file: data?.seeUserPost?.file,
    });
  };

  const goToReportForm = () => {
    navigation.navigate("UserPostReportForm", {
      id: params.id,
    });
  };

  const goToDeletePost = () => {
    deleteUserPostMutation({
      variables: {
        userPostId: parseInt(params?.id),
      },
    });
  };
  let myActionsheet = useRef();
  let notMeActionsheet = useRef();
  let myOptionArray = ["수정", "삭제", "취소"];
  let notMineOptionArray = ["신고", "취소"];
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
    <ScreenLayout loading={loading || commentLoading}>
      <UserPostDetailPresenter
        data={data}
        commentData={commentData}
        likeLoading={likeLoading}
        deletedComment={deletedComment}
        toggleUserPostLike={toggleUserPostLikeMutation}
        renderComment={renderComment}
        refreshing={refreshing}
        refresh={refresh}
        statusBarHeight={statusBarHeight}
        userPostId={params.id}
        commentRefetch={commentRefetch}
        myHandleIndex={myHandleIndex}
        notMineHandleIndex={notMineHandleIndex}
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
