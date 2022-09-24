import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import CompanyPostUploadFormPresenter from "./CompanyPostUploadFormPresenter";
import { UPLOAD_COMPANY_POST_MUTATION } from "./CompanyPostUploadFormQueries";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const [photo, setPhoto] = useState([]);
  const [countPhoto, setCountPhoto] = useState(0);
  const [screenName, setScreenName] = useState("");

  const navigation = useNavigation();
  const { data: userData } = useMe();

  const updateUploadCompanyPost = (cache, result) => {
    const {
      data: { uploadCompanyPost },
    } = result;

    if (uploadCompanyPost.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCompanyAllPosts(prev) {
            return [uploadCompanyPost, ...prev];
          },
        },
      });
      const { me } = userData;
      const UserId = `User:${me.id}`;
      cache.modify({
        id: UserId,
        fields: {
          totalCompanyPosts(prev) {
            return prev + 1;
          },
        },
      });
    }
    navigation.navigate("CompanyPostAll", {
      id: uploadCompanyPost.id,
      fromWhere: screenName,
    });
  };

  const [uploadCompanyPostMutation, { loading }] = useMutation(
    UPLOAD_COMPANY_POST_MUTATION,
    {
      update: updateUploadCompanyPost,
    }
  );

  const goToImageSelect = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
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
      }
    }
  };

  const DeleteImg = (index) => {
    const newPhoto = photo.filter((_, i) => i !== index);
    setPhoto(newPhoto);
    setCountPhoto(countPhoto - 1);
  };

  useEffect(() => {
    if (params.screenName) {
      setScreenName(params.screenName);
    }
  }, []);

  return (
    <CompanyPostUploadFormPresenter
      goToImageSelect={goToImageSelect}
      DeleteImg={DeleteImg}
      countPhoto={countPhoto}
      photo={photo}
      loading={loading}
      uploadCompanyPostMutation={uploadCompanyPostMutation}
      userData={userData}
    />
  );
}
