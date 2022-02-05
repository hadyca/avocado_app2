import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";

import * as ImagePicker from "expo-image-picker";
import UserPostUploadFormPresenter from "./UserPostUploadFormPresenter";
import { UPLOAD_USER_POST_MUTATION } from "./UserPostUploadFormQueries";

export default function ({ route: { params } }) {
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
    <UserPostUploadFormPresenter
      goToImageSelect={goToImageSelect}
      DeleteImg={DeleteImg}
      goToCategory={goToCategory}
      countPhoto={countPhoto}
      photo={photo}
      category={params.category}
    />
  );
}
