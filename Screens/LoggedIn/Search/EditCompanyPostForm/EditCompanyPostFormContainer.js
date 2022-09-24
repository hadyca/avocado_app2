import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import EditCompanyPostFormPresenter from "./EditCompanyPostFormPresenter";
import { EDIT_COMPANYPOST_MUTATION } from "./EditCompanyPostFormQueries";

export default function ({ route: { params } }) {
  const [photo, setPhoto] = useState([]);
  const [countPhoto, setCountPhoto] = useState(0);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedWage, setWage] = useState();
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
          wage() {
            return editedWage;
          },
        },
      });
    }
    navigation.navigate("CompanyPostListDetail", {
      id,
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

  const handleEdit = (title, content, wage) => {
    setEditedTitle(title);
    setEditedContent(content);
    setWage(wage);
  };

  return (
    <EditCompanyPostFormPresenter
      title={params.title}
      content={params.content}
      originWorkingDay={params.workingDay}
      originDayOption={params.dayOption}
      originStartTime={params.startTime}
      originFinishTime={params.finishTime}
      originTimeOption={params.timeOption}
      originWageType={params.wageType}
      originWage={params.wage}
      originContactNumber={params.contactNumber}
      originEmail={params.email}
      loading={loading}
      companyPostId={params.id}
      photo={photo}
      countPhoto={countPhoto}
      editCompanyPostMutation={editCompanyPostMutation}
      DeleteImg={DeleteImg}
      goToImageSelect={goToImageSelect}
      handleEdit={handleEdit}
    />
  );
}
