import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import CompanyPostUploadFormPresenter from "./CompanyPostUploadFormPresenter";
import { UPLOAD_COMPANY_POST_MUTATION } from "./CompanyPostUploadFormQueries";
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

  const updateUploadCompanyPost = (cache, result) => {
    const {
      data: { uploadCompanyPost },
    } = result;

    // if (uploadCompanyPost.id) {
    //   cache.modify({
    //     id: "ROOT_QUERY",
    //     fields: {
    //       seeAllCompanyPosts(prev) {
    //         return [uploadCompanyPost, ...prev];
    //       },
    //     },
    //   });
    // }

    if (screenName === ScreenNames.SEARCH_DISTRICT) {
      navigation.navigate("SearchConditionDistrict", {
        id: uploadCompanyPost.id,
        fromWhere: screenName,
      });
    }

    if (screenName === ScreenNames.SEARCH_SECTOR) {
      navigation.navigate("SearchConditionSector", {
        id: uploadCompanyPost.id,
        fromWhere: screenName,
      });
    }

    if (screenName === ScreenNames.COMPANY_POST_BY_DISTRICT) {
      navigation.navigate("CompanyPostByDistrict", {
        id: uploadCompanyPost.id,
        addressStep2: params.addressStep2,
        fromWhere: screenName,
      });
    }

    if (screenName === ScreenNames.COMPANY_POST_BY_SECTOR) {
      navigation.navigate("CompanyPostBySector", {
        id: uploadCompanyPost.id,
        sector: params.sector,
        fromWhere: screenName,
      });
    }
  };

  const [uploadCompanyPostMutation, { loading }] = useMutation(
    UPLOAD_COMPANY_POST_MUTATION,
    {
      update: updateUploadCompanyPost,
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

  //   const goToCategory = () => navigation.navigate("PostCategory");

  useEffect(() => {
    if (params.screenName) {
      setScreenName(params.screenName);
    }
  }, []);

  return (
    <CompanyPostUploadFormPresenter
      goToImageSelect={goToImageSelect}
      DeleteImg={DeleteImg}
      //   goToCategory={goToCategory}
      countPhoto={countPhoto}
      photo={photo}
      //   category={params.category}
      loading={loading}
      uploadCompanyPostMutation={uploadCompanyPostMutation}
    />
  );
}
