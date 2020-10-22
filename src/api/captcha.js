import {baseUrl} from "./request";
import axios from 'axios'

/**
 * 登录
 *
 * @see https://www.easyai.com
 */
export const login = (username, password, rememberMe) => axios.post(`${baseUrl}/api/authenticate`, {
  data: {
    username: username,
    password: password,
    rememberMe: rememberMe
  }
})

//获取验证码
export const getCaptchaUrl = `${baseUrl}/captcha`;
