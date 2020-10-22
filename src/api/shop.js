import {baseUrl} from "./request";
import axios from 'axios'

/**
 * 获取商户门店列表
 */
export const getShopList = (params) => axios.get(`${baseUrl}/platform/shops`, {
  params: {
    ...params
  }
});

//发送验证码
export const sendCaptcha = (params) => axios.get(`${baseUrl}/captcha/send`, {
  params: {
    ...params
  }
});

export const getAdmin = (id) => axios.get(`${baseUrl}/platform/shop/${id}/jump`
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
export const createShop = (data) => axios.post(`${baseUrl}/api/shop`, {
  ...data
});

/**
 * 创建商户管理员
 */
export const createUserShop = (data) => axios.post(`${baseUrl}/platform/user-shop`, {
  ...data
});

/**
 * 获取企业管理员列表
 */
export const getAdminList = (id) => axios.get(`${baseUrl}/shop/${id}/users`);

/**
 * 跳转控制台
 */
export const jumpShopUrl = (id) => axios.get(`${baseUrl}/platform/shop/${id}/jump`);

/**
 * 删除管理员
 */
export const deleteAdmin = (id) => axios.delete(`${baseUrl}/api/account/delete-assign/${id}`);
