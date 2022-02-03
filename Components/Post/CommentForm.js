import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { colors } from "../../colors";
import SendButton from "./SendButton";
import { Keyboard, Text, View } from "react-native";
const CREATE_COMMENT_MUTATION = gql`
  mutation createUserPostComment($userPostId: Int!, $payload: String!) {
    createUserPostComment(userPostId: $userPostId, payload: $payload) {
      ok
      error
    }
  }
`;

const CREATE_RECOMMENT_MUTATION = gql`
  mutation createUserRePostComment(
    $userPostCommentId: Int!
    $payload: String!
  ) {
    createUserPostReComment(
      userPostCommentId: $userPostCommentId
      payload: $payload
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  border-top-width: 1px;
  border-top-color: ${colors.borderThin};
  border-style: solid;
  margin-bottom: 30px;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 3px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  height: 100%;
  background-color: ${colors.greyBackround};
  padding: 13px 50px 13px 8px;
  border-radius: 25px;
  color: black;
  border: 1px solid ${colors.borderThin};
`;

const IconView = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  position: absolute;
  right: 10px;
`;

export default function CommentForm({
  userPostId,
  userPostCommentId,
  reCommentScreen,
  handleComment,
  handleReComment,
}) {
  const { handleSubmit, control, reset, watch } = useForm();

  const updateComment = async (cache, result) => {
    const {
      data: { createUserPostComment },
    } = result;
    if (createUserPostComment.ok) {
      const UserPostId = `UserPost:${userPostId}`;
      cache.modify({
        id: UserPostId,
        fields: {
          // userPostComments(prev) {
          //   return [createUserPostComment, ...prev];
          // },
          totalUserPostComments(prev) {
            return prev + 1;
          },
        },
      });
    }
    Keyboard.dismiss();
    handleComment();
  };

  const updateReComment = (cache, result) => {
    const {
      data: { createUserPostReComment },
    } = result;
    if (createUserPostReComment.ok) {
      // const UserPostCommentId = `UserPostComment:${userPostCommentId}`;
      const UserPostId = `UserPost:${userPostId}`;
      // cache.modify({
      //   id: UserPostCommentId,
      //   fields: {
      //     userPostReComments(prev) {
      //       return [createUserPostReComment, ...prev];
      //     },
      //   },
      // });
      cache.modify({
        id: UserPostId,
        fields: {
          totalUserPostComments(prev) {
            return prev + 1;
          },
        },
      });
      Keyboard.dismiss();
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

  const onValid = ({ payload }) => {
    if (reCommentScreen) {
      createReCommentMutation({
        variables: {
          userPostCommentId: parseInt(userPostCommentId),
          payload,
        },
      });
    } else {
      createCommentMutation({
        variables: {
          userPostId: parseInt(userPostId),
          payload,
        },
      });
    }
    reset();
  };

  return (
    <Container>
      <Actions>
        <Controller
          name="payload"
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Please Write Comment"
              multiline={true}
              // maxLength={120}
              maxHeight={120}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <SendButton
          disabled={!watch("payload")}
          // loading={loading || ReCommentLoading}
          onPress={handleSubmit(onValid)}
        />
      </Actions>
    </Container>
  );
}
