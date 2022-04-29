import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { ScreenNames } from "../../../../Constant";
import { COMPANYPOST_QUERY } from "./CompanyPostBySectorQueries";
import CompanyPostBySectorPresenter from "./CompanyPostBySectorPresenter";
import SectorCompanyPost from "../../../../Components/Post/SectorCompanyPost";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const { data: userData } = useMe();

  const [companyOwner, setCompanyOwner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(COMPANYPOST_QUERY, {
    variables: {
      sector: params.sector,
      offset: 0,
    },
  });

  const renderPost = ({ item }) => {
    if (item.deleted === false) {
      return <SectorCompanyPost {...item} />;
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
          offset: data?.seeCompanyPostBySector?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const goToCompanyPostForm = () => {
    return navigation.navigate("CompanyPostUploadForm", {
      screenName: ScreenNames.COMPANY_POST_BY_SECTOR,
      sector: params.sector,
    });
  };

  useEffect(() => {
    if (params?.fromWhere === ScreenNames.COMPANY_POST_BY_SECTOR) {
      refetch();
      navigation.navigate("CompanyPostListDetail", {
        id: params?.id,
      });
    } else {
      refetch();
    }
  }, [params]);

  useEffect(() => {
    if (userData?.me?.myCompany?.id) {
      setCompanyOwner(true);
    }
  }, [userData]);

  return (
    <ScreenLayout loading={loading}>
      <CompanyPostBySectorPresenter
        goToCompanyPostForm={goToCompanyPostForm}
        handleFetch={handleFetch}
        refreshing={refreshing}
        refresh={refresh}
        data={data}
        renderPost={renderPost}
        fetchLoading={fetchLoading}
        companyOwner={companyOwner}
      />
    </ScreenLayout>
  );
}
