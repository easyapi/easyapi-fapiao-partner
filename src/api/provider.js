import {baseUrl} from "./api";
import axios from 'axios'

//获取服务商管理列表
export const getPlatformList = (params) => axios.get(`${baseUrl}/api/shop-summaries`, {
  params: {
    ...params
  }
});
