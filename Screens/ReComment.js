import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  NativeModules,
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import CommentForm from "../Components/Post/CommentForm";
import UserPostComment from "../Components/Post/UserPostComment";
import ScreenLayout from "../Components/ScreenLayout";
import styled from "styled-components/native";
import DismissKeyboard from "../Components/DismissKeyBoard";
import { gql, useMutation, useQuery } from "@apollo/client";
import { colors } from "../colors";

const COMMENT_QUERY = gql`
  query seeUserPostComment($userPostCommentId: Int!) {
    seeUserPostComment(userPostCommentId: $userPostCommentId) {
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
const Container = styled.View`
  flex: 1;
`;

export default function ReComment({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { StatusBarManager } = NativeModules;

  const { data, refetch, loading } = useQuery(COMMENT_QUERY, {
    variables: {
      userPostCommentId: parseInt(params?.id),
    },
  });

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const refresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  let reCommentRef = useRef();

  const handleReComment = (text) => {
    setTimeout(() => reCommentRef.current?.scrollToEnd(), 1000);
  };

  return (
    <ScreenLayout loading={loading}>
      <DismissKeyboard>
        <ScrollView
          shshowsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          style={{ flex: 1 }}
          ref={reCommentRef}
        >
          <UserPostComment
            userPostId={data?.seeUserPostComment?.userPostId}
            id={data?.seeUserPostComment?.id}
            user={data?.seeUserPostComment?.user}
            payload={data?.seeUserPostComment?.payload}
            isMine={data?.seeUserPostComment?.isMine}
            createdAt={data?.seeUserPostComment?.createdAt}
            reComments={data?.seeUserPostComment?.userPostReComments}
            reCommentScreen={true}
          />
        </ScrollView>
      </DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={statusBarHeight + 20}
        // keyboardVerticalOffset={300}
      >
        <CommentForm
          userPostId={parseInt(params?.userPostId)}
          userPostCommentId={parseInt(params?.id)}
          reCommentScreen={true}
          handleReComment={handleReComment}
        />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
