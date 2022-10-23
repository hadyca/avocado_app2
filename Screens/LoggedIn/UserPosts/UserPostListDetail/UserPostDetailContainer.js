import React, { useEffect, useState, useRef } from "react";
import { Platform, NativeModules, Alert, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import UserPostDetailPresenter from "./UserPostDetailPresenter";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  POST_DETAIL_QUERY,
  DELETE_USERPOST_MUTATION,
  TOGGLE_USERPOST_LIKE_MUTATION,
  TOGGLE_USERPOST_FAVORITE_MUTATION,
} from "./UserPostDetailQueries";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import UserPostComment from "../../../../Components/Post/UserPostComment";
import ScreenLayout from "../../../../Components/ScreenLayout";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const navigation = useNavigation();
  const { data: userData } = useMe();
  const { StatusBarManager } = NativeModules;

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleUserPostLike: { ok },
      },
    } = result;
    if (ok) {
      const UserPostId = `UserPost:${params.id}`;
      cache.modify({
        id: UserPostId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          totalUserPostLikes(prev) {
            if (data?.seeUserPost?.isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const updateToggleFavorite = (cache, result) => {
    const {
      data: { toggleFavoriteUserPost },
    } = result;
    if (toggleFavoriteUserPost.id) {
      const UserPostId = `UserPost:${params.id}`;
      cache.modify({
        id: UserPostId,
        fields: {
          isFavorite(prev) {
            return !prev;
          },
        },
      });
      if (data?.seeUserPost?.isFavorite) {
        cache.evict({
          id: "ROOT_QUERY",
          fieldName: "seeFavoriteUserPosts",
        });
        Alert.alert("관심목록에서 삭제 되었습니다.");
      } else {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeFavoriteUserPosts(prev) {
              return [toggleFavoriteUserPost, ...prev];
            },
          },
        });
        Alert.alert("관심목록에 추가 되었습니다.");
      }
    }
  };

  const updateDeleteUserPost = (cache, result) => {
    const {
      data: {
        deleteUserPost: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "seeAllUserPosts",
      });
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "seeUserCategoryPost",
      });
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "seeUserAllPosts",
      });
      const { me } = userData;
      const UserId = `User:${me.id}`;
      cache.modify({
        id: UserId,
        fields: {
          totalUserPosts(prev) {
            return prev - 1;
          },
        },
      });
      Alert.alert("게시글이 삭제 되었습니다.");
      navigation.pop();
    }
  };
  const { data, loading, refetch } = useQuery(POST_DETAIL_QUERY, {
    variables: {
      userPostId: parseInt(params.id),
    },
  });

  const [deleteUserPostMutation] = useMutation(DELETE_USERPOST_MUTATION, {
    update: updateDeleteUserPost,
  });

  const [toggleUserPostLikeMutation, { loading: likeLoading }] = useMutation(
    TOGGLE_USERPOST_LIKE_MUTATION,
    {
      variables: {
        userPostId: parseInt(params.id),
      },
      update: updateToggleLike,
    }
  );

  const [toggleUserPostFavoriteMutation, { error }] = useMutation(
    TOGGLE_USERPOST_FAVORITE_MUTATION,
    {
      update: updateToggleFavorite,
      onError: (error) => Alert.alert(error.message),
    }
  );

  const renderComment = ({ item }) => {
    return (
      <UserPostComment
        userPostId={parseInt(params.id)}
        id={item.id}
        user={item.user}
        payload={item.payload}
        isMine={item.isMine}
        createdAt={item.createdAt}
        reComments={item.userPostReComments}
      />
    );
  };

  const refresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const goToEditForm = () => {
    navigation.navigate("EditUserPostForm", {
      id: params.id,
      content: data?.seeUserPost?.content,
      category: data?.seeUserPost?.category,
      file: data?.seeUserPost?.file,
      screenName: params.fromWhere,
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
        userPostId: parseInt(params.id),
      },
    });
  };

  const goToToggleFavorite = () => {
    toggleUserPostFavoriteMutation({
      variables: {
        userPostId: parseInt(params.id),
      },
    });
  };

  //Action Sheet
  let myActionsheet = useRef();
  let myOptionArray = ["수정", "삭제", "취소"];

  let notMeActionsheet1 = useRef();
  let notMineOptionArray1 = ["관심목록에 추가", "신고", "취소"];

  let notMeActionsheet2 = useRef();
  let notMineOptionArray2 = ["관심목록에서 삭제", "신고", "취소"];

  const showActionSheet = () => {
    if (data?.seeUserPost?.isMine) {
      return myActionsheet.current.show();
    } else if (data?.seeUserPost?.isFavorite) {
      return notMeActionsheet2.current.show();
    } else {
      return notMeActionsheet1.current.show();
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

  const notMineHandleIndex1 = (index) => {
    if (index === 0) {
      Alert.alert("관심목록에 추가하시겠어요?", "", [
        { text: "Cancel" },
        {
          text: "Ok",
          onPress: () => goToToggleFavorite(),
        },
      ]);
    } else if (index === 1) {
      goToReportForm();
    } else {
      return;
    }
  };

  const notMineHandleIndex2 = (index) => {
    if (index === 0) {
      Alert.alert("관심목록에서 삭제 하시겠어요?", "", [
        { text: "Cancel" },
        {
          text: "Ok",
          onPress: () => goToToggleFavorite(),
        },
      ]);
    } else if (index === 1) {
      goToReportForm();
    } else {
      return;
    }
  };

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

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
      headerRight: !loading && HeaderRight,
    });
  }, [data]);

  useEffect(() => {
    if (params.refresh === "refresh") {
      refetch();
    }
  }, [params]);

  return (
    <ScreenLayout loading={loading}>
      <UserPostDetailPresenter
        data={data}
        likeLoading={likeLoading}
        toggleUserPostLikeMutation={toggleUserPostLikeMutation}
        renderComment={renderComment}
        refreshing={refreshing}
        refresh={refresh}
        statusBarHeight={statusBarHeight}
        userPostId={params.id}
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
        ref={notMeActionsheet1}
        options={notMineOptionArray1}
        cancelButtonIndex={2}
        destructiveButtonIndex={0}
        onPress={(index) => notMineHandleIndex1(index)}
      />
      <ActionSheet
        ref={notMeActionsheet2}
        options={notMineOptionArray2}
        cancelButtonIndex={2}
        destructiveButtonIndex={0}
        onPress={(index) => notMineHandleIndex2(index)}
      />
    </ScreenLayout>
  );
}
