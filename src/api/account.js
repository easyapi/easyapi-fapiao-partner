import {baseUrl} from "./api";
import axios from 'axios'

/**
 * 登录
 *
 * @see https://www.easyai.com
 */
export const login = (username, password, rememberMe) => axios.post(`${baseUrl}/api/authenticate`, {
  username: username,
  password: password,
  rememberMe: rememberMe
})

/**
 * 获取用户信息
 *
 * @see https://www.easyai.com
 */
export const getUser = () => axios.get(`${baseUrl}/api/account`)


//获取 平台管理员跳转到 商户门店控制台需要的brearTokenncu
export const jumpShopUrl = `${baseUrl}/api/authenticate/jump-shop/`;
