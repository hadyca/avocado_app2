import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { AssetsSelector } from "expo-images-picker";

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

export default function SelectPhoto() {
  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false,
      initialLoad: 100,
      assetsType: ["photo"],
      minSelection: 1,
      maxSelection: 3,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );
  const widgetErrors = useMemo(
    () => ({
      errorTextColor: polar_text_2,
      errorMessages: {
        hasErrorWithPermissions: translator(T.ERROR.HAS_PERMISSIONS_ERROR),
        hasErrorWithLoading: translator(T.ERROR.HAS_INTERNAL_ERROR),
        hasErrorWithResizing: translator(T.ERROR.HAS_INTERNAL_ERROR),
        hasNoAssets: translator(T.ERROR.HAS_NO_ASSETS),
      },
    }),
    []
  );
  return (
    <Container>
      <AssetsSelector
        Settings={widgetSettings}
        Errors={widgetErrors}
        Styles={widgetStyles}
        // Resize={widgetResize} // optional
        // Navigator={widgetNavigator} // optional
        // CustomNavigator={{
        //   // optional
        //   Component: CustomNavigator,
        //   props: {
        //     backFunction: true,
        //     onSuccess,
        //     text: T.ACTIONS.SELECT,
        //   },
        // }}
      />
    </Container>
  );
}
