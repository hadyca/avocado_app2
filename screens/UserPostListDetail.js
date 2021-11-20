import React, { useEffect, useRef, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  View,
} from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import ImageSlider from "../components/post/ImageSlider";
import UserAvatar from "../components/UserAvatar";
import { Ionicons } from "@expo/vector-icons";
import Separator from "../components/Separator";
import { colors } from "../colors";
import CommentForm from "../components/post/CommentForm";
import SeeComments from "../components/post/SeeComments";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { getDefaultValues } from "@apollo/client/utilities";
import PostDetail from "../components/post/PostDetail";

const POST_DETAIL_QUERY = gql`
  query seeUserPost($userPostId: Int!) {
    seeUserPost(userPostId: $userPostId) {
      id
      user {
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

const Comments = styled.View`
  margin-top: 10px;
`;

const CommentBigContainer = styled.View``;

const CommentContainer = styled.View`
  margin-bottom: 20px;
`;

const Comment = styled.View`
  margin-top: 2px;
  margin-left: 35px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CommentPayLoad = styled.Text`
  font-size: 14px;
`;

const IconView = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  padding: 10px;
`;

const NoCommentView = styled.View``;
const NoComment = styled.Text`
  margin: auto;
  font-size: 14px;
  color: ${colors.greyText};
`;

export default function UserPostListDetail({ route: { params } }) {
  const { data, loading, fetchMore } = useQuery(POST_DETAIL_QUERY, {
    variables: {
      userPostId: parseInt(params.id),
    },
  });

  const { data: commentData, loading: commentLoading } = useQuery(
    COMMENTS_QUERY,
    {
      variables: {
        userPostId: parseInt(params.id),
      },
    }
  );

  let actionsheet = useRef();
  let optionArray = ["Edit", "Delete", "Cancel"];

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

  const showActionSheet = () => {
    actionsheet.current.show();
  };

  const goToEditForm = () => {
    navigation.navigate("EditUserPostForm", {
      id,
      title,
      content,
      file,
    });
  };

  const handleIndex = (index) => {
    if (index === 0) {
      Alert.alert("Edit", "Do you want edit comment?", [
        { text: "Cancel" },
        { text: "Ok", onPress: () => goToEditForm() },
      ]);
    } else if (index === 1) {
      Alert.alert("Delete", "Do you want delete comment?", [
        { text: "Cancel" },
        {
          text: "Ok",
          onPress: () => goToDeletePost(),
        },
      ]);
    } else {
      return;
    }
  };

  const renderComment = ({ item }) => {
    if (item.deleted === false) {
      return (
        <>
          <View style={{ marginBottom: 20 }}>
            <UserAvatar username={item.user.username} uri={item.user.avatar} />
            <Comment>
              <CommentPayLoad>{item.payload}</CommentPayLoad>
              {item.isMine ? (
                <IconView onPress={showActionSheet}>
                  <Ionicons name="ellipsis-vertical" color="grey" size={14} />
                </IconView>
              ) : null}
            </Comment>
          </View>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <ScreenLayout loading={loading}>
      {commentData?.seeUserPostComments[0] ? (
        <PostDetail
          file={data?.seeUserPost?.file.length}
          data={data}
          username={params.username}
          uri={params.avatar}
          title={data?.seeUserPost?.title}
          content={data?.seeUserPost?.content}
          likeLoading={likeLoading}
          toggleUserPostLike={toggleUserPostLike}
          isLiked={data?.seeUserPost?.isLiked}
          seeUserPostComments={commentData?.seeUserPostComments}
        />
      ) : (
        <PostContainer>
          <View>
            {data?.seeUserPost?.file.length !== 0 ? (
              <ImageSlider data={data} />
            ) : null}
            <Container>
              <Header>
                <UserAvatar username={params.username} uri={params.avatar} />
              </Header>
              <Separator />
              <Contents>
                <Title>{data?.seeUserPost?.title}</Title>
                <Content>{data?.seeUserPost?.content}</Content>
              </Contents>
              <Actions>
                {likeLoading ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <Action onPress={toggleUserPostLike}>
                    <Ionicons
                      name={
                        data?.seeUserPost?.isLiked ? "heart" : "heart-outline"
                      }
                      color={data?.seeUserPost?.isLiked ? "tomato" : "black"}
                      size={22}
                    />
                  </Action>
                )}
              </Actions>
              <Separator />
              <NoCommentView>
                <NoComment>
                  There is no comment. Please write a comment.
                </NoComment>
              </NoCommentView>
            </Container>
          </View>
        </PostContainer>
      )}
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <CommentForm userPostId={parseInt(params.id)} />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
