import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { ScreenNames } from "../../../../Constant";
import { COMPANYPOST_QUERY } from "./CompanyPostByDistrictQueries";
import CompanyPostByDistrictPresenter from "./CompanyPostByDistrictPresenter";
import DistrictCompanyPost from "../../../../Components/Post/DistrictCompanyPost ";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(COMPANYPOST_QUERY, {
    variables: {
      category: params.addressStep2,
      offset: 0,
    },
  });
  const { width, height } = useWindowDimensions();

  const renderPost = ({ item }) => {
    if (item.deleted === false) {
      return <DistrictCompanyPost {...item} />;
    } else {
      return null;
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleFetch = async () => {
    if (loading) {
      return;
    } else {
      setFetchLoading(true);
      await fetchMore({
        variables: {
          offset: data?.seeCompanyPostByDistrict?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const goToCompanyPostForm = () => {
    return navigation.navigate("CompanyPostUploadForm", {
      screenName: ScreenNames.COMPANY_POST_BY_DISTRICT,
    });
  };

  // useEffect(() => {
  //   if (params?.fromWhere === ScreenNames.CATEGORY_BOARD) {
  //     refetch();
  //     navigation.navigate("CompanyPostListDetail", {
  //       id: params?.id,
  //     });
  //   } else {
  //     refetch();
  //   }
  // }, [params]);
  console.log(data);
  return (
    <ScreenLayout loading={loading}>
      <CompanyPostByDistrictPresenter
        width={width}
        height={height}
        goToCompanyPostForm={goToCompanyPostForm}
        handleFetch={handleFetch}
        refreshing={refreshing}
        refresh={refresh}
        data={data}
        renderPost={renderPost}
        fetchLoading={fetchLoading}
      />
    </ScreenLayout>
  );
}
