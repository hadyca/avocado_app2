import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { TOGGLE_FOLLOWING_MUTATION } from "./FollowingListQueries";
import FollowingListPresenter from "./FollowingListPresenter";
import useMe from "../../../Hooks/useMe";

export default function ({
  id,
  username,
  avatarUrl,
  myCompany,
  isFollowing,
  isMe,
}) {
  const navigation = useNavigation();
  const { data: userData } = useMe();
  const updateToggleFollowing = (cache, result) => {
    const {
      data: {
        toggleFollowing: { ok },
      },
    } = result;
    if (ok) {
      // const UserId = `User:${data?.seeFollowing?.id}`;
      // cache.modify({
      //   id: UserId,
      //   fields: {
      //     isFollowing(prev) {
      //       return !prev;
      //     },
      //     totalFollowers(prev) {
      //       if (data?.seeFollowing?.isFollowing) {
      //         return prev - 1;
      //       } else {
      //         return prev + 1;
      //       }
      //     },
      //   },
      // });
      // const { me } = userData;
      // cache.modify({
      //   id: `User:${me.id}`,
      //   fields: {
      //     totalFollowing(prev) {
      //       if (data?.seeProfile?.isFollowing) {
      //         return prev - 1;
      //       } else {
      //         return prev + 1;
      //       }
      //     },
      //   },
      // });
    }
  };

  const [toggleFollowingMutation, { loading }] = useMutation(
    TOGGLE_FOLLOWING_MUTATION,
    {
      variables: {
        userId: parseInt(id),
      },
      update: updateToggleFollowing,
    }
  );

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id,
    });
  };

  return (
    <FollowingListPresenter
      username={username}
      avatarUrl={avatarUrl}
      myCompany={myCompany}
      isFollowing={isFollowing}
      isMe={isMe}
      loading={loading}
      goToProfile={goToProfile}
      toggleFollowingMutation={toggleFollowingMutation}
    />
  );
}
