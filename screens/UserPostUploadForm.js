import React, { useRef, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";

import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import * as ImagePicker from "expo-image-picker";
import ContentInput from "../components/post/ContentInput";

const UPLOAD_USER_POST_MUTATION = gql`
  mutation uploadUserPost(
    $fileUrl: [Upload]
    $title: String!
    $content: String!
    $category: String!
  ) {
    uploadUserPost(
      fileUrl: $fileUrl
      title: $title
      content: $content
      category: $category
    ) {
      id
      user {
        username
        avatar
      }
      title
      content
      category
      totalUserPostLikes
      createdAt
      isMine
      file {
        fileUrl
      }
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

export default function UserPostUploadForm({ route: { params } }) {
  const [photo, setPhoto] = useState([]);
  const [countPhoto, setCountPhoto] = useState(0);
  const [screenName, setScreenName] = useState("");
  const navigation = useNavigation();
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

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

  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );
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

    navigation.navigate("UserPostListDetail", {
      id: uploadUserPost.id,
      fromWhere: screenName,
    });
  };

  const [uploadUserPostMutation, { loading }] = useMutation(
    UPLOAD_USER_POST_MUTATION,
    {
      update: updateUploadUserPost,
    }
  );

  const onValid = async ({ title, content }) => {
    const fileUrl = await photo.map((_, index) => {
      return new ReactNativeFile({
        uri: photo[index].uri,
        name: `${index}.jpg`,
        type: "image/jpeg",
      });
    });
    if (!loading) {
      uploadUserPostMutation({
        variables: {
          fileUrl,
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
          uri: result.uri,
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

  const goToCategory = () => navigation.navigate("PostCategory");

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading
        ? HeaderRightLoading
        : !formState.isValid || !params?.category
        ? NoHeaderRight
        : OkHeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [photo, loading, params, formState.isValid]);

  useEffect(() => {
    if (params?.screenName) {
      setScreenName(params?.screenName);
    }
  }, []);

  return (
    <Container>
      <ImageTop>
        <ImageScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          <ImagePick onPress={goToImageSelect}>
            <Ionicons name={"camera"} color={"#868B94"} size={30} />
            <CameraText>{`${countPhoto} / 5`}</CameraText>
          </ImagePick>
          {photo.length > 0
            ? photo.map((item, index) => {
                return (
                  <ImageContainer key={index}>
                    <Image
                      source={{ uri: item.uri }}
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
          {params?.category ? (
            <CategoryContainer>
              <Text>{params?.category}</Text>
              <Ionicons name="chevron-forward" color="black" size={17} />
            </CategoryContainer>
          ) : (
            <CategoryContainer>
              <Text>게시글의 주제를 정해주세요.</Text>
              <Ionicons name="chevron-forward" color="black" size={17} />
            </CategoryContainer>
          )}
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
      </InputBottom>
    </Container>
  );
}
