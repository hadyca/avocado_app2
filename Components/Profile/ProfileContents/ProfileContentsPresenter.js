import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { colors } from "../../../Colors";

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

const Posts = styled.Text``;
const JobPosts = styled.Text``;

const Following = styled.Text``;

const Followers = styled.Text``;

const SubHeader = styled.View``;

const Username = styled.Text``;

const CompanyName = styled.Text``;

const Bio = styled.Text``;

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

const Bottom = styled.View``;

export default function ProfileContentsPresenter({
  data,
  toggleFollowingMutation,
}) {
  const getButton = (seeProfile) => {
    const { isMe, isFollowing, myCompany } = seeProfile;
    if (isMe) {
      return (
        <ProfileBtn backgroundColor={true}>
          <ProfileText backgroundColor={true}>Edit Profile</ProfileText>
        </ProfileBtn>
      );
    }
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
        <Posts>{data?.seeProfile?.totalUserPosts} Posts</Posts>
        <JobPosts>{data?.seeProfile?.totalCompanyPosts} Job Posts</JobPosts>
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
      <Bottom>
        <Text>기업 소개</Text>
        <Text>Company name : {data?.seeProfile?.myCompany?.companyName} </Text>
        <Text>
          Address : {data?.seeProfile?.myCompany?.addressStep3},
          {data?.seeProfile?.myCompany?.addressStep2},
          {data?.seeProfile?.myCompany?.addressStep1}
        </Text>
        <Text>Email: {data?.seeProfile?.myCompany?.email}</Text>
        <Text>Sector: {data?.seeProfile?.myCompany?.sector}</Text>
        <Text>About us : {data?.seeProfile?.myCompany?.aboutUs}</Text>
        <Text>
          Contact Number : {data?.seeProfile?.myCompany?.contactNumber}
        </Text>
        <Text>
          Total Employees : {data?.seeProfile?.myCompany?.totalEmployees}
        </Text>
      </Bottom>
    </Container>
  );
}
