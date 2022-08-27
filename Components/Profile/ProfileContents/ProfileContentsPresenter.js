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

const AvatarView = styled.View`
  margin-right: 10px;
  border-radius: 50px;
  border: 0.5px solid ${colors.avatarBorder};
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;

const Column = styled.TouchableOpacity`
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

const CompanyTitle = styled.Text`
  margin: 20px 0px 20px 0px;
  font-size: 24px;
  font-weight: bold;
`;

const CompanyName = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

const AboutUs = styled.Text`
  margin-top: 5px;
`;

const Address = styled.Text`
  margin-bottom: 10px;
  font-size: 12px;
`;

const InfoView = styled.View``;

const Title = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Info = styled.Text`
  margin-top: 5px;
  margin-bottom: 10px;
  color: ${colors.greyText};
`;

const CompanyInfo = styled.View``;

const ProfileBtn = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.backgroundColor ? colors.blue : "white"};
  padding: 15px 7px;
  border-radius: 3px;
  width: 100%;
  border: 1px solid
    ${(props) => (props.backgroundColor ? colors.blue : colors.borderThick)};
`;

const ProfileText = styled.Text`
  color: ${(props) => (props.backgroundColor ? "white" : "black")};
  font-weight: 600;
  text-align: center;
`;

export default function ProfileContentsPresenter({
  data,
  goToUserPost,
  goToCompanyPost,
  goToFollowing,
  goToFollowers,
  toggleFollowingMutation,
  goToEditProfile,
}) {
  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
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
        {data?.seeProfile?.avatarUrl ? (
          <AvatarView>
            <Avatar
              resizeMode="cover"
              source={{ uri: data?.seeProfile?.avatarUrl }}
            />
          </AvatarView>
        ) : (
          <AvatarView>
            <Avatar
              resizeMode="cover"
              source={require("../../../assets/blankProfile.png")}
            />
          </AvatarView>
        )}
        <Column onPress={goToUserPost}>
          <Number>{data?.seeProfile?.totalUserPosts}</Number>
          <Section>
            {data?.seeProfile?.totalUserPosts > 1 ? "Posts" : "Post"}
          </Section>
        </Column>
        {data?.seeProfile?.myCompany ? (
          <Column onPress={goToCompanyPost}>
            <Number>{data?.seeProfile?.totalCompanyPosts}</Number>
            <Section>
              {data?.seeProfile?.totalCompanyPosts > 1
                ? "Job Posts"
                : "Job Post"}
            </Section>
          </Column>
        ) : null}
        <Column onPress={goToFollowing}>
          <Number>{data?.seeProfile?.totalFollowing}</Number>
          <Section>Following</Section>
        </Column>
        <Column onPress={goToFollowers}>
          <Number>{data?.seeProfile?.totalFollowers}</Number>
          <Section>
            {data?.seeProfile?.totalFollowers > 1 ? "Followers" : "Follower"}
          </Section>
        </Column>
      </Header>
      <SubHeader>
        <Bio>{data?.seeProfile?.bio}</Bio>
      </SubHeader>
      {data?.seeProfile ? getButton(data?.seeProfile) : null}
      <Bottom>
        {data?.seeProfile?.myCompany ? (
          <>
            <CompanyTitle>Company Info</CompanyTitle>
            <CompanyName>
              {data?.seeProfile?.myCompany?.companyName}
            </CompanyName>
            <AboutUs>{data?.seeProfile?.myCompany?.aboutUs}</AboutUs>
            <Address>
              {`${data?.seeProfile?.myCompany?.addressStep3}, ${data?.seeProfile?.myCompany?.addressStep2}, ${data?.seeProfile?.myCompany?.addressStep1}`}
            </Address>
            <Separator />
            <InfoView>
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
