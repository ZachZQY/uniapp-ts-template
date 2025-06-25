import { hasuraClient } from "@/utils/graphql-ormify-client";
type DataCache = {
  id: number;
  key: string;
};
export const getDataCache = async (): Promise<DataCache | undefined> => {
  return await hasuraClient.data<DataCache>({
    table: "data_cache",
    args: {
      where: {
        id: {
          _gte: 0,
        },
      },
    },
    data_fields: ["id", "key"],
  });
};
