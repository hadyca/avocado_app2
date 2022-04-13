import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import ScreenLayout from "../../../../Components/ScreenLayout";
import {
  EDIT_AVATAR_MUTATION,
  EDIT_COMPANY_MUTATION,
} from "./EditProfileQueries";
import EditProfilePresenter from "./EditProfilePresenter";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const [isEdited, setIsEdited] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [skipPop, setSkipPop] = useState(false);

  const [editAvatarMutation, { loading }] = useMutation(EDIT_AVATAR_MUTATION, {
    onCompleted: () => {
      if (!skipPop) {
        navigation.pop();
      } else {
        return;
      }
    },
  });

  const [editSectorMutation, { loading: companyLoading }] = useMutation(
    EDIT_COMPANY_MUTATION,
    {
      onCompleted: () => navigation.pop(),
    }
  );

  const goToSelectAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 0.2,
    });
    if (!result.cancelled) {
      setAvatarUrl(result.uri);
      setIsEdited(true);
    }
  };

  const goToEditUsername = () => {
    navigation.navigate("EditUsername", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditBio = () => {
    navigation.navigate("EditBio", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditCompanyName = () => {
    navigation.navigate("EditCompanyName", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditAboutUs = () => {
    navigation.navigate("EditAboutUs", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditTotalEmployees = () => {
    navigation.navigate("EditTotalEmployees", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

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

  useEffect(() => {
    if (params.avatarUrl) {
      setAvatarUrl(params.avatarUrl);
    } else {
      return;
    }
  }, []);

  const skiphandle = () => {
    setSkipPop(true);
  };

  return (
    <ScreenLayout>
      <EditProfilePresenter
        editAvatarMutation={editAvatarMutation}
        editSectorMutation={editSectorMutation}
        goToSelectAvatar={goToSelectAvatar}
        goToEditUsername={goToEditUsername}
        goToEditBio={goToEditBio}
        goToEditCompanyName={goToEditCompanyName}
        goToEditAboutUs={goToEditAboutUs}
        goToEditTotalEmployees={goToEditTotalEmployees}
        isEdited={isEdited}
        avatarUrl={avatarUrl}
        username={params.username}
        bio={params.bio}
        myCompany={params.myCompany}
        loading={loading}
        companyLoading={companyLoading}
        skiphandle={skiphandle}
      />
    </ScreenLayout>
  );
}
