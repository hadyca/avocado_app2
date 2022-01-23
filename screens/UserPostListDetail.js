import React, { useEffect, useState, useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  NativeModules,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { colors } from "../colors";
import CommentForm from "../components/post/CommentForm";
import PostContents from "../components/post/PostContents";
import UserPostComment from "../components/post/UserPostComment";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ActionSheet from "@alessiocancian/react-native-actionsheet";

const POST_DETAIL_QUERY = gql`
  query seeUserPost($userPostId: Int!) {
    seeUserPost(userPostId: $userPostId) {
      id
      user {
        id
        username
        avatar
      }
      title
      content
      category
      file {
        fileUrl
      }
      userPostComments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
        deleted
      }
      isMine
      isLiked
      totalUserPostLikes
    }
  }
`;

const COMMENTS_QUERY = gql`
  query seeUserPostComments($userPostId: Int!) {
    seeUserPostComments(userPostId: $userPostId) {
      id
      user {
        id
        username
        avatar
      }
      payload
      userPostReComments {
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
      createdAt
      updatedAt
      deleted
      isMine
    }
  }
`;

const DELETE_USERPOST_MUTATION = gql`
  mutation deleteUserPost($userPostId: Int!) {
    deleteUserPost(userPostId: $userPostId) {
      ok
      error
    }
  }
`;

const TOGGLE_USERPOST_LIKE_MUTATION = gql`
  mutation toggleUserPostLike($userPostId: Int!) {
    toggleUserPostLike(userPostId: $userPostId) {
      ok
      error
    }
  }
`;

const IconView = styled.TouchableOpacity``;

const PostContainer = styled.View`
  flex: 1;
`;
const NoCommentContainer = styled.ScrollView``;
const NoCommentView = styled.View``;
const NoComment = styled.Text`
  margin: auto;
  font-size: 14px;
  color: ${colors.greyText};
`;

export default function UserPostListDetail({ route: { params } }) {
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

  const [deleteUserPostMutation, { loading: deleteLoading }] = useMutation(
    DELETE_USERPOST_MUTATION,
    {
      update: goDeleteUserPost,
    }
  );

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
  const [toggleUserPostLike, { loading: likeLoading }] = useMutation(
    TOGGLE_USERPOST_LIKE_MUTATION,
    {
      variables: {
        userPostId: parseInt(params?.id),
      },
      update: updateToggleLike,
    }
  );

  const renderComment = ({ item }) => {
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
    <IconView
      onPress={() => navigation.navigate("UserPostList")}
      stlye={{ marginLeft: 10 }}
    >
      <Ionicons name="chevron-back-outline" color="black" size={30} />
    </IconView>
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

  let myActionsheet = useRef();
  let notMeActionsheet = useRef();
  let myOptionArray = ["수정", "삭제", "취소"];
  let notMineOptionArray = ["신고", "취소"];

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

  let detailRef = useRef();

  const handleRef = () => {
    if (updateComment) {
      detailRef.current?.scrollToEnd({ animated: true });
      setUpdateComment(false);
    } else {
      return null;
    }
  };

  const handleComment = () => {
    setUpdateComment(true);
  };

  console.log(updateComment);

  return (
    <ScreenLayout loading={loading || commentLoading}>
      {commentData?.seeUserPostComments.length > 0 && !deletedComment ? (
        <PostContainer>
          <FlatList
            ListHeaderComponent={
              <PostContents
                file={data?.seeUserPost?.file.length}
                data={data}
                userId={data?.userId}
                username={data?.seeUserPost?.user?.username}
                avatar={data?.seeUserPost?.user?.avatar}
                title={data?.seeUserPost?.title}
                content={data?.seeUserPost?.content}
                category={data?.seeUserPost?.category}
                likeLoading={likeLoading}
                toggleUserPostLike={toggleUserPostLike}
                isLiked={data?.seeUserPost?.isLiked}
              />
            }
            refreshing={refreshing}
            onRefresh={refresh}
            showsVerticalScrollIndicator={true}
            data={commentData?.seeUserPostComments}
            keyExtractor={(item) => "" + item.id}
            renderItem={renderComment}
            ref={detailRef}
            onContentSizeChange={handleRef}
          />
        </PostContainer>
      ) : (
        <PostContainer>
          <FlatList
            ListHeaderComponent={
              <PostContents
                file={data?.seeUserPost?.file.length}
                data={data}
                userId={data?.userId}
                username={data?.seeUserPost?.user?.username}
                avatar={data?.seeUserPost?.user?.avatar}
                title={data?.seeUserPost?.title}
                content={data?.seeUserPost?.content}
                category={data?.seeUserPost?.category}
                likeLoading={likeLoading}
                toggleUserPostLike={toggleUserPostLike}
                isLiked={data?.seeUserPost?.isLiked}
              />
            }
            ListFooterComponent={
              <NoCommentView>
                <NoComment>
                  There is no comment. Please write a comment.
                </NoComment>
              </NoCommentView>
            }
            refreshing={refreshing}
            onRefresh={refresh}
            showsVerticalScrollIndicator={true}
            data={commentData?.seeUserPostComments}
            keyExtractor={(item) => "" + item.id}
            renderItem={renderComment}
          />
        </PostContainer>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={statusBarHeight + 20}
        // keyboardVerticalOffset={300}
      >
        <CommentForm
          userPostId={parseInt(params?.id)}
          handleComment={handleComment}
        />
      </KeyboardAvoidingView>
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
