import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
  View,
  ActivityIndicator,
  Keyboard,
  Text,
} from "react-native";

import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import CommentForm from "../../../../Components/Post/CommentForm";
import UserPostComment from "../../../../Components/Post/UserPostComment";

export default function ReCommentPresenter({
  refreshing,
  refresh,
  data,
  userPostId,
  id,
  statusBarHeight,
  error,
}) {
  const [commentUploading, setCommentUploading] = useState(false);

  let reCommentRef = useRef();
  const handleReComment = () => {
    setCommentUploading(true);
  };
  console.log(error);
  return (
    <>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <DismissKeyboard>
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={
              Platform.OS === "ios"
                ? statusBarHeight + 20
                : statusBarHeight + 60
            }
            style={{ flex: 1 }}
          >
            <ScrollView
              shshowsVerticalScrollIndicator={true}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              }
              style={{ flex: 1 }}
              ref={reCommentRef}
              onContentSizeChange={() => {
                if (
                  commentUploading &&
                  data?.seeUserPostComment?.userPostReComments.length > 6
                ) {
                  setCommentUploading(false);
                  reCommentRef.current?.scrollToEnd();
                }
              }}
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
            <CommentForm
              userPostId={userPostId}
              userPostCommentId={id}
              reCommentScreen={true}
              handleReComment={handleReComment}
              commentUploading={commentUploading}
            />
          </KeyboardAvoidingView>
        </DismissKeyboard>
      )}
    </>
  );
}
