import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import UserPostUploadFormPresenter from "./UserPostUploadFormPresenter";
import { UPLOAD_USER_POST_MUTATION } from "./UserPostUploadFormQueries";
import { ScreenNames } from "../../../../Constant";

export default function ({ route: { params } }) {
  const [photo, setPhoto] = useState([]);
  const [countPhoto, setCountPhoto] = useState(0);
  const [screenName, setScreenName] = useState("");

  const navigation = useNavigation();

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

    // navigation.navigate("UserPostListDetail", {
    //   id: uploadUserPost.id,
    //   fromWhere: screenName,
    // });
    if (screenName === ScreenNames.USER_POST_LIST) {
      navigation.navigate("UserPostList", {
        id: uploadUserPost.id,
        fromWhere: screenName,
      });
    }

    if (screenName === ScreenNames.CATEGORY_BOARD) {
      navigation.navigate("CategoryBoard", {
        id: uploadUserPost.id,
        category: params.category,
        fromWhere: screenName,
      });
    }
  };

  const [uploadUserPostMutation, { loading }] = useMutation(
    UPLOAD_USER_POST_MUTATION,
    {
      update: updateUploadUserPost,
    }
  );

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
    if (params.screenName) {
      setScreenName(params.screenName);
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
      loading={loading}
      uploadUserPostMutation={uploadUserPostMutation}
    />
  );
}
