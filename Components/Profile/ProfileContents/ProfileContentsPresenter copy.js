import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: 1px red solid;
`;

const AvatarView = styled.TouchableOpacity`
  /* margin-right: 10px;
  border-radius: 50px;
  border: 0.5px solid ${colors.avatarBorder}; */
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;

const ColumnContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px blue solid;
`;
const Column = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
`;

const Number = styled.Text`
  font-weight: bold;
`;

const Section = styled.Text``;

const SubHeader = styled.View``;

const Bio = styled.Text`
  margin-top: 10px;
  align-self: flex-start;
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

const ProfileBtn = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.backgroundColor ? colors.buttonBackground : "white"};
  padding: 15px 7px;
  border-radius: 3px;
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.backgroundColor ? colors.buttonBackground : colors.borderThick};
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
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [
    {
      // Simplest usage.
      url: data?.avatarUrl,
      // width: 200,
      // height: 200,
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {},
    },
  ];

  const getButton = (data) => {
    const { isMe, isFollowing } = data;
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
        {data?.avatarUrl ? (
          <>
            <AvatarView onPress={() => setIsModalOpen(true)}>
              <Avatar resizeMode="cover" source={{ uri: data?.avatarUrl }} />
            </AvatarView>
            <Modal visible={isModalOpen} transparent={true}>
              <ImageViewer
                imageUrls={images}
                saveToLocalByLongPress={false}
                enableImageZoom={true}
                renderHeader={() => (
                  <TouchableOpacity
                    style={{
                      zIndex: 3,
                      position: "absolute",
                      top: 50,
                      left: 10,
                    }}
                    onPress={() => setIsModalOpen(false)}
                  >
                    <Ionicons name="close-outline" size={35} color="white" />
                  </TouchableOpacity>
                )}
              />
            </Modal>
          </>
        ) : (
          <AvatarView>
            <Avatar
              resizeMode="cover"
              source={require("../../../assets/blankProfile.png")}
            />
          </AvatarView>
        )}
        <ColumnContainer>
          <Column onPress={goToUserPost}>
            <Number>{data?.totalUserPosts}</Number>
            <Section lng={i18n.language}>
              {i18n.language === "en" && data?.totalUserPosts > 1
                ? `${t("profile.1")}s`
                : t("profile.1")}
            </Section>
          </Column>
          {data?.myCompany ? (
            <Column onPress={goToCompanyPost}>
              <Number>{data?.totalCompanyPosts}</Number>
              <Section lng={i18n.language}>
                {i18n.language === "en" && data?.totalCompanyPosts > 1
                  ? `${t("profile.2")}s`
                  : t("profile.2")}
              </Section>
            </Column>
          ) : null}
          <Column onPress={goToFollowing}>
            <Number>{data?.totalFollowing}</Number>
            <Section lng={i18n.language}>{t("profile.3")}</Section>
          </Column>
          <Column onPress={goToFollowers}>
            <Number>{data?.totalFollowers}</Number>
            <Section lng={i18n.language}>
              {i18n.language === "en" && data?.totalFollowers > 1
                ? `${t("profile.4")}s`
                : t("profile.4")}
            </Section>
          </Column>
        </ColumnContainer>
      </Header>
      {data?.bio ? <Bio>{data?.bio}</Bio> : null}
      <SubHeader></SubHeader>
      {data ? getButton(data) : null}
      <Bottom>
        {data?.myCompany ? (
          <>
            <CompanyTitle>Company Info</CompanyTitle>
            <CompanyName>{data?.myCompany?.companyName}</CompanyName>
            <AboutUs>{data?.myCompany?.aboutUs}</AboutUs>
            <Address>
              {`${data?.myCompany?.addressStep3}, ${data?.myCompany?.addressStep2}, ${data?.myCompany?.addressStep1}`}
            </Address>
            <Separator />
            <InfoView>
              <Title>Number of employees</Title>
              <Info>{`${data?.myCompany?.totalEmployees} 명`}</Info>
              <Separator />
              <Title>E-Mail</Title>
              <Info>{data?.myCompany?.email}</Info>
              <Separator />
              <Title>Contact Number</Title>
              <Info>{data?.myCompany?.contactNumber}</Info>
              <Separator />
            </InfoView>
          </>
        ) : null}
      </Bottom>
    </Container>
  );
}
