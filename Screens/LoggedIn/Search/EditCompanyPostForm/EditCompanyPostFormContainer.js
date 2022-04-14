import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import EditCompanyPostFormPresenter from "./EditCompanyPostFormPresenter";
import { EDIT_COMPANYPOST_MUTATION } from "./EditCompanyPostFormQueries";

export default function ({ route: { params } }) {
  const [photo, setPhoto] = useState([]);
  const [countPhoto, setCountPhoto] = useState(0);
  const [screenName, setScreenName] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const navigation = useNavigation();

  const updateEditCompanyPost = (cache, result) => {
    const {
      data: {
        editCompanyPost: { ok, id },
      },
    } = result;
    if (ok) {
      const CompanyPostId = `CompanyPost:${params.id}`;
      cache.modify({
        id: CompanyPostId,
        fields: {
          title() {
            return editedTitle;
          },
          content() {
            return editedContent;
          },
          file() {
            return photo[0]?.fileUrl;
          },
        },
      });
    }
    navigation.navigate("CompanyPostListDetail", {
      id,
      fromWhere: screenName,
    });
  };
  const [editCompanyPostMutation, { loading }] = useMutation(
    EDIT_COMPANYPOST_MUTATION,
    {
      update: updateEditCompanyPost,
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

  useEffect(() => {
    if (params.screenName) {
      setScreenName(params.screenName);
    }
  }, []);

  const handleEdit = (title, content) => {
    setEditedTitle(title);
    setEditedContent(content);
  };

  return (
    <EditCompanyPostFormPresenter
      title={params.title}
      content={params.content}
      loading={loading}
      companyPostId={params.id}
      photo={photo}
      countPhoto={countPhoto}
      category={params.category}
      editCompanyPostMutation={editCompanyPostMutation}
      DeleteImg={DeleteImg}
      goToImageSelect={goToImageSelect}
      handleEdit={handleEdit}
    />
  );
}
