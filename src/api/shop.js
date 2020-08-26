import {baseUrl} from "./api";
import axios from 'axios'

/**
 * 获取商户门店列表
 */
export const getShopList = (params) => axios.get(`${baseUrl}/api/shops`, {
  params: {
    ...params
  }
});

export const sendCaptcha = (params) => axios.get(`${baseUrl}/captcha/send`, {
  params: {
    ...params
  }
});

export const getAdminList = (id) => axios.get(`${baseUrl}/api/authenticate/jump-shop/${id}`
);

// 平台员工:获取商户门店开票累计列表
//获取预警企业列表
export const getShopSummaryList = (params) => axios.get(`${baseUrl}/api/shop-summaries`, {
  params: {
    ...params
  }
});


/**
 * 创建商户信息
 */
export const createShop = (data) => axios.post(`${baseUrl}/platform/add-shop-manager`, {
  ...data
});


