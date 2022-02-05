import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import * as ImagePicker from "expo-image-picker";
import ContentInput from "../Components/Post/ContentInput";
import EditUserPostFormPresenter from "./EditUserPostFormPresenter";

export default function ({ route: { params } }) {
  const [photo, setPhoto] = useState([]);
  const [countPhoto, setCountPhoto] = useState(0);
  const [screenName, setScreenName] = useState("");
  const navigation = useNavigation();
  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: {
      title: params.title,
      content: params.content,
    },
    mode: "onChange",
  });

  const updateEditUserPost = (cache, result) => {
    const { title, content } = getValues();
    const {
      data: { editUserPost },
    } = result;
    if (editUserPost.id) {
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
    navigation.navigate("UserPostListDetail", {
      id: editUserPost.id,
      fromWhere: screenName,
    });
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

  const goToCategory = () =>
    navigation.navigate("EditPostCategory", { id: params.id });
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
    navigation.setOptions({
      headerRight: loading
        ? HeaderRightLoading
        : !formState.isValid || !params?.category
        ? NoHeaderRight
        : OkHeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [photo, loading, params?.category, formState.isValid]);

  useEffect(() => {
    if (params?.screenName) {
      setScreenName(params?.screenName);
    }
  }, []);

  return (
    <ScreenLayout loading={loading}>
      <EditUserPostFormPresenter />
    </ScreenLayout>
  );
}
