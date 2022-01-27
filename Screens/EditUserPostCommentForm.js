import React, { useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import DismissKeyboard from "../Components/DismissKeyBoard";
import styled from "styled-components/native";
import { colors } from "../colors";

const EDIT_COMMENT_MUTATION = gql`
  mutation editUserPostComment($commentId: Int!, $payload: String!) {
    editUserPostComment(commentId: $commentId, payload: $payload) {
      ok
      error
    }
  }
`;

const HeaderRightText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const Container = styled.View`
  margin: 10px;
`;
const TextInput = styled.TextInput`
  width: 100%;
  height: 100%;
  background-color: ${colors.backgraound}
  padding: 13px
  color: black;
  border: 1px solid ${colors.borderThin};
`;
export default function EditUserPostCommentForm({ route: { params } }) {
  const navigation = useNavigation();
  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: {
      payload: params.payload,
    },
    mode: "onChange",
  });

  const updateEditUserPostComment = (cache, result) => {
    const { payload } = getValues();
    const {
      data: {
        editUserPostComment: { ok },
      },
    } = result;
    if (ok) {
      const CommentId = `UserPostComment:${params.commentId}`;
      cache.modify({
        id: CommentId,
        fields: {
          payload() {
            return payload;
          },
        },
      });
    }
    navigation.pop();
  };

  const [editUserPostCommentMutation, { loading }] = useMutation(
    EDIT_COMMENT_MUTATION,
    {
      update: updateEditUserPostComment,
    }
  );
  const onValid = ({ payload }) => {
    if (!loading) {
      editUserPostCommentMutation({
        variables: {
          commentId: parseInt(params.commentId),
          payload,
        },
      });
    }
  };
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );
  const NoHeaderRight = () => (
    <TouchableOpacity
      disabled={true}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 0.5 }}
    >
      <HeaderRightText>Done</HeaderRightText>
    </TouchableOpacity>
  );

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText>Done</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading
        ? HeaderRightLoading
        : !formState.isValid
        ? NoHeaderRight
        : OkHeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading, formState.isValid]);
  return (
    <DismissKeyboard>
      <Container>
        <Controller
          name="payload"
          rules={{
            required: "comment is required",
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
      </Container>
    </DismissKeyboard>
  );
}
