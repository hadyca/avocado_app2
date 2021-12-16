import React, { useRef, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";
import DismissKeyboard from "../components/DismissKeyBoard";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import * as ImagePicker from "expo-image-picker";

const UPLOAD_USER_POST_MUTATION = gql`
  mutation uploadUserPost(
    $fileUrl: [Upload]
    $title: String!
    $content: String!
  ) {
    uploadUserPost(fileUrl: $fileUrl, title: $title, content: $content) {
      id
      user {
        username
        avatar
      }
      title
      content
      totalUserPostLikes
      createdAt
      isMine
      file {
        fileUrl
      }
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const ImageTop = styled.View`
  margin: 10px;
  flex-direction: row;
`;
const InputBottom = styled.View`
  margin: 0px 10px 10px 10px;
`;
const ImagePick = styled.TouchableOpacity`
  margin: 10px;
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
export default function UserPostUploadForm() {
  const [photo, setPhoto] = useState([]);
  const navigation = useNavigation();

  const HeaderRight = () => (
    <TouchableOpacity>
      <HeaderRightText>Done</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const updateUploadUserPost = (cache, result) => {
    const {
      data: { uploadUserPost },
    } = result;
    if (uploadUserPost.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeAllUserPosts(prev) {
            return [uploadUserPost, ...prev];
          },
        },
      });
    }
    navigation.navigate("UserPostList");
  };

  const [uploadUserPostMutation, { loading }] = useMutation(
    UPLOAD_USER_POST_MUTATION,
    {
      update: updateUploadUserPost,
    }
  );

  const { control, handleSubmit } = useForm();

  const contentRef = useRef();

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onValid = ({ title, content }) => {
    const fileUrl = new ReactNativeFile({
      uri: "https://images.unsplash.com/photo-1632766984155-d42dd9affe85?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      name: `1.jpg`,
      type: "image/jpeg",
    });
    if (!loading) {
      uploadUserPostMutation({
        variables: {
          fileUrl,
          title,
          content,
        },
      });
    }
  };

  const goToImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto((photo) => [...photo, result.uri]);
    }
  };

  return (
    <DismissKeyboard>
      <Container>
        <ImageTop>
          <ImagePick onPress={goToImageSelect}>
            <Ionicons name={"camera"} color={"#868B94"} size={30} />
            <CameraText>haha</CameraText>
          </ImagePick>
          {photo.length > 0
            ? photo.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: item }}
                    style={{ height: 55, width: 55 }}
                  />
                );
              })
            : null}
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
    </DismissKeyboard>
  );
}
