import axios from "axios";
import { getItem, removeItem } from "./utils/auth";
// import { message } from "@/utils/refactorMessage";
import router from "@/router";

//创建axios实例
const instance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
    "If-Modified-Since": "Thu, 01 Jun 1970 00:00:00 GMT", // 避免 IE10 返回 304
    shouldIntercept: true // 若为 false,则不拦截在自己的请求里处理
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = getItem("token");
    if (!config.headers.Authorization && token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.request.responseType === "blob") {
      return Promise.resolve(response);
    } else {
      return response;
    }
  },
  error => {
    if (error.response && error.response.status === "401") {
      removeItem("token");
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default instance;
