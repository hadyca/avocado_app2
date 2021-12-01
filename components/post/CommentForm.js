import React from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { colors } from "../../colors";
import AuthButton from "../auth/AuthButton";
import { Ionicons } from "@expo/vector-icons";

const CREATE_COMMENT_MUTATION = gql`
  mutation createUserPostComment($userPostId: Int!, $payload: String!) {
    createUserPostComment(userPostId: $userPostId, payload: $payload) {
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
  position: absolute;
  right: 10px;
`;
export default function CommentForm({ userPostId, refetch, commentLoading }) {
  const { handleSubmit, control, reset } = useForm();

  const updateComment = (cache, result) => {
    const {
      data: { createUserPostComment },
    } = result;
    if (createUserPostComment.ok) {
      const UserPostId = `UserPost:${userPostId}`;
      cache.modify({
        id: UserPostId,
        fields: {
          userPostComments(prev) {
            return [createUserPostComment, ...prev];
          },
          totalUserPostComments(prev) {
            return prev + 1;
          },
        },
      });
      refetch();
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: updateComment,
    }
  );

  const onValid = ({ payload }) => {
    if (!loading) {
      createCommentMutation({
        variables: {
          userPostId,
          payload,
        },
      });
      reset();
    }
  };

  return (
    <Container>
      <Actions>
        <Controller
          name="payload"
          rules={{
            required: "코멘트를 입력해주세요.",
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Please Write Comment"
              multiline={true}
              // maxLength={120}
              maxHeight={120}
              autoCapitalize="none"
              onChangeText={(text) => onChange(text)}
              value={value || ""}
            />
          )}
        />
        <IconView onPress={handleSubmit(onValid)}>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={40}
            color="black"
          />
        </IconView>
      </Actions>
    </Container>
  );
}
