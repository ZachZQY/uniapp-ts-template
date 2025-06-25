import { HasuraGraphqlClient } from "graphql-ormify-client";
import type {
  RequestListener,
  GraphQLClientConfig,
  RequestLifecycle,
} from "graphql-ormify-client";
import { projectConfig } from "@/project-config";

// 初始化
const hasuraClient = new HasuraGraphqlClient(
  projectConfig.graphqlOrmifyClient as GraphQLClientConfig
);

// 定义监听
const requestListener: RequestListener = {
  onRequest: (info: RequestLifecycle) => {
    console.log("request", info);
  },
  onResponse: (info: RequestLifecycle) => {
    console.log("response", info);
  },
};
// 触发监听
hasuraClient.addListener(requestListener);

export { hasuraClient };
