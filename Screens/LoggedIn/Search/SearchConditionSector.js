import React, { useRef, useEffect, useState } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import PostFormButton from "../../../Components/Post/PostFormButton";
import { ScreenNames, sectors } from "../../../Constant";
import useMe from "../../../Hooks/useMe";

const Container = styled.ScrollView``;

const Row = styled.View`
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Contents = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100px;
  border: 1px;
`;

const WorkLogo = styled.Image`
  height: 80px;
  width: 50px;
`;

export default function SearchConditionSector({ route: { params } }) {
  const navigation = useNavigation();
  const { data } = useMe();
  const ref = useRef(null);
  useScrollToTop(ref);

  const [companyOwner, setCompanyOwner] = useState(false);

  const goToCompanyPostList = (sector) => {
    navigation.navigate("CompanyPostBySector", {
      sector,
    });
  };

  const goToCompanyPostForm = () => {
    return navigation.navigate("CompanyPostUploadForm", {
      screenName: ScreenNames.SEARCH_SECTOR,
    });
  };

  useEffect(() => {
    if (params?.fromWhere === ScreenNames.SEARCH_SECTOR) {
      navigation.navigate("CompanyPostListDetail", {
        id: params?.id,
      });
    }
  }, [params]);

  useEffect(() => {
    if (data?.me?.myCompany?.id) {
      setCompanyOwner(true);
    }
  }, [data]);

  return (
    <>
      <Container ref={ref}>
        <Row>
          {sectors.map((item, index) => (
            <Contents
              key={index}
              onPress={() => goToCompanyPostList(item.value)}
            >
              <WorkLogo
                source={require("../../../assets/coffee.png")}
                resizeMode="contain"
              />
              <Text>{item.value}</Text>
            </Contents>
          ))}
        </Row>
      </Container>
      {companyOwner ? <PostFormButton onPress={goToCompanyPostForm} /> : null}
    </>
  );
}
