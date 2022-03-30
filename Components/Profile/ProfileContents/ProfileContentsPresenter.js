import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { colors } from "../../../Colors";

const Container = styled.View`
  margin: 10px;
`;
const Header = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin-right: 10px;
`;

const Column = styled.View`
  justify-content: center;
  align-items: center;
`;

const Number = styled.Text`
  font-weight: bold;
`;

const Section = styled.Text``;

const SubHeader = styled.View``;

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
        <Column>
          <Number>{data?.seeProfile?.totalUserPosts}</Number>
          <Section>
            {data?.seeProfile?.totalUserPosts > 1 ? "Posts" : "Post"}
          </Section>
        </Column>
        {data?.seeProfile?.myCompany ? (
          <Column>
            <Number>{data?.seeProfile?.totalCompanyPosts}</Number>
            <Section>
              {data?.seeProfile?.totalCompanyPosts > 1
                ? "Job Posts"
                : "Job Post"}
            </Section>
          </Column>
        ) : null}
        <Column>
          <Number>{data?.seeProfile?.totalFollowing}</Number>
          <Section>Following</Section>
        </Column>
        <Column>
          <Number>{data?.seeProfile?.totalFollowers}</Number>
          <Section>
            {data?.seeProfile?.totalFollowers > 1 ? "Followers" : "Follower"}
          </Section>
        </Column>
      </Header>
      <SubHeader>
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
