import React, { useRef } from "react";
import { Platform, FlatList, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../colors";
import CommentForm from "../../../../Components/Post/CommentForm";
import PostContents from "../../../../Components/Post/PostContents";

const PostContainer = styled.View`
  flex: 1;
`;
const NoCommentView = styled.View``;
const NoComment = styled.Text`
  margin: auto;
  font-size: 14px;
  color: ${colors.greyText};
`;

export default function UserPostDetailPresenter({
  data,
  likeLoading,
  deletedComment,
  toggleUserPostLikeMutation,
  renderComment,
  refreshing,
  refresh,
  statusBarHeight,
  userPostId,
  refetch,
}) {
  let detailRef = useRef();
  const handleComment = async () => {
    await refetch();
    setTimeout(() => detailRef.current?.scrollToEnd(), 1000);
  };

  return (
    <>
      {data?.seeUserPost?.userPostComments.length > 0 && !deletedComment ? (
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
                toggleUserPostLikeMutation={toggleUserPostLikeMutation}
                isLiked={data?.seeUserPost?.isLiked}
              />
            }
            refreshing={refreshing}
            onRefresh={refresh}
            showsVerticalScrollIndicator={true}
            data={data?.seeUserPost?.userPostComments}
            keyExtractor={(item) => "" + item.id}
            renderItem={renderComment}
            ref={detailRef}
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
                toggleUserPostLikeMutation={toggleUserPostLikeMutation}
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
            // data={data?.seeUserPost?.userPostComments}
            // keyExtractor={(item) => "" + item.id}
            // renderItem={renderComment}
          />
        </PostContainer>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={statusBarHeight + 20}
        // keyboardVerticalOffset={300}
      >
        <CommentForm userPostId={userPostId} handleComment={handleComment} />
      </KeyboardAvoidingView>
    </>
  );
}
