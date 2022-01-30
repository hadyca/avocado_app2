import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import UserPostComment from "../../../../Components/Post/UserPostComment";
import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import CommentForm from "../../../../Components/Post/CommentForm";

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
  const handleReComment = (text) => {
    setTimeout(() => reCommentRef.current?.scrollToEnd(), 1000);
  };
  return (
    <>
      <DismissKeyboard>
        <FlatList
          refreshing={refreshing}
          onRefresh={refresh}
          showsVerticalScrollIndicator={true}
          data={data?.seeUserPostComment}
          keyExtractor={(item) => "" + item.id}
          renderItem={renderComment}
          ref={reCommentRef}
        />
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
          userPostId={parseInt(userPostId)}
          userPostCommentId={parseInt(id)}
          reCommentScreen={reCommentScreen}
          handleReComment={handleReComment}
        />
      </KeyboardAvoidingView>
    </>
  );
}
