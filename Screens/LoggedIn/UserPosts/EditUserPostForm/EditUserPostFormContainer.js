import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import EditUserPostFormPresenter from "./EditUserPostFormPresenter";
import { EDIT_USERPOST_MUTATION } from "./EditUserPostFormQueries";

export default function ({ route: { params } }) {
  const [photo, setPhoto] = useState([]);
  const [countPhoto, setCountPhoto] = useState(0);
  const [screenName, setScreenName] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const navigation = useNavigation();

  const updateEditUserPost = (cache, result) => {
    const {
      data: {
        editUserPost: { ok, id },
      },
    } = result;
    if (ok) {
      const UserPostId = `UserPost:${params.id}`;

      cache.modify({
        id: UserPostId,
        fields: {
          content() {
            return editedContent;
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
      id,
      fromWhere: screenName,
    });
  };
  const [editUserPostMutation, { loading }] = useMutation(
    EDIT_USERPOST_MUTATION,
    {
      update: updateEditUserPost,
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

  useEffect(() => {
    if (params.screenName) {
      setScreenName(params.screenName);
    }
  }, []);

  const handleEdit = (content) => {
    setEditedContent(content);
  };

  return (
    <EditUserPostFormPresenter
      content={params.content}
      loading={loading}
      userPostId={params.id}
      photo={photo}
      countPhoto={countPhoto}
      category={params.category}
      editUserPostMutation={editUserPostMutation}
      DeleteImg={DeleteImg}
      goToCategory={goToCategory}
      goToImageSelect={goToImageSelect}
      handleEdit={handleEdit}
    />
  );
}
