import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../Colors";
import CompanyCommentForm from "../../../../Components/Post/CompanyCommentForm";
import CompanyPostContents from "../../../../Components/Post/CompanyPostContents";

const PostContainer = styled.View`
  flex: 1;
`;
const NoCommentView = styled.View`
  margin-top: 10px;
`;
const NoComment = styled.Text`
  margin: auto;
  font-size: 14px;
  color: ${colors.greyText};
`;

export default function CompanyPostDetailPresenter({
  data,
  likeLoading,
  toggleCompanyPostLikeMutation,
  renderComment,
  refreshing,
  refresh,
  statusBarHeight,
  companyPostId,
}) {
  const [commentUploading, setCommentUploading] = useState(false);

  let detailRef = useRef();

  const handleComment = () => {
    setCommentUploading(true);
  };

  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? statusBarHeight + 20 : statusBarHeight + 60
        }
        style={{ flex: 1 }}
      >
        {data?.seeCompanyPost?.companyPostComments.length > 0 ? (
          <PostContainer>
            <FlatList
              ListHeaderComponent={
                <CompanyPostContents
                  file={data?.seeCompanyPost?.file}
                  data={data}
                  userId={data?.seeCompanyPost?.company?.user?.id}
                  username={data?.seeCompanyPost?.company?.user?.username}
                  avatarUrl={data?.seeCompanyPost?.company?.user?.avatarUrl}
                  title={data?.seeCompanyPost?.title}
                  content={data?.seeCompanyPost?.content}
                  likeLoading={likeLoading}
                  toggleLikeMutation={toggleCompanyPostLikeMutation}
                  isLiked={data?.seeCompanyPost?.isLiked}
                />
              }
              refreshing={refreshing}
              onRefresh={refresh}
              showsVerticalScrollIndicator={true}
              data={data?.seeCompanyPost?.companyPostComments}
              keyExtractor={(item) => "" + item.id}
              renderItem={renderComment}
              ref={detailRef}
              initialNumToRender={30}
              onContentSizeChange={() => {
                if (
                  commentUploading &&
                  data?.seeCompanyPost?.totalCompanyPostComments > 5
                ) {
                  setCommentUploading(false);
                  detailRef.current?.scrollToEnd({ animated: true });
                  Keyboard.dismiss();
                }
              }}
            />
          </PostContainer>
        ) : (
          <PostContainer>
            <FlatList
              ListHeaderComponent={
                <CompanyPostContents
                  file={data?.seeCompanyPost?.file}
                  data={data}
                  userId={data?.seeCompanyPost?.company?.user?.id}
                  username={data?.seeCompanyPost?.company?.user?.username}
                  avatarUrl={data?.seeCompanyPost?.company?.user?.avatarUrl}
                  title={data?.seeCompanyPost?.title}
                  content={data?.seeCompanyPost?.content}
                  category={data?.seeCompanyPost?.category}
                  likeLoading={likeLoading}
                  toggleLikeMutation={toggleCompanyPostLikeMutation}
                  isLiked={data?.seeCompanyPost?.isLiked}
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
            />
          </PostContainer>
        )}
        <CompanyCommentForm
          companyPostId={companyPostId}
          handleComment={handleComment}
          commentUploading={commentUploading}
        />
      </KeyboardAvoidingView>
    </>
  );
}
