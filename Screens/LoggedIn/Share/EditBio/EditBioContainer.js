import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_BIO_MUTATION } from "./EditBioQueries";
import EditBioPresenter from "./EditBioPresenter";

export default function ({ route: { params } }) {
  const [counting, setCounting] = useState(params.bio.length);

  const navigation = useNavigation();

  const countingText = (value) => {
    return setCounting(value.length);
  };

  const updateBio = (cache, result) => {
    const {
      data: { editProfile },
    } = result;
    if (editProfile.id) {
      const UserId = `User:${editProfile.id}`;
      cache.modify({
        id: UserId,
        fields: {
          bio() {
            return editProfile.bio;
          },
        },
      });
      navigation.navigate("EditProfile", {
        bio: editProfile.bio,
      });
    }
  };

  const [editBioMutation, { loading }] = useMutation(EDIT_BIO_MUTATION, {
    update: updateBio,
  });

  return (
    <ScreenLayout>
      <EditBioPresenter
        editBioMutation={editBioMutation}
        countingText={countingText}
        counting={counting}
        loading={loading}
        originBio={params.bio}
      />
    </ScreenLayout>
  );
}
