import React, { useState, useEffect } from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ReactNativeFile } from "apollo-upload-client";
import ModalSelector from "react-native-modal-selector";
import { colors } from "../../../../Colors";
import { sectors } from "../../../../Constant";

const HeaderRightText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const Container = styled.View`
  margin: 20px;
`;

const Top = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const AvatarView = styled.View`
  border-radius: 50px;
  border: 0.5px solid ${colors.avatarBorder};
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;

const Background = styled.View`
  position: absolute;
  background-color: black;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  opacity: 0.5;
`;

const ChangePhoto = styled.Text`
  text-align: center;
  margin-top: 10px;
`;

const Bottom = styled.View`
  margin-top: 50px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;

const ButtonName = styled.Text``;

const ButtonTextView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  margin-right: 5px;
`;

const AddBio = styled.Text`
  color: ${colors.greyText};
`;

const CompanyTitle = styled.Text`
  margin: 20px 0px 10px 0px;
  font-size: 16px;
  font-weight: bold;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
`;

export default function EditProfilePresenter({
  editAvatarMutation,
  editSectorMutation,
  goToSelectAvatar,
  goToEditUsername,
  goToEditBio,
  goToEditCompanyName,
  goToEditAboutUs,
  goToEditTotalEmployees,
  goToEditCompanyEmail,
  goToEditContactNumber,
  goToEditAddress,
  isEdited,
  avatarUrl,
  username,
  bio,
  myCompany,
  loading,
  companyLoading,
  skiphandle,
}) {
  const [selectedSector, setSelectedSector] = useState(myCompany?.sector);
  const address = `${myCompany?.addressStep3}, ${myCompany?.addressStep2}, ${myCompany?.addressStep1}`;

  const navigation = useNavigation();

  const goToEditAvatar = async () => {
    if (!isEdited && selectedSector === myCompany?.sector) {
      navigation.pop();
    }
    if (isEdited && selectedSector === myCompany?.sector) {
      const newAvatar = new ReactNativeFile({
        uri: avatarUrl,
        name: `1.jpg`,
        type: "image/jpeg",
      });
      if (!companyLoading) {
        editAvatarMutation({
          variables: {
            avatarUrl: newAvatar,
          },
        });
      }
    }
    if (!isEdited && selectedSector !== myCompany?.sector) {
      if (!loading) {
        editSectorMutation({
          variables: {
            sector: selectedSector,
          },
        });
      }
    }
    if (isEdited && selectedSector !== myCompany?.sector) {
      await skiphandle();
      const newAvatar = new ReactNativeFile({
        uri: avatarUrl,
        name: `1.jpg`,
        type: "image/jpeg",
      });
      if (!loading && !companyLoading) {
        await editAvatarMutation({
          variables: {
            avatarUrl: newAvatar,
          },
        });
        await editSectorMutation({
          variables: {
            sector: selectedSector,
          },
        });
      }
    }
  };

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={goToEditAvatar}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText>Done</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight:
        loading || companyLoading ? HeaderRightLoading : OkHeaderRight,
    });
  }, [loading, companyLoading, avatarUrl, isEdited, selectedSector]);

  return (
    <Container>
      <Top onPress={goToSelectAvatar}>
        {avatarUrl ? (
          <AvatarView>
            <Avatar resizeMode="cover" source={{ uri: avatarUrl }} />
          </AvatarView>
        ) : (
          <AvatarView>
            <Avatar
              resizeMode="cover"
              source={require("../../../../assets/blankProfile.png")}
            />
          </AvatarView>
        )}
        <Background />
        <Ionicons
          name={"camera-outline"}
          color={"white"}
          size={30}
          style={{ position: "absolute" }}
        />
      </Top>
      <TouchableOpacity onPress={goToSelectAvatar}>
        <ChangePhoto>Edit Avatar</ChangePhoto>
      </TouchableOpacity>
      <Bottom>
        <Button onPress={goToEditUsername}>
          <ButtonName>Username</ButtonName>
          <ButtonTextView>
            <ButtonText>{username}</ButtonText>
            <Ionicons name="chevron-forward" color="black" size={17} />
          </ButtonTextView>
        </Button>
        <Button onPress={goToEditBio}>
          <ButtonName>Bio</ButtonName>
          <ButtonTextView>
            {!bio ? (
              <AddBio>Add bio to profile</AddBio>
            ) : bio.length >= 20 ? (
              <ButtonText>{`${bio.substr(0, 20)}...`}</ButtonText>
            ) : (
              <ButtonText>{bio}</ButtonText>
            )}
            <Ionicons name="chevron-forward" color="black" size={17} />
          </ButtonTextView>
        </Button>
        <Separator />
        {myCompany ? (
          <>
            <CompanyTitle>Company Information</CompanyTitle>
            <Button onPress={goToEditCompanyName}>
              <ButtonName>Company</ButtonName>
              <ButtonTextView>
                <ButtonText>
                  {myCompany?.companyName.length >= 20 ? (
                    <ButtonText>{`${myCompany?.companyName.substr(
                      0,
                      20
                    )}...`}</ButtonText>
                  ) : (
                    <ButtonText>{myCompany?.companyName}</ButtonText>
                  )}
                </ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <Button onPress={goToEditAboutUs}>
              <ButtonName>About Us</ButtonName>
              <ButtonTextView>
                <ButtonText>
                  {myCompany?.aboutUs.length >= 20 ? (
                    <ButtonText>{`${myCompany?.aboutUs.substr(
                      0,
                      20
                    )}...`}</ButtonText>
                  ) : (
                    <ButtonText>{myCompany?.aboutUs}</ButtonText>
                  )}
                </ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <ModalSelector
              data={sectors}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.value}
              accessible={true}
              onChange={(item) => {
                setSelectedSector(item.value);
              }}
              // cancelText={"Cancel"}
              optionContainerStyle={{ height: 500 }}
            >
              <Button>
                <ButtonName>Sector</ButtonName>
                <ButtonTextView>
                  <ButtonText>{selectedSector}</ButtonText>
                  <Ionicons name="chevron-forward" color="black" size={17} />
                </ButtonTextView>
              </Button>
            </ModalSelector>
            <Button onPress={goToEditTotalEmployees}>
              <ButtonName>Total Employees</ButtonName>
              <ButtonTextView>
                <ButtonText>{`${myCompany?.totalEmployees} 명`}</ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <Button onPress={goToEditCompanyEmail}>
              <ButtonName>Email</ButtonName>
              <ButtonTextView>
                <ButtonText>
                  {myCompany?.email.length >= 20 ? (
                    <ButtonText>{`${myCompany?.email.substr(
                      0,
                      20
                    )}...`}</ButtonText>
                  ) : (
                    <ButtonText>{myCompany?.email}</ButtonText>
                  )}
                </ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <Button onPress={goToEditContactNumber}>
              <ButtonName>Contact Number</ButtonName>
              <ButtonTextView>
                <ButtonText>{myCompany?.contactNumber}</ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <Button onPress={goToEditAddress}>
              <ButtonName>Address</ButtonName>
              <ButtonTextView>
                {address.length >= 30 ? (
                  <ButtonText>{`${address.substr(0, 30)}...`}</ButtonText>
                ) : (
                  <ButtonText>{address}</ButtonText>
                )}
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
          </>
        ) : null}
      </Bottom>
    </Container>
  );
}
