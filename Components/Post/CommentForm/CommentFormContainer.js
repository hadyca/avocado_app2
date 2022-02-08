import React from "react";
import { gql, useMutation } from "@apollo/client";
import CommentFormPresenter from "./CommentFormPresenter";
import {
  CREATE_COMMENT_MUTATION,
  CREATE_RECOMMENT_MUTATION,
} from "./CommentFormQueries";
import useMe from "../../../Hooks/useMe";
import { Keyboard } from "react-native";

export default function ({
  userPostId,
  userPostCommentId,
  reCommentScreen,
  handleComment,
  handleReComment,
  commentUploading,
}) {
  const { data: userData } = useMe();

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
              avatar
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
              avatar
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
      update: updateReComment,
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
