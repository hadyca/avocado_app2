import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import ModalSelector from "react-native-modal-selector";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../Colors";
import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import { UnderBar } from "../../../../Components/Auth/AuthShared";
import { smallDistrict } from "../../../../DistrictList";

const HeaderRightText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const Container = styled.View`
  margin: 10px;
`;
const TextInput = styled.TextInput`
  padding: 15px 7px 0px 3px;
  color: black;
`;

const CountingText = styled.Text`
  color: ${colors.buttonBackground};
  font-size: 11px;
`;

const TextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function EditAddressPresenter({
  editAddressMutation,
  countingText,
  counting,
  bigDistrict,
  loading,
  originAddressStep3,
  add_1,
  add_2,
  handleAdd1,
  handleAdd2,
}) {
  // const [add_1, setAdd_1] = useState({});
  // const [add_2, setAdd_2] = useState(addressStep2);

  const navigation = useNavigation();
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      addressStep3: originAddressStep3,
    },
    mode: "onChange",
  });

  const onValid = async ({ addressStep3 }) => {
    if (!loading) {
      editAddressMutation({
        variables: {
          addressStep1: add_1?.value,
          addressStep2: add_2,
          addressStep3: addressStep3,
        },
      });
    }
  };
  const NoHeaderRight = () => (
    <TouchableOpacity disabled={true} style={{ marginRight: 10, opacity: 0.5 }}>
      <HeaderRightText>Done</HeaderRightText>
    </TouchableOpacity>
  );

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={handleSubmit(onValid)}
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
      headerRight: loading
        ? HeaderRightLoading
        : !formState.isValid
        ? NoHeaderRight
        : OkHeaderRight,
    });
  }, [loading, formState.isValid, add_1, add_2]);

  return (
    <DismissKeyboard>
      <Container>
        <ModalSelector
          data={bigDistrict}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.value}
          accessible={true}
          onChange={(item) => {
            handleAdd1(item.id, item.value);
          }}
          optionContainerStyle={{ height: 500 }}
        >
          <TextView>
            <TextInput value={add_1?.value} />
            <Ionicons
              name="chevron-forward"
              color="black"
              size={17}
              style={{ paddingTop: 15 }}
            />
          </TextView>
        </ModalSelector>
        <ModalSelector
          data={smallDistrict[add_1?.id]}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.value}
          accessible={true}
          onChange={(item) => {
            handleAdd2(item.value);
          }}
          optionContainerStyle={{ height: 500 }}
        >
          <TextView>
            <TextInput placeholder={"Select your second city!"} value={add_2} />
            <Ionicons
              name="chevron-forward"
              color="black"
              size={17}
              style={{ paddingTop: 15 }}
            />
          </TextView>
        </ModalSelector>
        <Controller
          name="addressStep3"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="01 C??ng x?? Paris, B???n Ngh??"
              maxLength={100}
              autoCapitalize="none"
              returnKeyType="done"
              onChangeText={(text) => {
                onChange(text);
                countingText(text);
              }}
              value={value}
            />
          )}
        />
        <UnderBar />
        <CountingText>({counting}/100)</CountingText>
      </Container>
    </DismissKeyboard>
  );
}
