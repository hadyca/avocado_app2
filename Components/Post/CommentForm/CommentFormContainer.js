import React from "react";
import { useMutation } from "@apollo/client";
import CommentFormPresenter from "./CommentFormPresenter";
import {
  CREATE_COMMENT_MUTATION,
  CREATE_RECOMMENT_MUTATION,
} from "./CommentFormQueries";

export default function ({
  userPostId,
  userPostCommentId,
  reCommentScreen,
  handleComment,
  handleReComment,
  commentRefetching,
  commentUploading,
}) {
  const updateComment = async (cache, result) => {
    const {
      data: { createUserPostComment },
    } = result;
    if (createUserPostComment.ok) {
      const UserPostId = `UserPost:${userPostId}`;
      cache.modify({
        id: UserPostId,
        fields: {
          totalUserPostComments(prev) {
            return prev + 1;
          },
        },
      });
    }
    handleComment();
  };

  const updateReComment = (cache, result) => {
    const {
      data: { createUserPostReComment },
    } = result;
    if (createUserPostReComment.ok) {
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
      commentRefetching={commentRefetching}
      commentUploading={commentUploading}
    />
  );
}
