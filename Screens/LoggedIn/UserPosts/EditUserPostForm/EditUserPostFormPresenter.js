import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../../Colors";
import { Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
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
  border: 1px;
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

const CategoryView = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const CategoryContainer = styled.View`
  padding: 15px 7px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export default function EditUserPostFormPresenter({
  content,
  loading,
  userPostId,
  photo,
  countPhoto,
  category,
  editUserPostMutation,
  goToCategory,
  goToImageSelect,
  DeleteImg,
  handleEdit,
}) {
  const navigation = useNavigation();
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      content,
    },
    mode: "onChange",
  });

  const onValid = async ({ content }) => {
    const editedFileUrl = await photo.map((_, index) => {
      return new ReactNativeFile({
        uri: photo[index].fileUrl,
        name: `${index}.jpg`,
        type: "image/jpeg",
      });
    });

    if (!loading) {
      handleEdit(content);
      editUserPostMutation({
        variables: {
          userPostId: parseInt(userPostId),
          fileUrl: editedFileUrl,
          content,
          category,
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
        : !formState.isValid || !category
        ? NoHeaderRight
        : OkHeaderRight,
    });
  }, [photo, loading, category, formState.isValid]);

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
        <CategoryView onPress={goToCategory}>
          <CategoryContainer>
            <Text>{category}</Text>
            <Ionicons name="chevron-forward" color="black" size={17} />
          </CategoryContainer>
        </CategoryView>
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
              categoryName={category}
            />
          )}
        />
      </InputBottom>
    </Container>
  );
}
