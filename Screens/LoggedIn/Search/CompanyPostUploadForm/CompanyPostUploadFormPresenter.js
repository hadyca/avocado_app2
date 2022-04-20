import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import { colors } from "../../../../Colors";
import ContentInput from "../../../../Components/Post/ContentInput";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";
import { TextInput } from "../../../../Components/Auth/AuthShared";
import { time } from "../../../../Constant";
import { typeOfWage } from "../../../../Constant";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.backgraound};
`;

const HeaderRightText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const PictureContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const Title = styled.Text`
  font-weight: bold;
`;
const Opt = styled.Text`
  font-weight: bold;
  color: ${colors.greyText};
`;
const PictureSub = styled.Text`
  margin-bottom: 5px;
  color: ${colors.greyText};
`;

const ImageTop = styled.View`
  margin: 10px 10px 0px 10px;
`;

const ImageScroll = styled.ScrollView``;
const InputBottom = styled.View`
  margin: 0px 10px 10px 10px;
`;
const ImagePick = styled.TouchableOpacity`
  margin: 10px 20px 10px 0px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${colors.borderThick};
`;
const CameraText = styled.Text`
  color: #868b94;
`;

const ImageContainer = styled.View`
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;

const DeleteBtn = styled.TouchableOpacity`
  border-radius: 15px;
  position: absolute;
  top: 3px;
  right: -5px;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
`;

const DayContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Day = styled.TouchableOpacity`
  background-color: ${(props) => (props.selected ? "red" : "white")};
  border-radius: 12.5px;
  border: 0.5px solid ${colors.borderThick};
  width: 40px;
  height: 40px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

const DayText = styled.Text`
  font-weight: bold;
`;

const TimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px red solid;
  width: 40%;
`;

const TextInputTime = styled.TextInput`
  background-color: white;
  color: black;
`;

export default function CompanyPostUploadFormPresenter({
  goToImageSelect,
  DeleteImg,
  countPhoto,
  photo,
  loading,
  uploadCompanyPostMutation,
}) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [mon, setMon] = useState(true);
  const [tue, setTue] = useState(true);
  const [wed, setWed] = useState(true);
  const [thu, setThu] = useState(true);
  const [fri, setFri] = useState(true);
  const [sat, setSat] = useState(true);
  const [sun, setSun] = useState(false);
  const [dayOption, setDayOption] = useState(false);
  const [startTime, setStartTime] = useState({ label: "09:00", value: 540 });
  const [finishTime, setFinishTime] = useState({ label: "18:00", value: 1080 });
  const [timeOption, setTimeOption] = useState(false);
  const [wageType, setWageType] = useState("월급");

  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const onValid = async ({ title, content }) => {
    const fileUrl = await photo.map((_, index) => {
      return new ReactNativeFile({
        uri: photo[index].uri,
        name: `${index}.jpg`,
        type: "image/jpeg",
      });
    });
    if (!loading) {
      uploadCompanyPostMutation({
        variables: {
          fileUrl,
          title,
          mon,
          tue,
          wed,
          thu,
          fri,
          sat,
          sun,
          dayOption,
          startTime: parseInt(startTime.value),
          finishTime: parseInt(finishTime.value),
          timeOption,
          content,
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
  }, [
    photo,
    loading,
    formState.isValid,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    sun,
    dayOption,
    startTime,
    finishTime,
    timeOption,
  ]);

  return (
    <Container>
      <ImageTop>
        <PictureContainer>
          <Title>사진 </Title>
          <Opt>(선택)</Opt>
        </PictureContainer>
        <PictureSub>
          구인글에 사진이 있으면 더 많은 사람들이 확인해요.
        </PictureSub>
        <ImageScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          <ImagePick onPress={goToImageSelect}>
            <Ionicons name={"camera"} color={"#868B94"} size={30} />
            <CameraText>{`${countPhoto} / 5`}</CameraText>
          </ImagePick>
          {photo.length > 0
            ? photo.map((item, index) => {
                return (
                  <ImageContainer key={index}>
                    <Image
                      source={{ uri: item.uri }}
                      style={{ height: 60, width: 60 }}
                    />
                    <DeleteBtn onPress={() => DeleteImg(index)}>
                      <AntDesign name="closecircle" size={16} color="black" />
                    </DeleteBtn>
                  </ImageContainer>
                );
              })
            : null}
        </ImageScroll>
      </ImageTop>
      <InputBottom>
        <Title>제목</Title>
        <Controller
          name="title"
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="공고 내용을 요약해서 적어주세요."
              autoCapitalize="none"
              maxLength={500}
              multiline={false}
              returnKeyType="next"
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
        <Title>근무 요일</Title>
        <DayContainer>
          <Day selected={mon} onPress={() => setMon(!mon)}>
            <DayText>월</DayText>
          </Day>
          <Day selected={tue} onPress={() => setTue(!tue)}>
            <DayText>화</DayText>
          </Day>
          <Day selected={wed} onPress={() => setWed(!wed)}>
            <DayText>수</DayText>
          </Day>
          <Day selected={thu} onPress={() => setThu(!thu)}>
            <DayText>목</DayText>
          </Day>
          <Day selected={fri} onPress={() => setFri(!fri)}>
            <DayText>금</DayText>
          </Day>
          <Day selected={sat} onPress={() => setSat(!sat)}>
            <DayText>토</DayText>
          </Day>
          <Day selected={sun} onPress={() => setSun(!sun)}>
            <DayText>일</DayText>
          </Day>
        </DayContainer>
        <Title>근무 시간</Title>
        <Title>시작</Title>
        <ModalSelector
          data={time}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.label}
          accessible={true}
          onChange={(item) => {
            setStartTime({ label: item.label, value: item.value });
          }}
          optionContainerStyle={{ height: 500 }}
        >
          <TimeContainer>
            <TextInputTime value={startTime.label} />
            <Ionicons name="chevron-forward" color="black" size={17} />
          </TimeContainer>
        </ModalSelector>
        <Title>~</Title>
        <ModalSelector
          data={time}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.label}
          accessible={true}
          onChange={(item) => {
            setFinishTime({ label: item.label, value: item.value });
          }}
          optionContainerStyle={{ height: 500 }}
        >
          <TimeContainer>
            <TextInputTime value={finishTime.label} />
            <Ionicons name="chevron-forward" color="black" size={17} />
          </TimeContainer>
        </ModalSelector>
        <Title>임금</Title>
        <ModalSelector
          data={typeOfWage}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.value}
          accessible={true}
          onChange={(item) => {
            setWageType(item.value);
          }}
          optionContainerStyle={{ height: 180 }}
        >
          <TimeContainer>
            <TextInputTime value={wageType} />
            <Ionicons name="chevron-forward" color="black" size={17} />
          </TimeContainer>
        </ModalSelector>
        <Title>세부 내용</Title>
        <Controller
          name="content"
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ContentInput
              multiline={true}
              textAlignVertical={"top"}
              maxLength={1000}
              autoCapitalize="none"
              onChangeText={(text) => onChange(text)}
              value={value || ""}
            />
          )}
        />
      </InputBottom>
    </Container>
  );
}
