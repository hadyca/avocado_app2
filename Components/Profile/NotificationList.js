import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Colors";
import { timeForToday } from "../../Utils";

const Container = styled.TouchableOpacity`
  margin: 10px;
`;

const TopContainer = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Type = styled.Text`
  font-size: 13px;
  color: ${colors.buttonBackground};
`;
const AvatarView = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Avatar = styled.Image`
  width: 43px;
  height: 43px;
  border-radius: 30px;
`;
const ContentText = styled.Text`
  flex-shrink: 1;
  color: ${colors.black};
`;

const Date = styled.Text`
  color: ${colors.greyText};
  font-size: 12px;
`;

const Separator = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${colors.borderThin};
`;

function NotificationList({ id, user, content, createdAt, type, postId }) {
  const time = timeForToday(parseInt(createdAt));

  const navigation = useNavigation();

  const goToPostDetail = (type) => {
    if (type === "userPost") {
      navigation.navigate("UserPostListDetail", {
        id: postId,
      });
    } else if (type === "companyPost") {
      navigation.navigate("CompanyPostListDetail", {
        id: postId,
      });
    }
  };

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
      username: user.username,
    });
  };

  return (
    <>
      <Container onPress={() => goToPostDetail(type)}>
        <TopContainer>
          {type === "userPost" ? (
            <Type>일반</Type>
          ) : type === "companyPost" ? (
            <Type>채용</Type>
          ) : (
            <Type>공지</Type>
          )}
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
          <ContentText>
            {user.username}
            {content}
          </ContentText>
        </BottomContainer>
      </Container>
      <Separator />
    </>
  );
}

export default React.memo(NotificationList);
