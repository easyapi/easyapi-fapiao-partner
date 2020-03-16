import {baseUrl} from "./api";

//登录
export const authenticateUrl = `${fapiaoBaseUrl}/api/authenticate`;

/**
 * 获取用户信息
 *
 * @see https://www.easyai.com
 */
export const getUser = () => axios.get(`${baseUrl}/api/account`)

