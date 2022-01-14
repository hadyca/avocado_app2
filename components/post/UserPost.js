import React from "react";
import { useWindowDimensions, Alert } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../colors";
import timeForToday from "../../utils";
import UserAvatar from "../UserAvatar";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  margin-bottom: 10px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Header = styled.TouchableOpacity`
  margin: 10px;
`;

const IconView = styled.TouchableOpacity`
  padding: 10px;
`;

const Contents = styled.TouchableOpacity`
  margin-left: 10px;
`;

const ImgContainer = styled.TouchableOpacity``;

const MainImg = styled.Image`
  margin-top: 5px;
  width: ${(props) => props.width}px;
  height: ${(props) => Math.ceil(props.height / 3)}px;
`;

const Title = styled.Text`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled.View`
  font-size: 14px;
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

const ContentText = styled.Text`
  font-size: 14px;
  color: ${colors.black};
`;

const MoreText = styled.Text`
  margin-left: 5px;
  font-size: 12px;
  color: ${colors.homeText};
`;

const LikeComment = styled.View`
  margin-left: 10px;
  flex-direction: row;
  margin-top: 5px;
`;

const Likes = styled.Text`
  margin-right: 5px;
  color: ${colors.homeText};
  font-size: 11px;
`;

const Comments = styled.Text`
  color: ${colors.homeText};
  font-size: 11px;
`;

const Date = styled.Text`
  margin-top: 3px;
  margin-left: 10px;
  color: ${colors.homeText};
  font-size: 8px;
`;

const Separator = styled.View`
  width: 100%;
  height: 2px;
  background-color: ${colors.borderThin};
  margin-top: 20px;
`;

function UserPost({
  id,
  user,
  file,
  title,
  content,
  category,
  totalUserPostLikes,
  totalUserPostComments,
  createdAt,
  isMine,
}) {
  const { width, height } = useWindowDimensions();

  const date = new window.Date(parseInt(createdAt));

  const time = timeForToday(date);

  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
      username: user.username,
    });
  };
  const goToPostDetail = () => {
    navigation.navigate("UserPostListDetail", {
      id,
    });
  };

  return (
    <Container>
      <HeaderContainer>
        <Header onPress={goToProfile}>
          <UserAvatar username={user.username} uri={user.avatar} />
        </Header>
      </HeaderContainer>
      {file.length > 0 ? (
        <ImgContainer onPress={goToPostDetail}>
          <MainImg
            resizeMode="cover"
            source={{ uri: file[0].fileUrl }}
            width={width}
            height={height}
          />
        </ImgContainer>
      ) : null}
      <Contents onPress={goToPostDetail}>
        <Title>{category}</Title>
        <Title>{title}</Title>
        {content.length >= 20 ? (
          <Content>
            <ContentText>{content.substr(0, 20)}</ContentText>
            <MoreText>...more</MoreText>
          </Content>
        ) : (
          <Content>
            <ContentText>{content}</ContentText>
          </Content>
        )}
      </Contents>
      <LikeComment>
        <Likes>
          {totalUserPostLikes > 1
            ? `${totalUserPostLikes} likes`
            : `${totalUserPostLikes} like`}
        </Likes>
        <Comments>
          {totalUserPostComments > 1
            ? `${totalUserPostComments} comments`
            : `${totalUserPostComments} comment`}
        </Comments>
      </LikeComment>
      <Date>{time}</Date>
      <Separator />
    </Container>
  );
}

export default React.memo(UserPost);
