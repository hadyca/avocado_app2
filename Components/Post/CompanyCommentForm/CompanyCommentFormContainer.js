import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Alert, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CREATE_COMMENT_MUTATION,
  CREATE_RECOMMENT_MUTATION,
} from "./CompanyCommentFormQueries";
import CompanyCommentFormPresenter from "./CompanyCommentFormPresenter";
import useMe from "../../../Hooks/useMe";

export default function ({
  companyPostId,
  companyPostCommentId,
  reCommentScreen,
  handleComment,
  handleReComment,
  commentUploading,
}) {
  const { data: userData } = useMe();
  const navigation = useNavigation();
  const updateComment = async (cache, result) => {
    const {
      data: { createCompanyPostComment },
    } = result;
    if (createCompanyPostComment && userData?.me) {
      const newComment = {
        __typename: "CompanyPostComment",
        createdAt: createCompanyPostComment?.createdAt,
        id: createCompanyPostComment?.id,
        isMine: true,
        payload: createCompanyPostComment?.payload,
        user: {
          ...userData?.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on CompanyPostComment {
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

      const CompanyPostId = `CompanyPost:${companyPostId}`;
      cache.modify({
        id: CompanyPostId,
        fields: {
          companyPostComments() {
            return newCacheComment;
          },
          totalCompanyPostComments(prev) {
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
      data: { createCompanyPostReComment },
    } = result;
    if (createCompanyPostReComment && userData?.me) {
      const newComment = {
        __typename: "CompanyPostReComment",
        createdAt: createCompanyPostReComment?.createdAt,
        id: createCompanyPostReComment?.id,
        isMine: true,
        payload: createCompanyPostReComment?.payload,
        user: {
          ...userData?.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName2 on CompanyPostReComment {
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
      const CompanyPostCommentId = `CompanyPostComment:${companyPostCommentId}`;
      cache.modify({
        id: CompanyPostCommentId,
        fields: {
          companyPostReComments() {
            return newCacheComment;
          },
        },
      });
      const CompanyPostId = `CompanyPost:${companyPostId}`;
      cache.modify({
        id: CompanyPostId,
        fields: {
          totalCompanyPostComments(prev) {
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
      onError: () => {
        Alert.alert("존재하지 않는 코멘트 입니다.");
        navigation.pop();
      },
    }
  );
  return (
    <CompanyCommentFormPresenter
      companyPostId={companyPostId}
      companyPostCommentId={companyPostCommentId}
      createCommentMutation={createCommentMutation}
      createReCommentMutation={createReCommentMutation}
      reCommentScreen={reCommentScreen}
      loading={loading}
      ReCommentLoading={ReCommentLoading}
      commentUploading={commentUploading}
    />
  );
}
