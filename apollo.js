import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);

export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};

// const uploadHttpLink = createUploadLink({
//   uri: "http://localhost:4000/graphql",
// });
// for web

const uploadHttpLink = createUploadLink({
  uri: "http://10.0.2.2:4000/graphql",
});
// for simulator

// const uploadHttpLink = createUploadLink({
//   uri: "http://b0c3-182-160-125-147.ngrok.io/graphql",
// });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeAllUserPosts: offsetLimitPagination(),
        seeUserCategoryPost: offsetLimitPagination(["category"]),
        seeCompanyPostByDistrict: offsetLimitPagination(["addressStep2"]),
        seeCompanyPostBySector: offsetLimitPagination(["sector"]),
        seeFavoritePosts: offsetLimitPagination(),
        seeUserAllPosts: offsetLimitPagination(["userId"]),
        seeCompanyAllPosts: offsetLimitPagination(["companyId"]),
        seeFollowing: offsetLimitPagination(["userId"]),
        seeFollowers: offsetLimitPagination(["userId"]),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});
export default client;
