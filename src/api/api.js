//接口跟地址
export const fapiaoBaseUrl = 'https://fapiao-api.easyapi.com';

//登录
export const authenticateUrl = `${fapiaoBaseUrl}/api/authenticate`;
//获取用户信息
export const accountUrl = `${fapiaoBaseUrl}/api/account`;

//获取商户门店列表
export const getShopsUrl = `${fapiaoBaseUrl}/api/shops`;

//获取平台列表(查询当前用户所属平台的子平台列表)
export const getPlatformsUrl = `${fapiaoBaseUrl}/api/platforms`;
//获取验证码
export const getCaptchaUrl = `${fapiaoBaseUrl}/api/captcha`;
//平台管理员:设置商户门店管理员
export const addShopManagerUrl = `${fapiaoBaseUrl}/platform/add-shop-manager`;
//获取 平台管理员跳转到 商户门店控制台需要的brearToken
export const jumpShopUrl = `${fapiaoBaseUrl}/api/authenticate/jump-shop/`;
//添加商户门店信息
export const sendShopUrl = `${fapiaoBaseUrl}/api/shop`;
// 平台员工:获取商户门店开票累计列表
export const getShopSummaiesUrl = `${fapiaoBaseUrl}/api/shop-summaries`;
//平台管理员:设置子平台管理员
export const addPlatformManagerUrl = `${fapiaoBaseUrl}/platform/add-platform-manager`;
//编辑平台信息
export const editPlatformUrl = `${fapiaoBaseUrl}/api/platform/`;
