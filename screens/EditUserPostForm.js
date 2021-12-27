import React, { useRef, useState } from "react";
import { View, Image } from "react-native";

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

const EDIT_USERPOST_MUTATION = gql`
  mutation editUserPost(
    $userPostId: Int!
    $fileUrl: [Upload]
    $title: String!
    $content: String!
  ) {
    editUserPost(
      userPostId: $userPostId
      fileUrl: $fileUrl
      title: $title
      content: $content
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const ImageTop = styled.View`
  margin: 10px;
`;

const ImageScroll = styled.ScrollView``;
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

const TextInput = styled.TextInput`
  background-color: #ffffff
  padding: 15px 7px;
  color: black;
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

  const contentRef = useRef();

  const onValid = ({ title, content }) => {
    let fileUrl = null;
    // const fileUrl = new ReactNativeFile({
    //   uri: "https://images.unsplash.com/photo-1632766984155-d42dd9affe85?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    //   name: `1.jpg`,
    //   type: "image/jpeg",
    // });
    if (!loading) {
      editUserPostMutation({
        variables: {
          userPostId: parseInt(params.id),
          fileUrl,
          title,
          content,
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
          uri: result.uri,
          name: "1.jpg",
          type: "image/jpeg",
        };
        setPhoto((photo) => [...photo, photoObj]);
        setCountPhoto(countPhoto + 1);
      }
    } else {
      return null;
    }
  };
  return (
    <Container>
      <ImageTop>
        <ImageScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          <ImagePick onPress={goToImageSelect}>
            <Ionicons name={"camera"} color={"#868B94"} size={30} />
            <CameraText>{`${countPhoto} / 5`}</CameraText>
          </ImagePick>
          {params.file.length > 0
            ? params.file.map((item, index) => {
                return (
                  <ImageContainer>
                    <Image
                      key={index + 10}
                      source={{ uri: item.fileUrl }}
                      style={{ height: 60, width: 60 }}
                    />
                    <DeleteBtn key={index} onPress={() => DeleteImg(index)}>
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
            required: "title is required",
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Title"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => onNext(contentRef)}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
        <Controller
          name="content"
          rules={{
            required: "content is required",
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              ref={contentRef}
              multiline={true}
              numberOfLines={4}
              placeholder="Content"
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
      </InputBottom>
    </Container>
  );
}
