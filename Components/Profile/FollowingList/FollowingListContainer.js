import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { TOGGLE_FOLLOWING_MUTATION } from "./FollowingListQueries";
import FollowingListPresenter from "./FollowingListPresenter";
import useMe from "../../../Hooks/useMe";

export default function ({ data }) {
  const navigation = useNavigation();
  const { data: userData } = useMe();
  const updateToggleFollowing = (cache, result) => {
    const {
      data: {
        toggleFollowing: { ok },
      },
    } = result;

    if (ok) {
      const UserId = `User:${data?.seeProfile?.id}`;
      cache.modify({
        id: UserId,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowers(prev) {
            if (data?.seeProfile?.isFollowing) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
      const { me } = userData;
      cache.modify({
        id: `User:${me.id}`,
        fields: {
          totalFollowing(prev) {
            if (data?.seeProfile?.isFollowing) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
    }
  };

  const [toggleFollowingMutation, { loading }] = useMutation(
    TOGGLE_FOLLOWING_MUTATION,
    {
      variables: {
        userId: parseInt(data?.seeProfile?.id),
      },
      update: updateToggleFollowing,
    }
  );

  const goToUserPost = () => {
    navigation.navigate("UserAllUserPost", {
      id: data?.seeProfile?.id,
    });
  };

  const goToCompanyPost = () => {
    navigation.navigate("UserAllCompanyPost", {
      id: data?.seeProfile?.myCompany?.id,
    });
  };

  const goToEditProfile = () => {
    navigation.navigate("EditProfile", {
      username: data?.seeProfile?.username,
      bio: data?.seeProfile?.bio,
      avatarUrl: data?.seeProfile?.avatarUrl,
    });
  };

  return (
    <FollowingListPresenter
      data={data}
      loading={loading}
      goToUserPost={goToUserPost}
      goToCompanyPost={goToCompanyPost}
      toggleFollowingMutation={toggleFollowingMutation}
      goToEditProfile={goToEditProfile}
    />
  );
}
