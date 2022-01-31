import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import styled from "styled-components/native";

import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import CommentForm from "../../../../Components/Post/CommentForm";
import UserPostComment from "../../../../Components/Post/UserPostComment";

export default function ReCommentPresenter({
  refreshing,
  refresh,
  data,
  userPostId,
  id,
  renderComment,
  reCommentScreen,
  statusBarHeight,
}) {
  let reCommentRef = useRef();
  const handleReComment = () => {
    setTimeout(() => reCommentRef.current?.scrollToEnd(), 1000);
  };

  return (
    <>
      <DismissKeyboard>
        {/* <FlatList
          ListHeaderComponent={
            <UserPostComment
              userPostId={userPostId}
              id={data?.seeUserPostComment?.id}
              user={data?.seeUserPostComment?.user}
              payload={data?.seeUserPostComment?.payload}
              isMine={data?.seeUserPostComment?.isMine}
              createdAt={data?.seeUserPostComment?.createdAt}
              reComments={data?.seeUserPostComment?.userPostReComments}
              reCommentScreen={true}
            />
          }
          shshowsVerticalScrollIndicator={true}
          ref={reCommentRef}
          refreshing={refreshing}
          onRefresh={refresh}
        /> */}

        <ScrollView
          shshowsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          style={{ flex: 1 }}
          ref={reCommentRef}
        >
          <UserPostComment
            userPostId={userPostId}
            id={data?.seeUserPostComment?.id}
            user={data?.seeUserPostComment?.user}
            payload={data?.seeUserPostComment?.payload}
            isMine={data?.seeUserPostComment?.isMine}
            createdAt={data?.seeUserPostComment?.createdAt}
            reComments={data?.seeUserPostComment?.userPostReComments}
            reCommentScreen={true}
          />
        </ScrollView>
        {/* <FlatList
          ListHeaderComponent={
            <UserPostComment
              userPostId={userPostId}
              id={id}
              user={user}
              payload={payload}
              isMine={isMine}
              createdAt={createdAt}
              reComments={reComments}
              reCommentScreen={reCommentScreen}
            />
          }
          shshowsVerticalScrollIndicator={true}
          ref={reCommentRef}
          refreshing={refreshing}
          onRefresh={refresh}
        /> */}
        {/* <ScrollView
          shshowsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          style={{ flex: 1 }}
          ref={reCommentRef}
        >
          <UserPostComment
            userPostId={userPostId}
            id={id}
            user={user}
            payload={payload}
            isMine={isMine}
            createdAt={createdAt}
            reComments={reComments}
            reCommentScreen={reCommentScreen}
          />
        </ScrollView> */}
      </DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={statusBarHeight + 20}
        // keyboardVerticalOffset={300}
      >
        <CommentForm
          userPostId={userPostId}
          userPostCommentId={id}
          reCommentScreen={true}
          handleReComment={handleReComment}
        />
      </KeyboardAvoidingView>
    </>
  );
}
