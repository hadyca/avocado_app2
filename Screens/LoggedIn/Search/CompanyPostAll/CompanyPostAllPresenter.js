import React, { useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  Modal,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import styled from "styled-components/native";
import PostFormButton from "../../../../Components/Post/PostFormButton";
import { colors } from "../../../../Colors";
import { bigDistrict, smallDistrict } from "../../../../DistrictList";

const FetchView = styled.View`
  bottom: 30px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: blue;
  margin-top: 100px;
`;

const ModalView = styled.View`
  background-color: orange;
  width: 100%;
  height: 98%;
`;

const DistrictContainer = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${colors.backgraound};
`;

const FirstScrollView = styled.ScrollView`
  flex: 0.3;
`;

const SecondScrollView = styled.ScrollView`
  flex: 0.7;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.selected ? colors.backgraound : colors.greyBackround};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const ButtonText = styled.Text`
  color: ${(props) => (props.selected ? colors.black : colors.greyText)};
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  padding: 15px 2px 15px 2px;
`;

const ListContainer = styled.View`
  flex-direction: row;
`;

const DistrictSet = styled.View`
  flex-direction: row;
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
  getData,
  FData,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [districtCode, setDistrictCode] = useState();
  const [vnAll, setVnAll] = useState(false);
  const [allVisible, setAllVisible] = useState(false);
  const [list, setList] = useState([]);
  // const [addressStep1_1, setAddressStep1_1] = useState("");

  const existAddress2 = list.some((el) => el.id === districtCode);
  const existAll = list.some((el) => el.id === districtCode + 100);

  const toggleAddressAll = (value) => {
    if (list.some((el) => el.id === districtCode + 100)) {
      setList(list.filter((el) => el.id !== districtCode + 100));
    } else {
      setList([...list, { id: districtCode + 100, value: value }]);
    }
  };

  const toggleAddress2 = (value) => {
    if (list.some((el) => el.value === value)) {
      setList(list.filter((el) => el.value !== value));
    } else {
      setList([...list, { id: districtCode, value: value }]);
    }
  };

  const handleSubmit = () => {
    if (vnAll) {
      refresh();
    }
    if (list.length > 0) {
      getData({ variables: { addressStep1_1: "Hồ Chí Minh" } });
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalContainer>
          <ModalView>
            <DistrictContainer>
              <FirstScrollView showsVerticalScrollIndicator={false}>
                <Button
                  selected={districtCode === 0 ? true : false}
                  onPress={() => {
                    if (vnAll) {
                      setVnAll(false);
                      setDistrictCode();
                      setAllVisible(false);
                    } else {
                      setVnAll(true);
                      setDistrictCode(0);
                      setAllVisible(false);
                      setList([]);
                    }
                  }}
                >
                  <ButtonText>전체</ButtonText>
                </Button>
                {bigDistrict.map((item, index) => (
                  <Button
                    selected={districtCode === item.id ? true : false}
                    onPress={() => {
                      setDistrictCode(item.id);
                      setAllVisible(true);
                    }}
                    key={index}
                  >
                    <ButtonText
                      selected={districtCode === item.id ? true : false}
                    >
                      {item.value}
                    </ButtonText>
                  </Button>
                ))}
              </FirstScrollView>
              <SecondScrollView showsVerticalScrollIndicator={false}>
                <View>
                  {allVisible === true ? (
                    <Button
                      onPress={() => {
                        const newDistrict = bigDistrict.filter(
                          (i) => i.id === districtCode
                        );
                        if (existAddress2) {
                          for (let i = 0; i < list.length; i++) {
                            if (list[i].id === districtCode) {
                              list.splice(i, 1);
                              i--;
                            }
                          }
                          setList([
                            ...list,
                            {
                              id: districtCode + 100,
                              value: `${newDistrict[0].value} 전체`,
                            },
                          ]);
                        } else {
                          setVnAll(false);
                          toggleAddressAll(`${newDistrict[0].value} 전체`);
                        }
                      }}
                    >
                      <ButtonText>전체</ButtonText>
                    </Button>
                  ) : null}
                  {districtCode > 0
                    ? smallDistrict[districtCode].map((item, index) => (
                        <Button
                          key={item.id}
                          onPress={() => {
                            if (existAll) {
                              for (let i = 0; i < list.length; i++) {
                                if (list[i].id === districtCode + 100) {
                                  list.splice(i, 1);
                                  i--;
                                }
                              }
                              setList([
                                ...list,
                                { id: districtCode, value: item.value },
                              ]);
                            } else {
                              toggleAddress2(item.value);
                              setVnAll(false);
                            }
                          }}
                        >
                          <ButtonText key={index}>{item.value}</ButtonText>
                        </Button>
                      ))
                    : null}
                </View>
              </SecondScrollView>
            </DistrictContainer>
            <ListContainer>
              {vnAll ? (
                <DistrictSet>
                  <Text>VN전체</Text>
                  <TouchableOpacity onPress={() => setVnAll(false)}>
                    <Text>X</Text>
                  </TouchableOpacity>
                </DistrictSet>
              ) : null}
              {list.map((item, index) => (
                <DistrictSet key={index}>
                  <Text>{item.value}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      setList(list.filter((el) => el.value !== item.value))
                    }
                  >
                    <Text> X </Text>
                  </TouchableOpacity>
                </DistrictSet>
              ))}
            </ListContainer>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text>닫기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                handleSubmit();
              }}
            >
              <Text>확인</Text>
            </TouchableOpacity>
          </ModalView>
        </ModalContainer>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>지역 검색</Text>
      </TouchableOpacity>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={handleFetch}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data}
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
