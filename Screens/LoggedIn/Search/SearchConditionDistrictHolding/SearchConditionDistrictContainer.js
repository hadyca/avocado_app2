import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { ScreenNames } from "../../../../Constant";
import useMe from "../../../../Hooks/useMe";
import { POST_QUERY } from "./SearchConditionDistrictQueries";
import SearchConditionDistrictPresenter from "./SearchConditionDistrictPresenter";
import ScreenLayout from "../../../../Components/ScreenLayout";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const { data: userData } = useMe();

  const [companyOwner, setCompanyOwner] = useState(false);
  const [districtCode, setDistrictCode] = useState(0);
  // const [addressStep1, setAddressStep1] = useState();

  const { data, loading } = useQuery(POST_QUERY);

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
      navigation.navigate("CompanyPostListDetail", {
        id: params?.id,
      });
    }
  }, [params]);

  useEffect(() => {
    if (userData?.me?.myCompany?.id) {
      setCompanyOwner(true);
    }
  }, [userData]);

  // useEffect(() => {
  //   const CompanyPosts = data?.seeAllCompanyPosts;
  //   if (CompanyPosts) {
  //     const address = CompanyPosts.reduce((acc, cur) => {
  //       const key = cur.company.addressStep1;
  //       return {
  //         ...acc,
  //         [key]: (acc[key] || 0) + 1,
  //       };
  //     }, {});
  //     setAddressStep1(address);
  //   } else {
  //     return;
  //   }
  // }, [data]);
  return (
    <ScreenLayout loading={loading}>
      <SearchConditionDistrictPresenter
        changeDistrictCode={changeDistrictCode}
        districtCode={districtCode}
        companyOwner={companyOwner}
        goToCompanyPostForm={goToCompanyPostForm}
        // addressStep1={addressStep1}
      />
    </ScreenLayout>
  );
}
