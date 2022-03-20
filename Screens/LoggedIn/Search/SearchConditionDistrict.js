import React, { useState, useRef, useEffect } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import styled from "styled-components/native";
import { colors } from "../../../Colors";
import SearchSmallDistrict from "../../../Components/Search/SearchSmallDistrict";
import { bigDistrict } from "../../../DistrictList";
import PostFormButton from "../../../Components/Post/PostFormButton";
import { ScreenNames } from "../../../Constant";

const Container = styled.View`
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
    props.focus ? colors.backgraound : colors.greyBackround};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const ButtonText = styled.Text`
  color: ${(props) => (props.focus ? colors.black : colors.greyText)};
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  padding: 15px 2px 15px 2px;
`;

export default function SearchConditionDistrict({ route: { params } }) {
  const navigation = useNavigation();

  const ref = useRef(null);
  useScrollToTop(ref);
  const [districtCode, setDistrictCode] = useState(0);

  const changeDistrictCode = (index) => {
    setDistrictCode(index);
  };

  const goToCompanyPostForm = () => {
    return navigation.navigate("CompanyPostUploadForm", {
      screenName: ScreenNames.SEARCH_DISTRICT,
    });
  };

  useEffect(() => {
    if (params?.fromWhere === ScreenNames.SEARCH_DISTRICT) {
      // navigation.navigate("UserPostListDetail", {
      //   id: params?.id,
      // });
    }
  }, [params]);

  return (
    <>
      <Container>
        <FirstScrollView ref={ref} showsVerticalScrollIndicator={false}>
          {bigDistrict.map((item, index) => (
            <Button
              focus={districtCode === index ? true : false}
              onPress={() => changeDistrictCode(index)}
              key={index}
            >
              <ButtonText focus={districtCode === index ? true : false}>
                {item.value}
              </ButtonText>
            </Button>
          ))}
        </FirstScrollView>
        <SecondScrollView showsVerticalScrollIndicator={false}>
          <SearchSmallDistrict districtCode={districtCode} />
        </SecondScrollView>
      </Container>
      <PostFormButton onPress={goToCompanyPostForm} />
    </>
  );
}
