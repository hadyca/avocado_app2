import React from "react";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { colors } from "../../../colors";
import SendButton from "../SendButton";

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

export default function CommentFormPresenter({
  createCommentMutation,
  createReCommentMutation,
  userPostId,
  userPostCommentId,
  reCommentScreen,
  loading,
  ReCommentLoading,
  commentUploading,
}) {
  const { handleSubmit, control, reset, watch } = useForm();
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
          loading={loading || ReCommentLoading || commentUploading}
          onPress={handleSubmit(onValid)}
        />
      </Actions>
    </Container>
  );
}
