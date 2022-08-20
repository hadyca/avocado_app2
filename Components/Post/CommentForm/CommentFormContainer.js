import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Alert, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CREATE_COMMENT_MUTATION,
  CREATE_RECOMMENT_MUTATION,
} from "./CommentFormQueries";
import useMe from "../../../Hooks/useMe";
import CommentFormPresenter from "./CommentFormPresenter";

export default function ({
  userPostId,
  userPostCommentId,
  reCommentScreen,
  handleComment,
  handleReComment,
  commentUploading,
}) {
  const { data: userData } = useMe();
  const navigation = useNavigation();
  const updateComment = async (cache, result) => {
    const {
      data: { createUserPostComment },
    } = result;
    if (createUserPostComment && userData?.me) {
      const newComment = {
        __typename: "UserPostComment",
        createdAt: createUserPostComment?.createdAt,
        id: createUserPostComment?.id,
        isMine: true,
        payload: createUserPostComment?.payload,
        user: {
          ...userData?.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on UserPostComment {
            id
            createdAt
            isMine
            payload
            user {
              id
              username
              avatarUrl
            }
          }
        `,
      });

      const UserPostId = `UserPost:${userPostId}`;
      cache.modify({
        id: UserPostId,
        fields: {
          userPostComments() {
            return newCacheComment;
          },
          totalUserPostComments(prev) {
            return prev + 1;
          },
        },
      });
    }
    handleComment();
    Keyboard.dismiss();
  };

  const updateReComment = (cache, result) => {
    const {
      data: { createUserPostReComment },
    } = result;
    if (createUserPostReComment && userData?.me) {
      const newComment = {
        __typename: "UserPostReComment",
        createdAt: createUserPostReComment?.createdAt,
        id: createUserPostReComment?.id,
        isMine: true,
        payload: createUserPostReComment?.payload,
        user: {
          ...userData?.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName2 on UserPostReComment {
            id
            createdAt
            isMine
            payload
            user {
              id
              username
              avatarUrl
            }
          }
        `,
      });
      const UserPostCommentId = `UserPostComment:${userPostCommentId}`;
      cache.modify({
        id: UserPostCommentId,
        fields: {
          userPostReComments() {
            return newCacheComment;
          },
        },
      });
      const UserPostId = `UserPost:${userPostId}`;
      cache.modify({
        id: UserPostId,
        fields: {
          totalUserPostComments(prev) {
            return prev + 1;
          },
        },
      });
      handleReComment();
      Keyboard.dismiss();
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: updateComment,
    }
  );

  const [createReCommentMutation, { loading: ReCommentLoading }] = useMutation(
    CREATE_RECOMMENT_MUTATION,
    {
      onCompleted: updateReComment,
      onError: () => {
        Alert.alert("존재하지 않는 코멘트 입니다.");
        navigation.pop();
      },
    }
  );
  return (
    <CommentFormPresenter
      userPostId={userPostId}
      userPostCommentId={userPostCommentId}
      createCommentMutation={createCommentMutation}
      createReCommentMutation={createReCommentMutation}
      reCommentScreen={reCommentScreen}
      loading={loading}
      ReCommentLoading={ReCommentLoading}
      commentUploading={commentUploading}
    />
  );
}
