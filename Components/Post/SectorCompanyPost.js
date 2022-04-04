import React from "react";
import { useWindowDimensions, Text } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Colors";
import timeForToday from "../../Utils";
import UserAvatar from "../UserAvatar";

const Container = styled.View``;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Header = styled.TouchableOpacity`
  margin: 10px;
`;

const Contents = styled.TouchableOpacity`
  margin-left: 10px;
`;

const ImgContainer = styled.TouchableOpacity`
  margin-bottom: 8px;
`;

const MainImg = styled.Image`
  width: ${(props) => props.width}px;
  height: ${(props) => Math.ceil(props.height / 3)}px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const LikeComment = styled.View`
  margin-left: 10px;
  flex-direction: row;
  margin-top: 5px;
`;

const Likes = styled.Text`
  margin-right: 5px;
  color: ${colors.greyText};
  font-size: 11px;
`;

const Comments = styled.Text`
  color: ${colors.greyText};
  font-size: 11px;
`;

const Date = styled.Text`
  margin-top: 3px;
  margin-left: 10px;
  color: ${colors.greyText};
  font-size: 8px;
`;

const Separator = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${colors.borderThin};
  margin-top: 20px;
`;

function SectorCompanyPost({
  id,
  company,
  file,
  title,
  totalCompanyPostLikes,
  totalCompanyPostComments,
  createdAt,
}) {
  const { width, height } = useWindowDimensions();

  const date = new window.Date(parseInt(createdAt));

  const time = timeForToday(date);

  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: company.user.id,
      username: company.user.username,
    });
  };

  const goToPostDetail = () => {
    navigation.navigate("CompanyPostListDetail", {
      id,
    });
  };

  return (
    <Container>
      <HeaderContainer>
        <Header onPress={goToProfile}>
          <UserAvatar
            username={company.user.username}
            uri={company.user.avatarUrl}
          />
        </Header>
        <Text>{company.companyName}</Text>
        <Text>{company.addressStep1}</Text>
        <Text>{company.addressStep2}</Text>
        <Text>{company.addressStep3}</Text>
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
        <Title>{title}</Title>
      </Contents>
      <LikeComment>
        <Likes>
          {totalCompanyPostLikes > 1
            ? `${totalCompanyPostLikes} likes`
            : `${totalCompanyPostLikes} like`}
        </Likes>
        <Comments>
          {totalCompanyPostComments > 1
            ? `${totalCompanyPostComments} comments`
            : `${totalCompanyPostComments} comment`}
        </Comments>
      </LikeComment>
      <Date>{time}</Date>
      <Separator />
    </Container>
  );
}

export default React.memo(SectorCompanyPost);
