/**
 * Created by shi on 2018/10/11.
 */
export const baseUrl = 'https://api2.easyapi.com';
//宇航人商城url
export const fapiaoBaseUrl = 'https://fapiao-api.easyapi.com';
//获取七牛key
export const qiniuKeyUrl = `${fapiaoBaseUrl}/qiniu/key`;
//获取七牛token
export const qiniuTokenUrl = `${fapiaoBaseUrl}/qiniu/upToken`;

//登录
export const authenticateUrl = `${fapiaoBaseUrl}/api/authenticate`;
//获取用户信息
export const accountUrl = `${fapiaoBaseUrl}/api/account`;
//获取商户门店列表
export const getShopsUrl = `${fapiaoBaseUrl}/api/shops`;
//微商城APPKEY
export const APPKEY = 'SFB9LGSypeHjWB1O';
//微商城APPSECRET
export const APPSECRET = 'bkosxt7y6szsf2qy';
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
// 订单评论
export const productOrderCommentUrl = `${fapiaoBaseUrl}/product-comments?appKey=${APPKEY}&appSecret=${APPSECRET}`;
// 卖家发货
export const deliveryUrl = `${fapiaoBaseUrl}/biz/product-order/`;
// 卖家接单
export const acceptUrl = `${fapiaoBaseUrl}/biz/product-order/`;
// 商品分类编辑
export const categoryUrl = `${fapiaoBaseUrl}/admin/product-category/`;
// 获取商品分类信息
export const categoryIMforUrl = `${fapiaoBaseUrl}/product-category`;
// 获取步骤
export const orderStepsUrl = `${fapiaoBaseUrl}/order-steps?sort=addTime,asc&appKey=${APPKEY}&appSecret=${APPSECRET}`;
// 获取属性管理列表
export const attributesListUrl = `${fapiaoBaseUrl}/attributes?appKey=${APPKEY}&appSecret=${APPSECRET}`;
// 添加属性信息
export const attributesIMforUrl = `${fapiaoBaseUrl}/admin/attribute/`;
// 获取属性信息
export const getAttributesIMforUrl = `${fapiaoBaseUrl}/attribute`;
// 获取品牌管理列表
export const brandsListUrl = `${fapiaoBaseUrl}/brands?appKey=${APPKEY}&appSecret=${APPSECRET}`;
// 获取品牌详情
export const getBrandsIMforUrl = `${fapiaoBaseUrl}/brands/`;
// 获取品牌详情2
export const getBrandsIMforUrl2 = `${fapiaoBaseUrl}/brand/`;
// 添加属性信息
export const brandsIMforUrl = `${fapiaoBaseUrl}/admin/brand/`;