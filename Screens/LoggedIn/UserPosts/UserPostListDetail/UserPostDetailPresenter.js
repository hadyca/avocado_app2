import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../../../../Colors";
import CommentForm from "../../../../Components/Post/CommentForm";
import PostContents from "../../../../Components/Post/PostContents";

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

export default function UserPostDetailPresenter({
  data,
  likeLoading,
  toggleUserPostLikeMutation,
  renderComment,
  refreshing,
  refresh,
  statusBarHeight,
  userPostId,
  showActionSheet,
}) {
  const navigation = useNavigation();

  const [commentUploading, setCommentUploading] = useState(false);

  let detailRef = useRef();

  const handleComment = () => {
    setCommentUploading(true);
  };

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
      headerRight: HeaderRight,
    });
  }, []);

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
        {data?.seeUserPost?.userPostComments.length > 0 ? (
          <PostContainer>
            <FlatList
              ListHeaderComponent={
                <PostContents
                  file={data?.seeUserPost?.file}
                  data={data}
                  userId={data?.seeUserPost?.user?.id}
                  username={data?.seeUserPost?.user?.username}
                  avatar={data?.seeUserPost?.user?.avatar}
                  content={data?.seeUserPost?.content}
                  category={data?.seeUserPost?.category}
                  likeLoading={likeLoading}
                  toggleLikeMutation={toggleUserPostLikeMutation}
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
              initialNumToRender={30}
              onContentSizeChange={() => {
                if (
                  commentUploading &&
                  data?.seeUserPost?.totalUserPostComments > 5
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
                <PostContents
                  file={data?.seeUserPost?.file}
                  data={data}
                  userId={data?.seeUserPost?.user?.id}
                  username={data?.seeUserPost?.user?.username}
                  avatar={data?.seeUserPost?.user?.avatar}
                  content={data?.seeUserPost?.content}
                  category={data?.seeUserPost?.category}
                  likeLoading={likeLoading}
                  toggleLikeMutation={toggleUserPostLikeMutation}
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
            />
          </PostContainer>
        )}
        <CommentForm
          userPostId={userPostId}
          handleComment={handleComment}
          commentUploading={commentUploading}
        />
      </KeyboardAvoidingView>
    </>
  );
}
