import React, { useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  Modal,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
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
  flex: 0.45;
`;

const SecondScrollView = styled.ScrollView`
  flex: 0.55;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.selected ? colors.orangeBackground : colors.backgraound};
  width: 100%;
`;

const BtnTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${(props) =>
    props.selected ? colors.buttonBackground : colors.greyText};
  font-size: 15px;
  margin-left: 10px;
  padding: 15px 2px 15px 2px;
  font-weight: ${(props) => (props.isAll ? "bold" : 600)};
`;

const CheckView = styled.View`
  position: absolute;
  right: 20px;
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
  const [list, setList] = useState([]); //화면 출력용 (전체 + 2번째 지역 list)

  const existAddress2 = list.some((el) => el.id === districtCode);
  const existAll = list.some((el) => el.id === districtCode + 100);
  const isAddress2 = (value) => list.some((el) => el.value === value);

  const toggleAddress2 = (value) => {
    if (isAddress2(value)) {
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
      const BigList = list.filter((el) => el.id > 100);
      const smallList = list.filter((el) => el.id < 100);
      getData({
        variables: {
          addressStep1_1: BigList[0]?.value,
          addressStep1_2: BigList[1]?.value,
          addressStep1_3: BigList[2]?.value,
          addressStep1_4: BigList[3]?.value,
          addressStep1_5: BigList[4]?.value,
          addressStep2_1: smallList[0]?.value,
          addressStep2_2: smallList[1]?.value,
          addressStep2_3: smallList[2]?.value,
          addressStep2_4: smallList[3]?.value,
          addressStep2_5: smallList[4]?.value,
        },
      });
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
                  <BtnTextContainer>
                    <ButtonText selected={vnAll} isAll={true}>
                      전체
                    </ButtonText>
                    {vnAll ? (
                      <CheckView>
                        <Ionicons
                          name="checkmark"
                          size={24}
                          color="#f08450"
                          styles={{ marginLeft: 200 }}
                        />
                      </CheckView>
                    ) : null}
                  </BtnTextContainer>
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
                        if (existAll) {
                          setList(
                            list.filter((el) => el.id !== districtCode + 100)
                          );
                        } else {
                          setList([
                            ...list,
                            {
                              id: districtCode + 100,
                              value: newDistrict[0].value,
                            },
                          ]);
                        }

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
                              value: newDistrict[0].value,
                            },
                          ]);
                        } else {
                          setVnAll(false);
                        }
                      }}
                    >
                      <BtnTextContainer>
                        <ButtonText selected={existAll} isAll={true}>
                          전체
                        </ButtonText>
                        {existAll ? (
                          <CheckView>
                            <Ionicons
                              name="checkmark"
                              size={24}
                              color="#f08450"
                            />
                          </CheckView>
                        ) : null}
                      </BtnTextContainer>
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
                          <BtnTextContainer>
                            <ButtonText
                              key={index}
                              selected={isAddress2(item.value)}
                            >
                              {item.value}
                            </ButtonText>
                            {isAddress2(item.value) ? (
                              <CheckView>
                                <Ionicons
                                  name="checkmark"
                                  size={24}
                                  color="#f08450"
                                />
                              </CheckView>
                            ) : null}
                          </BtnTextContainer>
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
                  {item.id > 100 ? (
                    <Text>{item.value} 전체</Text>
                  ) : (
                    <Text>{item.value}</Text>
                  )}
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
            <Text>{list.length} / 5</Text>
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
