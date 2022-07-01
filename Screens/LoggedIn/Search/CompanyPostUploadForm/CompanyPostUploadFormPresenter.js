import React, { useEffect, useState, useRef } from "react";
import { Image, NativeModules, Platform } from "react-native";
import styled from "styled-components/native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import NumberFormat from "react-number-format";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../../../Colors";
import { ReactNativeFile } from "apollo-upload-client";
import { time } from "../../../../Constant";
import { typeOfWage } from "../../../../Constant";
import FormError from "../../../../Components/Auth/FormError";
import AuthButton from "../../../../Components/Auth/AuthButton";

const Container = styled.ScrollView`
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

const PictureTitle = styled.Text`
  font-weight: bold;
`;

const Title = styled.Text`
  font-weight: bold;
  margin: 40px 0px 20px 0px;
`;

const TitleInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? colors.error
        : props.focus
        ? colors.focus
        : colors.borderThick};
`;

const Opt = styled.Text`
  font-weight: bold;
  color: ${colors.greyText};
`;
const PictureSub = styled.Text`
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
  margin: 10px 20px 0px 0px;
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
  background-color: ${(props) =>
    props.selected ? colors.buttonBackground : "white"};
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
  color: ${(props) => (props.selected ? "white" : "black")};
`;

const TimeTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ModalContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Time = styled.Text`
  width: 45%;
`;

const ModalView = styled.View`
  width: 45%;
  border: 1px solid ${colors.borderThick};
  border-radius: 4px;
`;

const TimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectBox = styled.TextInput`
  color: black;
  padding: 10px;
`;

const Wave = styled.Text`
  width: 10%;
  text-align: center;
`;

const CheckContainer = styled.View`
  margin-top: 15px;
  margin-left: -5px;
  flex-direction: row;
  align-items: center;
`;

const CheckText = styled.Text`
  margin-left: 5px;
`;

const WageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const WageInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 50%;
  border-radius: 4px;
  padding: 10px;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? colors.error
        : props.focus
        ? colors.focus
        : colors.borderThick};
`;

const WageInput = styled.TextInput`
  width: 100%;
  margin-left: 13px;
`;

const Dong = styled.Text`
  position: absolute;
  left: 0px;
  margin-left: 10px;
`;

const ContentInput = styled.TextInput`
  background-color: white;
  height: 300px;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? colors.error
        : props.focus
        ? colors.focus
        : colors.borderThick};
`;

const SubmitContainer = styled.View`
  justify-content: center;
  margin: 10px auto 20px;
  width: 90%;
  border-top-width: 1px;
  border-top-color: ${colors.borderThin};
  border-style: solid;
