export const baseUrl = "https://fapiao-api.easyapi.com"; //发票API接口根地址

//登录
export const authenticateUrl = `${baseUrl}/api/authenticate`;

//获取商户门店列表
export const getShopsUrl = `${baseUrl}/api/shops`;

//获取平台列表(查询当前用户所属平台的子平台列表)
export const getPlatformsUrl = `${baseUrl}/api/platforms`;
//获取验证码
export const getCaptchaUrl = `${baseUrl}/captcha`;
//平台管理员:设置商户门店管理员
export const addShopManagerUrl = `${baseUrl}/platform/add-shop-manager`;
//获取 平台管理员跳转到 商户门店控制台需要的brearTokenncu
export const jumpShopUrl = `${baseUrl}/api/authenticate/jump-shop/`;
//添加商户门店信息
export const sendShopUrl = `${baseUrl}/api/shop`;
// 平台员工:获取商户门店开票累计列表
export const getShopSummaiesUrl = `${baseUrl}/api/shop-summaries`;
//平台管理员:设置子平台管理员
export const addPlatformManagerUrl = `${baseUrl}/platform/add-platform-manager`;
//编辑平台信息
export const editPlatformUrl = `${baseUrl}/api/platform/`;
