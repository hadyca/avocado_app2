import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";
import DismissKeyboard from "../components/DismissKeyBoard";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../colors";
import * as ImagePicker from "expo-image-picker";
import ContentInput from "../components/post/ContentInput";

const EDIT_USERPOST_MUTATION = gql`
  mutation editUserPost(
    $userPostId: Int!
    $fileUrl: [Upload]
    $title: String!
    $content: String!
    $category: String!
  ) {
    editUserPost(
      userPostId: $userPostId
      fileUrl: $fileUrl
      title: $title
      content: $content
      category: $category
    ) {
      ok
      error
    }
  }
`;

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

const TitleInput = styled.TextInput`
  padding: 15px 7px;
  color: black;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
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
  width: 15px;
  height: 15px;
  background-color: black;
  border-radius: 15px;
  position: absolute;
  top: 0px;
  right: -3px;
  justify-content: center;
  align-items: center;
`;

const DeleteText = styled.Text`
  color: white;
`;

export default function EditUserPostForm({ route: { params } }) {
  const [photo, setPhoto] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [countPhoto, setCountPhoto] = useState(0);
  const navigation = useNavigation();
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      title: params.title,
      content: params.content,
    },
  });

  const updateEditUserPost = (cache, result) => {
    const { title, content } = getValues();
    const {
      data: {
        editUserPost: { ok },
      },
    } = result;
    if (ok) {
      const UserPostId = `UserPost:${params.id}`;

      cache.modify({
        id: UserPostId,
        fields: {
          title() {
            return title;
          },
          content() {
            return content;
          },
          category() {
            return params.category;
          },
          file() {
            return photo[0]?.fileUrl;
          },
        },
      });
    }
    navigation.navigate("UserPostList");
  };

  const [editUserPostMutation, { loading }] = useMutation(
    EDIT_USERPOST_MUTATION,
    {
      update: updateEditUserPost,
    }
  );
  const onValid = async ({ title, content }) => {
    const editedFileUrl = await photo.map((_, index) => {
      return new ReactNativeFile({
        uri: photo[index].fileUrl,
        name: `${index}.jpg`,
        type: "image/jpeg",
      });
    });
    if (!loading) {
      console.log(editedFileUrl);
      editUserPostMutation({
        variables: {
          userPostId: parseInt(params.id),
          fileUrl: editedFileUrl,
          title,
          content,
          category: params?.category,
        },
      });
    }
  };
  const goToImageSelect = async () => {
    if (countPhoto < 5) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 3],
        quality: 0.2,
      });

      if (!result.cancelled) {
        const photoObj = {
          fileUrl: result.uri,
        };
        setPhoto((photo) => [...photo, photoObj]);
        setCountPhoto(countPhoto + 1);
      }
    } else {
      return null;
    }
  };

  const DeleteImg = (index) => {
    const newPhoto = photo.filter((_, i) => i !== index);
    setPhoto(newPhoto);
    setCountPhoto(countPhoto - 1);
  };

  useEffect(() => {
    if (params?.file?.length > 0) {
      setPhoto(params?.file);
      setCountPhoto(params?.file?.length);
    }
  }, []);

  useEffect(() => {
    setForm({ title: params.title, content: params.content });
  }, []);

  const goToCategory = () =>
    navigation.navigate("EditPostCategory", { id: params.id });

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
                      <DeleteText>X</DeleteText>
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
              multiline={false}
              returnKeyType="next"
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
        <CategoryView onPress={goToCategory}>
          <CategoryContainer>
            <Text>{params.category}</Text>
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
              autoCapitalize="none"
              onChangeText={(text) => onChange(text)}
              value={value || ""}
              categoryName={params?.category}
            />
          )}
        />

        <AuthButton
          text="완료"
          loading={loading}
          onPress={handleSubmit(onValid)}
        />
      </InputBottom>
    </Container>
  );
}
