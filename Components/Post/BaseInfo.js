import React from "react";
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
  return (
    <BaseDataContainer>
      <FontAwesome name="money" size={18} color="black" />
      <Text>
        {wageType}
        {wage}
      </Text>
      <FontAwesome name="calendar" size={18} color="black" />
      <Text>
        {workingDay.monday &&
        workingDay.tuesday &&
        workingDay.wednesday &&
        workingDay.thursday &&
        workingDay.friday &&
        workingDay.saturday &&
        workingDay.sunday
          ? "월~일"
          : workingDay.monday &&
            workingDay.tuesday &&
            workingDay.wednesday &&
            workingDay.thursday &&
            workingDay.friday &&
            workingDay.saturday
          ? "월~토"
          : workingDay.monday &&
            workingDay.tuesday &&
            workingDay.wednesday &&
            workingDay.thursday &&
            workingDay.friday
          ? "월~금"
          : null}
      </Text>
      <Text> {dayOption && "협의"}</Text>
      <MaterialIcons name="schedule" size={18} color="black" />
      <Text>
        {startTime} ~ {finishTime} {timeOption}
      </Text>
    </BaseDataContainer>
  );
}
