import React from "react";
import styled from "styled-components/native";
import { colors } from "../../../Colors";

const Container = styled.View`
  margin: 10px;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
`;

export default function FollowingListPresenter({
  data,
  loading,
  goToProfile,
  toggleFollowingMutation,
}) {
  const getButton = (seeFollowing) => {
    const { isFollowing } = seeFollowing;
    if (isFollowing) {
      return (
        <ProfileBtn backgroundColor={false} onPress={toggleFollowingMutation}>
          <ProfileText backgroundColor={false}>Following</ProfileText>
        </ProfileBtn>
      );
    } else {
      return (
        <ProfileBtn backgroundColor={true} onPress={toggleFollowingMutation}>
          <ProfileText backgroundColor={true}>Follow</ProfileText>
        </ProfileBtn>
      );
    }
  };

  return (
    <Container>
      {data?.seeFollowing ? getButton(data.seeFollowing) : null}
      <Separator />
    </Container>
  );
}
