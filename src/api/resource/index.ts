import { hasuraClient } from "@//utils/graphql-ormify-client";
import type { Resources, Resources_Bool_Exp } from "@/types/graphql";

/**
 * 获取资源参数
 * @param category 资源分类
 * @param name 资源名称
 */
export interface GetResourceParams {
  category: string;
  name: string;
}

/**
 * 获取资源
 * @param params 获取资源参数
 * @param params.category 资源分类
 * @param params.name 资源名称
 * @returns 资源
 */
export const getResource = async (
  params: GetResourceParams
): Promise<Resources | null> => {
  const where: Resources_Bool_Exp = {
    category: {
      _eq: params?.category,
    },
    name: {
      _eq: params?.name,
    },
  };
  return (await hasuraClient.data<Resources>({
    table: "resources",
    args: {
      where: where as any,
    },
    data_fields: ["id", "name", "category", "value"],
  })) as Resources | null;
};

/**
 * 请求其他api
 */
export const requestOtherApi = async (): Promise<any> => {
  return await hasuraClient
    .request({
      method: "GET",
      url: "https://api.example.com/data",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: "John",
        age: 30,
      },
    })
    .then((res) => {
      return res.data;
    });
};
