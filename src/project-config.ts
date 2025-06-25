export const projectConfig = {
  graphqlOrmifyClient: {
    endpoint: "https://guide-hasura-graphql.gzdyguide.net/v1/graphql",
    headers: {
      "x-hasura-admin-secret": "myadminsecretkey",
    },
    debug: true
  },
};
