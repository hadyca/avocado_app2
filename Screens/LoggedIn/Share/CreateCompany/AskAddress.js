import React, { useState, useRef } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "react-native-autocomplete-input";
import SearchableDropdown from "react-native-searchable-dropdown";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { bigDistrict } from "../../../../DistrictList";
import styled from "styled-components/native";
import AuthLayout from "../../../../Components/Auth/AuthLayout";
import { Subtitle } from "../../../../Components/Auth/Subtitle";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";

export default function AskAddress({ route: { params } }) {
  const searchRef = useRef(null);
  const dropdownController = useRef(null);

  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const { height } = useWindowDimensions;

  const goToAboutUs = () => {
    // const { companyName } = getValues();
    // navigation.navigate("AskAboutUs", {
    //   companyName,
    // });
  };

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        onSelectItem={setSelectedItem}
        dataSet={[
          { id: "1", title: "Alpha" },
          { id: "2", title: "Beta" },
          { id: "3", title: "Gamma" },
          { id: "4", title: "haha" },
          { id: "5", title: "haha21" },
          { id: "6", title: "haha344" },
        ]}
        textInputProps={{
          placeholder: "Type 3+ letters",
        }}
      />
    </View>
  );
}
