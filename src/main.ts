import { createSSRApp } from "vue";
import * as Pinia from 'pinia'
import '@/utils/graphql-ormify-client' // 初始化全局 hasuraClient
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia())
  return {
    app,
    Pinia
  };
}
