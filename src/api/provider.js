import {baseUrl} from "./api";
import axios from 'axios'

//获取服务商管理列表
export const getPlatformList = (params) => axios.get(`${baseUrl}/api/shop-summaries`, {
  params: {
    ...params
  }
});

//添加服务商
export const addPlatformList = (data) => axios.post(`${baseUrl}/api/platform`,data);

//服务商设置管理员
export const addPlatformManagerUrl = (id,data) => axios.post(`${baseUrl}/api/account/change-assign/${id}`, {
  data
});
