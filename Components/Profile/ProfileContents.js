import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Colors";

const Container = styled.View`
  margin: 10px;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Following = styled.Text``;

const Followers = styled.Text``;

const SubHeader = styled.View``;

const Username = styled.Text``;

const CompanyName = styled.Text``;

const Bio = styled.Text``;

const ProfileBtn = styled.TouchableOpacity`
  background-color: ${colors.buttonBackground};
  padding: 15px 7px;
  border-radius: 3px;
  width: 100%;
`;

const ProfileText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export default function ProfileContents({ data }) {
  const navigation = useNavigation();

  const toggleFollowing = () => {};

  const getButton = (seeProfile) => {
    const { isMe, isFollowing, myCompany } = seeProfile;
    if (isMe) {
      return (
        <ProfileBtn>
          <ProfileText>Edit Profile</ProfileText>
        </ProfileBtn>
      );
    }
    if (isFollowing) {
      return (
        <ProfileBtn onPress={toggleFollowing}>
          <ProfileText>UnFollow</ProfileText>
        </ProfileBtn>
      );
    } else {
      return (
        <ProfileBtn onClick={toggleFollowing}>
          <ProfileText>Follow</ProfileText>
        </ProfileBtn>
      );
    }
  };

  return (
    <Container>
      <Header>
        {data?.seeProfile?.avatar ? (
          <Avatar
            resizeMode="cover"
            source={{ uri: data?.seeProfile?.avatar }}
          />
        ) : (
          <Avatar
            resizeMode="cover"
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            }}
          />
        )}
        <Following>{data?.seeProfile?.totalFollowing} Following</Following>
        <Followers>{data?.seeProfile?.totalFollowers} Followers</Followers>
      </Header>
      <SubHeader>
        <Username>user name : {data?.seeProfile?.username}</Username>
        <CompanyName>
          company name : {data?.seeProfile?.myCompany?.companyName}
        </CompanyName>
        <Bio>bio : {data?.seeProfile?.bio}</Bio>
      </SubHeader>
      {data?.seeProfile ? getButton(data.seeProfile) : null}
      {/* <Bottom>
        <UserPost>
          <UserPostText>
           해당 유저 게시글 보러가기
          </UserPostText>
        </UserPost>
        <CompanyPost>
          <UserPostText>
해당 유저 채용글 보러가기            
          </UserPostText>
        </UserPost>
      </Bottom> */}
    </Container>
  );
}
