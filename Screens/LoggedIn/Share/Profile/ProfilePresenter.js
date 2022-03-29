import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../Colors";
import ProfileContents from "../../../../Components/Profile/ProfileContents";

export default function ProfilePresenter({
  handleFetch,
  refreshing,
  refresh,
  data,
  postData,
  // renderPost
  fetchLoading,
}) {
  return (
    <>
      <FlatList
        ListHeaderComponent={<ProfileContents data={data} />}
        // onEndReachedThreshold={0.05}
        // onEndReached={handleFetch}
        // refreshing={refreshing}
        // onRefresh={refresh}
        // style={{ width: "100%" }}
        // showsVerticalScrollIndicator={false}
        // data={data?.seeCompanyPostByDistrict}
        // keyExtractor={(item) => "" + item.id}
        // renderItem={renderPost}
      />
      {fetchLoading ? (
        <FetchView>
          <ActivityIndicator color="black" />
        </FetchView>
      ) : null}
    </>
  );
}
