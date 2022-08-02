import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";
import { time } from "../../Constant";
import { colors } from "../../Colors";

const BaseDataContainer = styled.View`
  margin-top: 10px;
`;

const DataContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 5px;
`;

const BaseText = styled.Text`
  color: ${colors.greyText};
  margin-left: 5px;
`;

export default function BaseInfo({
  wageType,
  wage,
  workingDay,
  dayOption,
  startTime,
  finishTime,
  timeOption,
  contactNumber,
  email,
}) {
  const [commaWage, setCommaWage] = useState();
  const [dayArray, setDayArray] = useState([]);
  const [start, setStart] = useState();
  const [finish, setFinish] = useState();

  useEffect(() => {
    let newAry = [];
    workingDay.mon && newAry.push("월");
    workingDay.tue && newAry.push("화");
    workingDay.wed && newAry.push("수");
    workingDay.thu && newAry.push("목");
    workingDay.fri && newAry.push("금");
    workingDay.sat && newAry.push("토");
    workingDay.sun && newAry.push("일");
    setDayArray(newAry);
  }, []);

  useEffect(() => {
    const startTimeTrans = time.filter((item) => item.value === startTime);
    setStart(startTimeTrans[0].label);

    const finishTimeTrans = time.filter((item) => item.value === finishTime);
    setFinish(finishTimeTrans[0].label);
  }, []);

  useEffect(() => {
    const commaTrans = wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setCommaWage(commaTrans);
  }, []);

  return (
    <BaseDataContainer>
      <DataContainer>
        <FontAwesome
          name="money"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        <BaseText>{wageType}</BaseText>
        <BaseText>₫ {commaWage}</BaseText>
      </DataContainer>
      <DataContainer>
        <FontAwesome
          name="calendar"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        {workingDay.mon &&
        workingDay.tue &&
        workingDay.wed &&
        workingDay.thu &&
        workingDay.fri &&
        workingDay.sat &&
        workingDay.sun ? (
          <BaseText>월~일</BaseText>
        ) : workingDay.mon &&
          workingDay.tue &&
          workingDay.wed &&
          workingDay.thu &&
          workingDay.fri &&
          workingDay.sat ? (
          <BaseText>월~토</BaseText>
        ) : workingDay.mon &&
          workingDay.tue &&
          workingDay.wed &&
          workingDay.thu &&
          workingDay.fri ? (
          <BaseText>월~금</BaseText>
        ) : (
          dayArray.map((item, index) => {
            if (index === 0) {
              return <BaseText key={index}>{item}</BaseText>;
            } else {
              return <BaseText key={index}>{item}</BaseText>;
            }
          })
        )}
        {dayOption ? <BaseText>협의</BaseText> : null}
      </DataContainer>
      <DataContainer>
        <MaterialIcons
          name="schedule"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        <BaseText>
          {start}~{finish}
        </BaseText>
        {timeOption ? <BaseText>협의</BaseText> : null}
      </DataContainer>
      <DataContainer>
        <Entypo
          name="mobile"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        <BaseText>{contactNumber}</BaseText>
      </DataContainer>
      <DataContainer>
        <MaterialIcons
          name="email"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        <BaseText>{email}</BaseText>
      </DataContainer>
    </BaseDataContainer>
  );
}
