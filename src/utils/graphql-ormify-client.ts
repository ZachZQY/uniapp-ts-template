import { HasuraGraphqlClient } from "graphql-ormify-client";
import type {
  RequestListener,
  GraphQLClientConfig,
  RequestLifecycle,
} from "graphql-ormify-client";
import { projectConfig } from "@/project-config";

// 单例模式：避免重复实例化
let clientInstance: HasuraGraphqlClient | null = null;

// 初始化函数
function initializeHasuraClient(): HasuraGraphqlClient {
  if (clientInstance) {
    return clientInstance; // 如果已存在，直接返回
  }

  // 创建新实例
  clientInstance = new HasuraGraphqlClient(
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
  clientInstance.addListener(requestListener);

  // 挂载到全局对象（避免重复挂载）
  if (typeof window !== 'undefined' && !(window as any).hasuraClient) {
    (window as any).hasuraClient = clientInstance;
  }

  if (typeof globalThis !== 'undefined' && !(globalThis as any).hasuraClient) {
    (globalThis as any).hasuraClient = clientInstance;
  }

  return clientInstance;
}

// 获取实例（懒加载）
export function getHasuraClient(): HasuraGraphqlClient {
  return initializeHasuraClient();
}

// 导出实例（兼容原有代码）
export const hasuraClient = initializeHasuraClient();
export default hasuraClient;