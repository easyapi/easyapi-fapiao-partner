import {baseUrl} from "./request";
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

