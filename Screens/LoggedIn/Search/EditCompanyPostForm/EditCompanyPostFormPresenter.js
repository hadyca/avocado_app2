import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../../Colors";
import { Image, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { ReactNativeFile } from "apollo-upload-client";
import ContentInput from "../../../../Components/Post/ContentInput";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;
const ImageTop = styled.View`
  margin: 10px 10px 0px 10px;
`;

const ImageScroll = styled.ScrollView`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;
const InputBottom = styled.View`
  margin: 0px 10px 10px 10px;
`;

const ImagePick = styled.TouchableOpacity`
  margin: 10px 20px 10px 10px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${colors.borderThick};
`;
const CameraText = styled.Text`
  color: #868b94;
`;

const HeaderRightText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const TitleInput = styled.TextInput`
  padding: 15px 7px;
  color: black;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const ImageContainer = styled.View`
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;

const DeleteBtn = styled.TouchableOpacity`
  border-radius: 15px;
  position: absolute;
  top: 3px;
  right: -5px;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
`;

export default function EditCompanyPostFormPresenter({
  title,
  content,
  loading,
  companyPostId,
  photo,
  countPhoto,
  editCompanyPostMutation,
  goToImageSelect,
  DeleteImg,
  handleEdit,
}) {
  const navigation = useNavigation();
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      title,
      content,
    },
    mode: "onChange",
  });

  const onValid = async ({ title, content }) => {
    const editedFileUrl = await photo.map((_, index) => {
      return new ReactNativeFile({
        uri: photo[index].fileUrl,
        name: `${index}.jpg`,
        type: "image/jpeg",
      });
    });

    if (!loading) {
      handleEdit(title, content);
      editCompanyPostMutation({
        variables: {
          companyPostId: parseInt(companyPostId),
          fileUrl: editedFileUrl,
          title,
          content,
        },
      });
    }
  };
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
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading
        ? HeaderRightLoading
        : !formState.isValid
        ? NoHeaderRight
        : OkHeaderRight,
    });
  }, [photo, loading, formState.isValid]);

  return (
    <Container>
      <ImageTop>
        <ImageScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          <ImagePick onPress={goToImageSelect}>
            <Ionicons name={"camera"} color={"#868B94"} size={30} />
            <CameraText>{`${countPhoto} / 5`}</CameraText>
          </ImagePick>
          {photo?.length > 0
            ? photo.map((item, index) => {
                return (
                  <ImageContainer key={index}>
                    <Image
                      source={{ uri: item.fileUrl }}
                      style={{ height: 60, width: 60 }}
                    />
                    <DeleteBtn onPress={() => DeleteImg(index)}>
                      <AntDesign name="closecircle" size={16} color="black" />
                    </DeleteBtn>
                  </ImageContainer>
                );
              })
            : null}
        </ImageScroll>
      </ImageTop>
      <InputBottom>
        <Controller
          name="title"
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TitleInput
              placeholder="Title"
              autoCapitalize="none"
              maxLength={500}
              multiline={false}
              returnKeyType="next"
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
        <Controller
          name="content"
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ContentInput
              multiline={true}
              textAlignVertical={"top"}
              maxLength={1000}
              autoCapitalize="none"
              onChangeText={(text) => onChange(text)}
              value={value || ""}
            />
          )}
        />
      </InputBottom>
    </Container>
  );
}