`;

export default function CompanyPostUploadFormPresenter({
  goToImageSelect,
  DeleteImg,
  countPhoto,
  photo,
  loading,
  uploadCompanyPostMutation,
  userData,
}) {
  let ref = useRef();
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
  const [wageNum, setWageNum] = useState();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { StatusBarManager } = NativeModules;
  console.log(userData);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      contactNumber: userData?.me?.myCompany?.contactNumber,
      email: userData?.me?.myCompany?.email,
    },
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
          wageType,
          wage: wageNum,
          content,
        },
      });
    }
  };

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  useEffect(() => {
    if (!mon && !tue && !wed && !thu && !fri && !sat && !sun) {
      setError("day", { message: "최소 1개 이상 요일을 넣어주세요." });
    }
  }, [mon, tue, wed, thu, fri, sat, sun]);

  // useEffect(()=>{
  //   if(form)

  // }, [])

  return (
    <>
      <Container ref={ref}>
        <KeyboardAwareScrollView extraScrollHeight={50}>
          <ImageTop>
            <PictureContainer>
              <PictureTitle>사진 </PictureTitle>
              <Opt>(선택)</Opt>
            </PictureContainer>
            <PictureSub>
              구인글에 사진이 있으면 더 많은 사람들이 확인해요.
            </PictureSub>
            <ImageScroll
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
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
                          <AntDesign
                            name="closecircle"
                            size={16}
                            color="black"
                          />
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
                required: "제목을 넣어주세요.",
              }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TitleInput
                  placeholder="공고 내용을 요약해서 적어주세요."
                  autoCapitalize="none"
                  maxLength={100}
                  multiline={false}
                  returnKeyType="next"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  hasError={Boolean(errors?.title)}
                />
              )}
            />
            <FormError message={errors?.title?.message} />
            <Title>연락처</Title>
            <Controller
              name="contactNumber"
              rules={{
                required: "연락처를 넣어주세요.",
              }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TitleInput
                  placeholder={"0103323232"}
                  autoCapitalize="none"
                  returnKeyType="done"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="number-pad"
                  maxLength={17}
                />
              )}
            />
            {/* <FormError message={errors?.title?.message} /> */}
            <Title>이메일</Title>
            <Controller
              name="email"
              rules={{
                required: "이메일을 넣어주세요.",
              }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TitleInput
                  placeholder="abc@gamil.com"
                  autoCapitalize="none"
                  maxLength={100}
                  multiline={false}
                  returnKeyType="next"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  hasError={Boolean(errors?.email)}
                />
              )}
            />
            <Title>근무 요일</Title>
            <DayContainer>
              <Day
                selected={mon}
                onPress={() => {
                  setMon(!mon);
                  clearErrors("day");
                }}
              >
                <DayText selected={mon}>월</DayText>
              </Day>
              <Day
                selected={tue}
                onPress={() => {
                  setTue(!tue);
                  clearErrors("day");
                }}
              >
                <DayText selected={tue}>화</DayText>
              </Day>
              <Day
                selected={wed}
                onPress={() => {
                  setWed(!wed);
                  clearErrors("day");
                }}
              >
                <DayText selected={wed}>수</DayText>
              </Day>
              <Day
                selected={thu}
                onPress={() => {
                  setThu(!thu);
                  clearErrors("day");
                }}
              >
                <DayText selected={thu}>목</DayText>
              </Day>
              <Day
                selected={fri}
                onPress={() => {
                  setFri(!fri);
                  clearErrors("day");
                }}
              >
                <DayText selected={fri}>금</DayText>
              </Day>
              <Day
                selected={sat}
                onPress={() => {
                  setSat(!sat);
                  clearErrors("day");
                }}
              >
                <DayText selected={sat}>토</DayText>
              </Day>
              <Day
                selected={sun}
                onPress={() => {
                  setSun(!sun);
                  clearErrors("day");
                }}
              >
                <DayText selected={sun}>일</DayText>
              </Day>
            </DayContainer>
            <FormError message={errors?.day?.message} />

            <CheckContainer>
              <Checkbox
                value={dayOption}
                onValueChange={setDayOption}
                color={dayOption ? colors.buttonBackground : colors.borderThick}
              />
              <CheckText>협의 가능</CheckText>
            </CheckContainer>
            <Title>근무 시간</Title>
            <TimeTextContainer>
              <Time>시작</Time>
              <Time>종료</Time>
            </TimeTextContainer>
            <ModalContainer>
              <ModalView>
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
                    <SelectBox value={startTime.label} />
                    <Ionicons
                      name="chevron-forward"
                      color="black"
                      size={17}
                      style={{ marginRight: 10 }}
                    />
                  </TimeContainer>
                </ModalSelector>
              </ModalView>
              <Wave>~</Wave>
              <ModalView>
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
                    <SelectBox value={finishTime.label} />
                    <Ionicons
                      name="chevron-forward"
                      color="black"
                      size={17}
                      style={{ marginRight: 10 }}
                    />
                  </TimeContainer>
                </ModalSelector>
              </ModalView>
            </ModalContainer>
            <CheckContainer>
              <Checkbox
                value={timeOption}
                onValueChange={setTimeOption}
                color={
                  timeOption ? colors.buttonBackground : colors.borderThick
                }
              />
              <CheckText>협의 가능</CheckText>
            </CheckContainer>
            <Title>임금</Title>
            <WageContainer>
              <ModalView>
                <ModalSelector
                  data={typeOfWage}
                  keyExtractor={(item) => item.id}
                  labelExtractor={(item) => item.value}
                  accessible={true}
                  onChange={(item) => {
                    setWageType(item.value);
                  }}
                  // optionContainerStyle={{ height: 180 }}
                >
                  <TimeContainer>
                    <SelectBox value={wageType} />
                    <Ionicons
                      name="chevron-forward"
                      color="black"
                      size={17}
                      style={{ marginRight: 10 }}
                    />
                  </TimeContainer>
                </ModalSelector>
              </ModalView>
              <Controller
                name="wage"
                rules={{
                  required: "임금정보를 넣어주세요.",
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumberFormat
                    value={value}
                    displayType={"text"}
                    thousandSeparator={true}
                    onValueChange={(values) => {
                      const { value } = values;
                      setWageNum(value);
                    }}
                    renderText={(value) => (
                      <WageInputContainer hasError={Boolean(errors?.wage)}>
                        <WageInput
                          autoCapitalize="none"
                          returnKeyType="done"
                          onChangeText={onChange}
                          value={value}
                          keyboardType="number-pad"
                          maxLength={17}
                        />
                        <Dong>₫</Dong>
                      </WageInputContainer>
                    )}
                  />
                )}
              />
            </WageContainer>
            <FormError message={errors?.wage?.message} />
            <Title>세부 내용</Title>
            <Controller
              name="content"
              rules={{
                required: "구인글 내용을 넣어주세요.",
              }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <ContentInput
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical={"top"}
                  maxLength={1000}
                  autoCapitalize="none"
                  onChangeText={(text) => onChange(text)}
                  value={value || ""}
                  placeholder={
                    "예) 업무 예시, 사내 복지, 근무 여건, 지원자가 갖추어야 할 능력, 우대 사항 등"
                  }
                  hasError={Boolean(errors?.content)}
                />
              )}
            />
            <FormError message={errors?.content?.message} />
          </InputBottom>
        </KeyboardAwareScrollView>
      </Container>
      <SubmitContainer>
        <AuthButton
          text={"작성 완료"}
          onPress={handleSubmit(onValid)}
          loading={loading}
        />
      </SubmitContainer>
    </>
  );
}
