import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, NetworkStatus } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { ScreenNames } from "../../../../Constant";
import {
  COMPANYPOST_QUERY,
  COMPANYPOST_DISTRICT_QUERY,
} from "./CompanyPostAllQueries";
import CompanyPostAllPresenter from "./CompanyPostAllPresenter";
import CompanyPost from "../../../../Components/Post/CompanyPost";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const { data: userData } = useMe();

  const [companyOwner, setCompanyOwner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [initData, setInitData] = useState(true);
  const [isAllPost, setIsAllPost] = useState(true);
  const { data, loading, refetch, fetchMore } = useQuery(COMPANYPOST_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const [
    getAllData,
    {
      data: AllData,
      loading: AllLoading,
      refetch: AllRefetch,
      fetchMore: AllFetchMore,
    },
  ] = useLazyQuery(COMPANYPOST_QUERY, {
    variables: {
      offset: 0,
    },
    onCompleted: () => {
      setInitData(false);
      setIsAllPost(true);
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
    onCompleted: () => {
      setInitData(false);
      setIsAllPost(false);
    },
  });

  const renderPost = ({ item }) => {
    if (item.deleted === false) {
      return <CompanyPost {...item} />;
    } else {
      return null;
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const FRefresh = async () => {
    setRefreshing(true);
    await FRefetch();
    setRefreshing(false);
  };

  const AllRefresh = async () => {
    setRefreshing(true);
    await AllRefetch();
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

  const FHandleFetch = async () => {
    if (FLoading) {
      return;
    } else {
      setFetchLoading(true);
      await FFetchMore({
        variables: {
          offset: FData?.seeCompanyPostByDistrict?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const AllHandleFetch = async () => {
    if (FLoading) {
      return;
    } else {
      setFetchLoading(true);
      await AllFetchMore({
        variables: {
          offset: AllData?.seeAllCompanyPosts?.length,
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

  console.log(
    FData?.seeCompanyPostByDistrict?.some((el) => el.deleted === false)
  );
  return (
    <ScreenLayout loading={loading || FLoading || AllLoading}>
      <CompanyPostAllPresenter
        goToCompanyPostForm={goToCompanyPostForm}
        handleFetch={handleFetch}
        FHandleFetch={FHandleFetch}
        AllHandleFetch={AllHandleFetch}
        refreshing={refreshing}
        refresh={refresh}
        FRefresh={FRefresh}
        AllRefresh={AllRefresh}
        data={data?.seeAllCompanyPosts}
        FData={FData?.seeCompanyPostByDistrict}
        AllData={AllData?.seeAllCompanyPosts}
        renderPost={renderPost}
        fetchLoading={fetchLoading}
        companyOwner={companyOwner}
        getData={getData}
        getAllData={getAllData}
        initData={initData}
        isAllPost={isAllPost}
      />
    </ScreenLayout>
  );
}
