import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  NativeModules,
} from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { colors } from "../colors";
import CommentForm from "../components/post/CommentForm";
import PostContents from "../components/post/PostContents";
import UserPostComment from "../components/post/UserPostComment";
import DismissKeyboard from "../components/DismissKeyBoard";

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
      createdAt
      updatedAt
      deleted
      isMine
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

const PostContainer = styled.View`
  flex: 1;
`;

const NoCommentView = styled.View``;
const NoComment = styled.Text`
  margin: auto;
  font-size: 14px;
  color: ${colors.greyText};
`;

export default function UserPostListDetail({ route: { params } }) {
  const { StatusBarManager } = NativeModules;
  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const { data, loading, fetchMore } = useQuery(POST_DETAIL_QUERY, {
    variables: {
      userPostId: parseInt(params.id),
    },
  });

  const {
    data: commentData,
    loading: commentLoading,
    refetch,
  } = useQuery(COMMENTS_QUERY, {
    variables: {
      userPostId: parseInt(params.id),
    },
  });

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
        userPostId: parseInt(params.id),
      },
      update: updateToggleLike,
    }
  );

  const renderComment = ({ item }) => {
    if (item.deleted === false) {
      return (
        <UserPostComment
          userPostId={parseInt(params.id)}
          id={item.id}
          user={item.user}
          payload={item.payload}
          isMine={item.isMine}
        />
      );
    } else {
      return null;
    }
  };
  const validComment = (item) => item.deleted === true;

  const deletedComment = commentData?.seeUserPostComments.every(validComment);

  return (
    <ScreenLayout loading={loading}>
      {commentData?.seeUserPostComments[0] && !deletedComment ? (
        <PostContainer>
          <FlatList
            ListHeaderComponent={
              <PostContents
                file={data?.seeUserPost?.file.length}
                data={data}
                userId={data?.userId}
                username={params.username}
                avatar={params.avatar}
                title={data?.seeUserPost?.title}
                content={data?.seeUserPost?.content}
                likeLoading={likeLoading}
                toggleUserPostLike={toggleUserPostLike}
                isLiked={data?.seeUserPost?.isLiked}
              />
            }
            showsVerticalScrollIndicator={true}
            data={commentData?.seeUserPostComments}
            keyExtractor={(item) => "" + item.id}
            renderItem={renderComment}
          />
        </PostContainer>
      ) : (
        <DismissKeyboard>
          <PostContainer>
            <PostContents
              file={data?.seeUserPost?.file.length}
              data={data}
              username={params.username}
              avatar={params.avatar}
              title={data?.seeUserPost?.title}
              content={data?.seeUserPost?.content}
              likeLoading={likeLoading}
              toggleUserPostLike={toggleUserPostLike}
              isLiked={data?.seeUserPost?.isLiked}
            />
            <NoCommentView>
              <NoComment>
                There is no comment. Please write a comment.
              </NoComment>
            </NoCommentView>
          </PostContainer>
        </DismissKeyboard>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={statusBarHeight + 20}
        // keyboardVerticalOffset={300}
      >
        <CommentForm
          userPostId={parseInt(params.id)}
          refetch={refetch}
          commentLoading={commentLoading}
        />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
