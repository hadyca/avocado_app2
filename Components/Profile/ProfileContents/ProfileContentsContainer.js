import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { TOGGLE_FOLLOWING_MUTATION } from "./ProfileContentsQueries";
import ProfileContentsPresenter from "./ProfileContentsPresenter";
import useMe from "../../../Hooks/useMe";

export default function ({ data }) {
  const navigation = useNavigation();
  const { data: userData } = useMe();
  const updateToggleFollowing = (cache, result) => {
    const {
      data: { toggleFollowing },
    } = result;
    if (toggleFollowing.id) {
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

  const [toggleFollowingMutation] = useMutation(TOGGLE_FOLLOWING_MUTATION, {
    variables: {
      userId: parseInt(data?.seeProfile?.id),
    },
    update: updateToggleFollowing,
  });

  const goToUserPost = () => {
    navigation.push("UserAllUserPost", {
      id: data?.seeProfile?.id,
    });
  };

  const goToCompanyPost = () => {
    navigation.push("UserAllCompanyPost", {
      id: data?.seeProfile?.myCompany?.id,
    });
  };

  const goToFollowing = () => {
    navigation.push("FollowNav", {
      id: data?.seeProfile?.id,
      username: data?.seeProfile?.username,
      screenName: "Following",
    });
  };

  const goToFollowers = () => {
    navigation.push("FollowNav", {
      id: data?.seeProfile?.id,
      username: data?.seeProfile?.username,
      screenName: "Followers",
    });
  };

  const goToEditProfile = () => {
    navigation.push("EditProfile", {
      username: data?.seeProfile?.username,
      bio: data?.seeProfile?.bio,
      avatarUrl: data?.seeProfile?.avatarUrl,
      myCompany: data?.seeProfile?.myCompany,
    });
  };

  return (
    <ProfileContentsPresenter
      data={data}
      goToUserPost={goToUserPost}
      goToCompanyPost={goToCompanyPost}
      goToFollowing={goToFollowing}
      goToFollowers={goToFollowers}
      toggleFollowingMutation={toggleFollowingMutation}
      goToEditProfile={goToEditProfile}
    />
  );
}
