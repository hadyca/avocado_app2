import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Colors";
import { timeForToday } from "../../Utils";
import UserAvatar from "../UserAvatar";

const Container = styled.View`
  justify-content: center;
`;

const ContentContainer = styled.View`
  flex-direction: row;
`;

const ContentText = styled.Text`
  font-size: 14px;
  color: ${colors.black};
`;

const MoreText = styled.Text`
  margin-left: 5px;
  font-size: 12px;
  color: ${colors.greyText};
`;

const LikeComment = styled.View`
  margin-left: 10px;
  flex-direction: row;
  margin-top: 5px;
`;

const Likes = styled.Text`
  margin-right: 5px;
  color: ${colors.greyText};
  font-size: 12px;
`;

const Comments = styled.Text`
  color: ${colors.greyText};
  font-size: 12px;
`;

const Date = styled.Text`
  margin-top: 3px;
  margin-left: 10px;
  color: ${colors.greyText};
  font-size: 10px;
`;

const Separator = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${colors.borderThin};
  margin-top: 10px;
`;

function NotificationList({ id, user, content, createdAt }) {
  const { width, height } = useWindowDimensions();

  const time = timeForToday(parseInt(createdAt));

  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
      username: user.username,
    });
  };

  const goToCategoryScreen = (category) => {
    navigation.navigate("CategoryBoard", {
      category,
    });
  };
  const goToPostDetail = () => {
    navigation.navigate("UserPostListDetail", {
      id,
    });
  };

  return (
    <Container>
      <ContentContainer>
        <ContentText>{content}</ContentText>
        <Date>{time}</Date>
      </ContentContainer>
      <Separator />
    </Container>
  );
}

export default React.memo(NotificationList);
