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
import { CATEGORY_BOARD, USER_POST_LIST } from "../../../../Constant";

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
  toggleUserPostLikeMutation,
  renderComment,
  refreshing,
  refresh,
  statusBarHeight,
  userPostId,
  showActionSheet,
  fromWhere,
}) {
  const navigation = useNavigation();

  const [commentUploading, setCommentUploading] = useState(false);

  let detailRef = useRef();

  const handleComment = () => {
    setCommentUploading(true);
  };

  //Header setting
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

  const headerLeftUserPostList = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("UserPostList")}
      stlye={{ marginLeft: 10 }}
    >
      <Ionicons name="chevron-back-outline" color="black" size={30} />
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
        fromWhere === CATEGORY_BOARD
          ? headerLeftCategory
          : fromWhere === USER_POST_LIST
          ? headerLeftUserPostList
          : headerLeft,
      headerRight: HeaderRight,
    });
  }, [fromWhere, data]);

  return (
    <>
      {data?.seeUserPost?.userPostComments.length > 0 ? (
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
          />
        </PostContainer>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={statusBarHeight + 20}
        // keyboardVerticalOffset={300}
      >
        <CommentForm
          userPostId={userPostId}
          handleComment={handleComment}
          commentUploading={commentUploading}
        />
      </KeyboardAvoidingView>
    </>
  );
}
