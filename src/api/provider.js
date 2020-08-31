import {baseUrl} from "./api";
import axios from 'axios'

//获取服务商管理列表
export const getPlatformList = (params) => axios.get(`${baseUrl}/api/platforms`, {
  params: {
    ...params
  }
});

//添加服务商
export const addPlatformList = (data) => axios.post(`${baseUrl}/api/platform`,data);

//服务商设置管理员
export const addPlatformManagerUrl = (data) => axios.post(`${baseUrl}/platform/add-platform-manager`, {
  ...data
});
