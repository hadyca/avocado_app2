import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_AVATAR_MUTATION } from "./EditProfileQueries";
import EditProfilePresenter from "./EditProfilePresenter";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const [avatarUrl, setAvatarUrl] = useState("");

  const updateAvatar = (cache, result) => {
    const {
      data: { editProfile },
    } = result;
    if (editProfile.id) {
      const UserId = `User:${editProfile.id}`;
      cache.modify({
        id: UserId,
        fields: {
          avatarUrl() {
            return editProfile.avatarUrl;
          },
        },
      });
      navigation.pop();
    }
  };

  const [editAvatarMutation, { loading }] = useMutation(EDIT_AVATAR_MUTATION, {
    update: updateAvatar,
  });

  const goToSelectAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 0.2,
    });

    if (!result.cancelled) {
      setAvatarUrl(result.uri);
    }
  };
  const goToEditUsername = () => {
    navigation.navigate("EditUsername", {
      username: params.username,
      usernameEditDate: params.usernameEditDate,
    });
  };

  const goToEditBio = () => {
    navigation.navigate("EditBio", {
      bio: params.bio,
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

  return (
    <ScreenLayout>
      <EditProfilePresenter
        editAvatarMutation={editAvatarMutation}
        goToSelectAvatar={goToSelectAvatar}
        goToEditUsername={goToEditUsername}
        goToEditBio={goToEditBio}
        avatarUrl={avatarUrl}
        username={params.username}
        bio={params.bio}
        loading={loading}
      />
    </ScreenLayout>
  );
}
