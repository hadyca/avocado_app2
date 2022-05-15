import React, { useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import styled from "styled-components/native";
import PostFormButton from "../../../../Components/Post/PostFormButton";

const FetchView = styled.View`
  bottom: 30px;
`;
export default function CompanyPostAllPresenter({
  goToCompanyPostForm,
  handleFetch,
  refreshing,
  refresh,
  data,
  renderPost,
  fetchLoading,
  companyOwner,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View>
            <Text>Hello!</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </TouchableOpacity>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={handleFetch}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeAllCompanyPosts}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderPost}
      />
      {fetchLoading ? (
        <FetchView>
          <ActivityIndicator color="black" />
        </FetchView>
      ) : null}
      {companyOwner ? <PostFormButton onPress={goToCompanyPostForm} /> : null}
    </>
  );
}
