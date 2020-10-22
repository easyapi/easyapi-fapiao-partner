import {baseUrl} from "./request";
import axios from 'axios'

//获取平台列表(查询当前用户所属平台的子平台列表)
export const getPlatformsUrl = `${baseUrl}/api/platforms`;

//平台管理员:设置子平台管理员
export const addPlatformManagerUrl = `${baseUrl}/platform/add-platform-manager`;
//编辑平台信息
export const editPlatformUrl = `${baseUrl}/api/platform/`;
//平台管理员:设置商户门店管理员
export const addShopManagerUrl = `${baseUrl}/platform/add-shop-manager`;
