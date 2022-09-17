import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Colors";
import { timeForToday } from "../../Utils";

const Container = styled.View``;

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Type = styled.Text``;
const AvatarView = styled.TouchableOpacity``;

const Avatar = styled.Image`
  width: 43px;
  height: 43px;
  border-radius: 30px;
`;
const ContentText = styled.Text`
  flex-shrink: 1;
  font-size: 14px;
  color: ${colors.black};
`;

const Date = styled.Text`
  margin-left: 10px;
  margin-right: 10px;
  color: ${colors.greyText};
  font-size: 12px;
`;

const Separator = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${colors.borderThin};
`;

function NotificationList({ id, user, content, createdAt, type }) {
  const time = timeForToday(parseInt(createdAt));

  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
      username: user.username,
    });
  };

  return (
    <>
      <Container>
        <TopContainer>
          <Type>{type}</Type>
          <Date>{time}</Date>
        </TopContainer>
        <BottomContainer>
          <AvatarView onPress={goToProfile}>
            {user.avatarUrl ? (
              <Avatar resizeMode="cover" source={{ uri: user.avatarUrl }} />
            ) : (
              <Avatar
                resizeMode="cover"
                source={require("../../assets/blankProfile.png")}
              />
            )}
          </AvatarView>
          <ContentText>{content}</ContentText>
        </BottomContainer>
      </Container>
      <Separator />
    </>
  );
}

export default React.memo(NotificationList);
