import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { useQuery } from "@apollo/client";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { PROFILE_QUERY } from "./MeQueries";
import MePresenter from "./MePresenter";
import useMe from "../../../../Hooks/useMe";

export default function () {
  const ref = useRef(null);
  useScrollToTop(ref);
  const { data: userData, loading: userLoading } = useMe();

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(PROFILE_QUERY, {
    skip: userLoading,
    variables: {
      userId: parseInt(userData?.me?.id),
    },
  });

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const goToSetting = () => {
    navigation.navigate("MyProfileSetting", {
      email: userData.me.email,
    });
  };

  const goToReportForm = () => {
    navigation.navigate("UserReportForm", {
      id: params.id,
    });
  };

  let myActionsheet = useRef();
  let myOptionArray = ["설정", "취소"];

  let notMeActionsheet = useRef();
  let notMineOptionArray = ["신고", "취소"];

  const showActionSheet = () => {
    if (data?.seeProfile?.isMe) {
      return myActionsheet.current.show();
    } else {
      return notMeActionsheet.current.show();
    }
  };

  const myHandleIndex = (index) => {
    if (index === 0) {
      goToSetting();
    } else {
      return;
    }
  };

  const notMineHandleIndex = (index) => {
    if (index === 0) {
      goToReportForm();
    } else {
      return;
    }
  };

  const HeaderRight = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        <Ionicons
          name="notifications"
          color="grey"
          size={20}
          style={{ paddingLeft: 10, paddingRight: 5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showActionSheet}>
        <Ionicons
          name="ellipsis-vertical"
          color="grey"
          size={20}
          style={{ paddingLeft: 5, paddingRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    navigation.setOptions({
      title: loading ? "Loading..." : data?.seeProfile?.username,
      headerRight: loading ? null : HeaderRight,
    });
  }, [data]);

  return (
    <ScreenLayout loading={loading || userLoading}>
      <MePresenter refreshing={refreshing} refresh={refresh} data={data} />
      <ActionSheet
        ref={myActionsheet}
        options={myOptionArray}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index) => myHandleIndex(index)}
      />
      <ActionSheet
        ref={notMeActionsheet}
        options={notMineOptionArray}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index) => notMineHandleIndex(index)}
      />
    </ScreenLayout>
  );
}