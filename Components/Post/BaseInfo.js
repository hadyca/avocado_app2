import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const BaseDataContainer = styled.View``;

export default function BaseInfo({
  wageType,
  wage,
  workingDay,
  dayOption,
  startTime,
  finishTime,
  timeOption,
}) {
  const [dayArray, setDayArray] = useState([]);

  useEffect(() => {
    let newAry = [];
    workingDay.monday && newAry.push("월");
    workingDay.tuesday && newAry.push("화");
    workingDay.wednesday && newAry.push("수");
    workingDay.thursday && newAry.push("목");
    workingDay.friday && newAry.push("금");
    workingDay.saturday && newAry.push("토");
    workingDay.sunday && newAry.push("일");
    setDayArray(newAry);
  }, []);

  return (
    <BaseDataContainer>
      <FontAwesome name="money" size={18} color="black" />
      <Text>
        {wageType}
        {wage}
      </Text>
      <FontAwesome name="calendar" size={18} color="black" />
      {workingDay.monday &&
      workingDay.tuesday &&
      workingDay.wednesday &&
      workingDay.thursday &&
      workingDay.friday &&
      workingDay.saturday &&
      workingDay.sunday ? (
        <Text>월~일</Text>
      ) : workingDay.monday &&
        workingDay.tuesday &&
        workingDay.wednesday &&
        workingDay.thursday &&
        workingDay.friday &&
        workingDay.saturday ? (
        <Text>월~토</Text>
      ) : workingDay.monday &&
        workingDay.tuesday &&
        workingDay.wednesday &&
        workingDay.thursday &&
        workingDay.friday ? (
        <Text>월~금</Text>
      ) : null}
      {dayArray.map((item, index) => {
        if (index === 0) {
          return <Text key={index}>{item}</Text>;
        } else {
          return <Text key={index}>,{item}</Text>;
        }
      })}
      <Text> {dayOption && "협의"}</Text>
      <MaterialIcons name="schedule" size={18} color="black" />
      <Text>
        {startTime} ~ {finishTime} {timeOption}
      </Text>
    </BaseDataContainer>
  );
}
