import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";

export default function SelectPhoto() {
  const [ok, setOk] = useState(false);
  const navigation = useNavigation();

  const getIosPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
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
  const getHeaderLoader = () => (
    <ActivityIndicator size="small" color={"#0580FF"} />
  );
  const imagesCallback = (callback) => {
    navigation.setOptions({
      headerRight: () => getHeaderLoader(),
    });

    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: "image/jpg",
          });
        }
        navigation.navigate("Main", { photos: cPhotos });
      })
      .catch((e) => console.log(e));
  };

  const processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };
  const renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity title={"Done"} onPress={onSubmit}>
        <Text onPress={onSubmit}>Done</Text>
      </TouchableOpacity>
    );
  };
  const updateHandler = (count, onSubmit) => {
    navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => renderDoneButton(count, onSubmit),
    });
  };
  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );
  return (
    <View styles={{ flex: 1 }}>
      <ImageBrowser
        max={4}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: "relative",
  },
  emptyStay: {
    textAlign: "center",
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff",
  },
});
