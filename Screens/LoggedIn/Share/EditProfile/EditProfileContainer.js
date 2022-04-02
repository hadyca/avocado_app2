import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_PROFILE_MUTATION } from "./EditProfileQueries";
import EditProfilePresenter from "./EditProfilePresenter";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState("");

  const goToEditAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 0.2,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
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
    if (params.avatar) {
      setAvatar(params.avatar);
    } else {
      return;
    }
  });

  return (
    <ScreenLayout>
      <EditProfilePresenter
        goToEditAvatar={goToEditAvatar}
        goToEditBio={goToEditBio}
        avatar={avatar}
        bio={params.bio}
      />
    </ScreenLayout>
  );
}
