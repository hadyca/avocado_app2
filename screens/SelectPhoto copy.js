import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgraound};
`;

const HeaderRightText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 1px;
`;
export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      first: 52,
    });
    setPhotos(assets);
    setChosenPhoto(photos[0]?.uri);
  };
  const getIosPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhotos();
    }
  };
  const getAndroidPermissions = async () => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (status === "undetermined" && canAskAgain) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "undetermined") {
        getPhotos();
      }
    } else if (status !== "undetermined") {
      getPhotos();
    } else {
      getAndroidPermissions();
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity>
      <HeaderRightText>Done</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    if (Platform.OS === "ios") {
      getIosPermissions();
    } else {
      getAndroidPermissions();
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);

  const { width } = useWindowDimensions();
  const numColumns = 4;
  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? "blue" : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );

  const handleFetch = async () => {
    console.log("fds");
  };
  return (
    <Container>
      <StatusBar hidden={false} />
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={getPhotos}
        data={photos}
        numColumns={4}
        keyExtractor={(photo) => photo.id}
        renderItem={renderItem}
      />
    </Container>
  );
}
