import React from "react";
import styled from "styled-components/native";
import { colors } from "../../../Colors";

const Container = styled.View`
  justify-content: center;
`;

const SubContainer = styled.View`
  height: 70px;
  margin: 0px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AvatarContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AvatarView = styled.View`
  margin-right: 10px;
  border-radius: 30px;
  border: 0.5px solid ${colors.avatarBorder};
`;

const Avatar = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 30px;
`;

const NameView = styled.View``;

const Username = styled.Text`
  color: ${colors.black};
  font-weight: 600;
`;

const CompanyName = styled.Text`
  color: ${colors.greyText};
  font-size: 15px;
`;

const FollowView = styled.View``;

const FollowBtn = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.backgroundColor ? colors.blue : "white"};
  width: 90px;
  padding: 5px 7px;
  border-radius: 3px;
  border: 1px solid ${colors.borderThick};
`;

const FollowText = styled.Text`
  color: ${(props) => (props.backgroundColor ? "white" : "black")};
  font-weight: 600;
  text-align: center;
`;

export default function FollowingListPresenter({
  goToProfile,
  username,
  avatarUrl,
  companyName,
  isFollowing,
  isMe,
  toggleFollowingMutation,
}) {
  const getButton = (isFollowing) => {
    if (isFollowing) {
      return (
        <FollowBtn backgroundColor={false} onPress={toggleFollowingMutation}>
          <FollowText backgroundColor={false}>Following</FollowText>
        </FollowBtn>
      );
    } else {
      return (
        <FollowBtn backgroundColor={true} onPress={toggleFollowingMutation}>
          <FollowText backgroundColor={true}>Follow</FollowText>
        </FollowBtn>
      );
    }
  };

  return (
    <Container>
      <SubContainer>
        <AvatarContainer onPress={goToProfile}>
          {avatarUrl ? (
            <AvatarView>
              <Avatar resizeMode="cover" source={{ uri: avatarUrl }} />
            </AvatarView>
          ) : (
            <AvatarView>
              <Avatar
                resizeMode="cover"
                source={require("../../../assets/blankProfile.png")}
              />
            </AvatarView>
          )}
          <NameView>
            <Username>{username}</Username>
            {companyName ? <CompanyName>{companyName}</CompanyName> : null}
          </NameView>
        </AvatarContainer>
        <FollowView>{!isMe ? getButton(isFollowing) : null}</FollowView>
      </SubContainer>
    </Container>
  );
}
