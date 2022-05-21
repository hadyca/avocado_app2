import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { ScreenNames } from "../../../../Constant";
import {
  COMPANYPOST_QUERY,
  COMPANYPOST_DISTRICT_QUERY,
} from "./CompanyPostAllQueries";
import CompanyPostAllPresenter from "./CompanyPostAllPresenter";
import AllCompanyPost from "../../../../Components/Post/AllCompanyPost";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const { data: userData } = useMe();

  const [companyOwner, setCompanyOwner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const { data, loading, refetch, fetchMore } = useQuery(COMPANYPOST_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const [
    getData,
    {
      data: FData,
      loading: FLoading,
      refetch: FRefetch,
      fetchMore: FFetchMore,
    },
  ] = useLazyQuery(COMPANYPOST_DISTRICT_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const renderPost = ({ item }) => {
    if (item.deleted === false) {
      return <AllCompanyPost {...item} />;
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
          offset: data?.seeAllCompanyPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const goToCompanyPostForm = () => {
    return navigation.navigate("CompanyPostUploadForm", {
      screenName: ScreenNames.COMPANY_POST_ALL,
    });
  };

  useEffect(() => {
    if (params?.fromWhere === ScreenNames.COMPANY_POST_ALL) {
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

  console.log(FData);
  return (
    <ScreenLayout loading={loading}>
      <CompanyPostAllPresenter
        goToCompanyPostForm={goToCompanyPostForm}
        handleFetch={handleFetch}
        refreshing={refreshing}
        refresh={refresh}
        data={data?.seeAllCompanyPosts}
        renderPost={renderPost}
        fetchLoading={fetchLoading}
        companyOwner={companyOwner}
        getData={getData}
        FData={FData}
      />
    </ScreenLayout>
  );
}
