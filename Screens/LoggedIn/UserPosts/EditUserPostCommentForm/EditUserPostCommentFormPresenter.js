import React, { useEffect } from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components/native";
import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import { colors } from "../../../../Colors";

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
  background-color: ${colors.backgraound};
  padding: 13px;
  color: black;
  border: 1px solid ${colors.borderThin};
`;

export default function EditUserPostCommentFormPresenter({
  loading,
  editUserPostCommentMutation,
  commentId,
  originalPayload,
  handlePayload,
}) {
  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      payload: originalPayload,
    },
    mode: "onChange",
  });
  const onValid = ({ payload }) => {
    if (!loading) {
      handlePayload(payload);
      editUserPostCommentMutation({
        variables: {
          commentId: parseInt(commentId),
          payload,
        },
      });
    }
  };
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );
  const NoHeaderRight = () => (
    <TouchableOpacity disabled={true} style={{ marginRight: 10, opacity: 0.5 }}>
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
              textAlignVertical={"top"}
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
