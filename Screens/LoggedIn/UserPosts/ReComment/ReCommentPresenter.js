import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";

import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import CommentForm from "../../../../Components/Post/CommentForm";
import UserPostComment from "../../../../Components/Post/UserPostComment";
import { colors } from "../../../../colors";

export default function ReCommentPresenter({
  refreshing,
  refresh,
  data,
  userPostId,
  id,
  statusBarHeight,
  refetch,
  commentRefetching,
}) {
  const [commentUploading, setCommentUploading] = useState(false);

  let reCommentRef = useRef();
  const handleReComment = () => {
    setCommentUploading(true);
    refetch();
  };

  return (
    <>
      {commentRefetching && commentUploading ? (
        <View
          style={{
            backgroundColor: colors.backgraound,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color="black" />
        </View>
      ) : (
        <>
          <DismissKeyboard>
            <ScrollView
              shshowsVerticalScrollIndicator={true}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              }
              style={{ flex: 1 }}
              ref={reCommentRef}
              onContentSizeChange={() => {
                if (commentUploading) {
                  reCommentRef.current?.scrollToEnd();
                  setCommentUploading(false);
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
      )}
    </>
  );
}
