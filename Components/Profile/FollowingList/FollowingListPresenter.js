import React from "react";
import styled from "styled-components/native";
import { colors } from "../../../Colors";
import UserAvatar from "../../UserAvatar";

const Container = styled.View`
  margin: 10px;
`;

const Text = styled.Text``;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
`;

const ProfileBtn = styled.TouchableOpacity`
  background-color: ${(props) => (props.backgroundColor ? "blue" : "white")};
  padding: 15px 7px;
  border-radius: 3px;
  width: 100%;
  border: 1px blue solid;
`;

const ProfileText = styled.Text`
  color: ${(props) => (props.backgroundColor ? "white" : "black")};
  font-weight: 600;
  text-align: center;
`;

export default function FollowingListPresenter({
  goToProfile,
  username,
  avatarUrl,
  myCompany,
  isFollowing,
  isMe,
  loading,
  toggleFollowingMutation,
}) {
  const getButton = (isFollowing) => {
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
      <UserAvatar uri={avatarUrl} username={username} />
      {!isMe ? getButton(isFollowing) : null}
      <Separator />
    </Container>
  );
}
