import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import DismissKeyboard from "../components/DismissKeyBoard";
import { TextInput } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";

const EDIT_COMMENT_MUTATION = gql`
  mutation editUserPostComment($commentId: Int!, $payload: String!) {
    editUserPostComment(commentId: $commentId, payload: $payload) {
      ok
      error
    }
  }
`;

export default function EditUserPostCommentForm({ route: { params } }) {
  const navigation = useNavigation();
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      payload: params.payload,
    },
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
  return (
    <DismissKeyboard>
      <View>
        <Controller
          name="payload"
          rules={{
            required: "comment is required",
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Comment"
              autoCapitalize="none"
              onChangeText={(text) => onChange(text)}
              value={value || ""}
            />
          )}
        />
        <AuthButton
          text="완료"
          loading={loading}
          onPress={handleSubmit(onValid)}
        />
      </View>
    </DismissKeyboard>
  );
}
