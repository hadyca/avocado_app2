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
  const [isInit, setIsInit] = useState(true);
  const [isAllPost, setIsAllPost] = useState(true);
  const [existPost, setExistPost] = useState(true);
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
      setIsInit(false);
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
    onCompleted: ({ seeCompanyPostByDistrict }) => {
      setIsInit(false);
      setIsAllPost(false);
      const checkPost = seeCompanyPostByDistrict.some(
        (el) => el.deleted === false
      );
      if (checkPost) {
        setExistPost(true);
      } else {
        setExistPost(false);
      }
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

  return (
    <ScreenLayout loading={loading || FLoading || AllLoading}>
      <CompanyPostAllPresenter
        goToCompanyPostForm={goToCompanyPostForm}
        handleFetch={handleFetch}
        AllHandleFetch={AllHandleFetch}
        FHandleFetch={FHandleFetch}
        refreshing={refreshing}
        refresh={refresh}
        AllRefresh={AllRefresh}
        FRefresh={FRefresh}
        data={data?.seeAllCompanyPosts}
        AllData={AllData?.seeAllCompanyPosts}
        FData={FData?.seeCompanyPostByDistrict}
        renderPost={renderPost}
        fetchLoading={fetchLoading}
        getAllData={getAllData}
        getData={getData}
        isInit={isInit}
        isAllPost={isAllPost}
        existPost={existPost}
        companyOwner={companyOwner}
      />
    </ScreenLayout>
  );
}
