import React from "react";
import styled from "styled-components/native";
import { colors } from "../../../Colors";

const Container = styled.View`
  margin: 10px;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
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

const Bio = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Bottom = styled.View`
  margin-top: 10px;
`;

const CompanyName = styled.Text`
  font-weight: bold;
  font-size: 28px;
`;

const AboutUs = styled.Text`
  margin-top: 5px;
`;

const Address = styled.Text`
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 13px;
`;

const InfoView = styled.View``;

const Title = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const Info = styled.Text`
  margin-top: 5px;
  margin-bottom: 10px;
  color: ${colors.greyText};
`;

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

export default function ProfileContentsPresenter({
  data,
  toggleFollowingMutation,
  goToEditProfile,
}) {
  const getButton = (seeProfile) => {
    const { isMe, isFollowing, myCompany } = seeProfile;
    if (isMe) {
      return (
        <ProfileBtn backgroundColor={true} onPress={goToEditProfile}>
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
        <Bio>{data?.seeProfile?.bio}</Bio>
      </SubHeader>
      {data?.seeProfile ? getButton(data.seeProfile) : null}
      <Bottom>
        {data?.seeProfile?.myCompany ? (
          <>
            <CompanyName>
              {data?.seeProfile?.myCompany?.companyName}
            </CompanyName>
            <AboutUs>{data?.seeProfile?.myCompany?.aboutUs}</AboutUs>
            <Address>
              {`${data?.seeProfile?.myCompany?.addressStep3}, ${data?.seeProfile?.myCompany?.addressStep2}, ${data?.seeProfile?.myCompany?.addressStep1}`}
            </Address>
            <Separator />
            <InfoView>
              <Title>Sector</Title>
              <Info>{data?.seeProfile?.myCompany?.sector}</Info>
              <Separator />
              <Title>Number of employees</Title>
              <Info>{`${data?.seeProfile?.myCompany?.totalEmployees} 명`}</Info>
              <Separator />
              <Title>E-Mail</Title>
              <Info>{data?.seeProfile?.myCompany?.email}</Info>
              <Separator />
              <Title>Contact Number</Title>
              <Info>{data?.seeProfile?.myCompany?.contactNumber}</Info>
              <Separator />
            </InfoView>
          </>
        ) : null}
      </Bottom>
    </Container>
  );
}
