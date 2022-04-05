import React, { useEffect } from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ReactNativeFile } from "apollo-upload-client";
import { colors } from "../../../../Colors";

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
  margin-bottom: 10px;
`;

const AddBio = styled.Text`
  color: ${colors.greyText};
`;

export default function EditProfilePresenter({
  editAvatarMutation,
  goToSelectAvatar,
  goToEditUsername,
  goToEditBio,
  avatarUrl,
  username,
  bio,
  loading,
}) {
  const navigation = useNavigation();

  const goToEditAvatar = () => {
    if (avatarUrl === "") {
      navigation.pop();
    } else {
      const newAvatar = new ReactNativeFile({
        uri: avatarUrl,
        name: `1.jpg`,
        type: "image/jpeg",
      });
      if (!loading) {
        editAvatarMutation({
          variables: {
            avatarUrl: newAvatar,
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
      headerRight: loading ? HeaderRightLoading : OkHeaderRight,
    });
  }, [loading, avatarUrl]);

  return (
    <Container>
      <Top onPress={goToSelectAvatar}>
        {avatarUrl ? (
          <Avatar resizeMode="cover" source={{ uri: avatarUrl }} />
        ) : (
          <Avatar
            resizeMode="cover"
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            }}
          />
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
            ) : bio.length >= 10 ? (
              <ButtonText>{`${bio.substr(0, 10)}...`}</ButtonText>
            ) : (
              <ButtonText>{bio}</ButtonText>
            )}
            <Ionicons name="chevron-forward" color="black" size={17} />
          </ButtonTextView>
        </Button>
      </Bottom>
    </Container>
  );
}

// {
//   content.length >= 20 ? (
//     <Content>
//       <ContentText>{content.substr(0, 20)}</ContentText>
//       <MoreText>...more</MoreText>
//     </Content>
//   ) : (
//     <Content>
//       <ContentText>{content}</ContentText>
//     </Content>
//   );
// }
