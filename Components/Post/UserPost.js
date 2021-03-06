import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Colors";
import { timeForToday } from "../../Utils";
import UserAvatar from "../UserAvatar";

const Container = styled.View``;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Header = styled.TouchableOpacity`
  margin: 10px;
`;

const CategoryView = styled.View`
  margin-left: 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: flex-start;
`;
const CategoryTouch = styled.TouchableOpacity``;

const CategoryText = styled.Text`
  font-size: 11px;
  padding: 5px 10px;
  background-color: ${colors.borderThin};
  font-weight: 600;
  text-align: center;
`;

const Contents = styled.TouchableOpacity`
  margin-left: 10px;
  margin-top: 8px;
`;

const ImgContainer = styled.TouchableOpacity`
  margin-top: 8px;
`;

const MainImg = styled.Image`
  margin-top: 5px;
  width: ${(props) => props.width}px;
  height: ${(props) => Math.ceil(props.height / 3)}px;
`;

const Content = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: flex-end;
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

function UserPost({
  id,
  user,
  file,
  content,
  category,
  totalUserPostLikes,
  totalUserPostComments,
  createdAt,
}) {
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
      <HeaderContainer>
        <Header onPress={goToProfile}>
          <UserAvatar username={user.username} uri={user.avatarUrl} />
        </Header>
      </HeaderContainer>
      <CategoryView>
        <CategoryTouch onPress={() => goToCategoryScreen(category)}>
          <CategoryText>{category}</CategoryText>
        </CategoryTouch>
      </CategoryView>
      {file?.length > 0 ? (
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
        {content.length >= 20 ? (
          <Content>
            <ContentText>{content.substring(0, 20)}</ContentText>
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
