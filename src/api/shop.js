import {baseUrl} from "./api";
import axios from 'axios'

//获取商户门店列表
export const getShopsUrl = `${baseUrl}/api/shops`;


// 平台员工:获取商户门店开票累计列表
export const getShopSummaiesUrl = `${baseUrl}/api/shop-summaries`;
