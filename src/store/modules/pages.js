import {findElem} from '../../utils/fn';
import Cookies from 'js-cookie';
//基本一级页面配置 顶部导航及左侧可显示菜单
//name，url不要重复
/*
* title标题
* name routername
* icon 图标class
* url  路径
* */
let list=[];
let cookiesUserInfo = Cookies.get("userInfo");
if(cookiesUserInfo){
  let userInfo2Json = JSON.parse(cookiesUserInfo);
  let ifCanCreate = userInfo2Json.content.platform.ifCanCreate;
  if(ifCanCreate === true){
    list = [
      {
        title: "服务商平台",
        url: '/invoice',
        name: 'Invoice',
        sons: [
          {
            title: '企业管理',
            sons: [
              {
                title: "企业管理",
                url: '/invoice/enterprise-list',
                name: 'EnterpriseList',
                icon:"",
              },
              {
                title: "预警企业",
                url: '/invoice/warning',
                name: 'Warning',
                icon:"icon-agent",
              },
              {
                title: "沉默企业",
                url: '/invoice/silent',
                name: 'Silent',
                icon:"icon-agent",
              }
            ]
          },
          {
            title: "服务商管理",
            sons: [
              {
                title: "服务商管理",
                url: '/invoice/provider-list',
                name: 'ProviderList',
                icon:"",
              }
            ]
          }
        ]
      }
    ];
  }else if(ifCanCreate === false){
  list = [
    {
      title: "发票管理",
      url: '/invoice',
      name: 'Invoice',
      sons: [
        {
          title: '企业管理',
          sons: [
            {
              title: "企业管理",
              url: '/invoice/enterprise-list',
              name: 'EnterpriseList',
              icon:"",
            },
            {
              title: "预警企业",
              url: '/invoice/warning',
              name: 'Warning',
              icon:"icon-agent",
            },
            {
              title: "沉默企业",
              url: '/invoice/silent',
              name: 'Silent',
              icon:"icon-agent",
            }
          ]
        }
      ]
    }
  ];
}
}else{
  list = [
    {
      title: "发票管理",
      url: '/invoice',
      name: 'Invoice',
      sons: [
        {
          title: '企业管理',
          sons: [
            {
              title: "企业管理",
              url: '/invoice/enterprise-list',
              name: 'EnterpriseList',
              icon:"",
            },
            {
              title: "预警企业",
              url: '/invoice/warning',
              name: 'Warning',
              icon:"icon-agent",
            },
            {
              title: "沉默企业",
              url: '/invoice/silent',
              name: 'Silent',
              icon:"icon-agent",
            }
          ]
        }
      ]
    }
  ];
}

//扩展页面配置【配置跳转页面选中相应name】
let extend = [
  //平台
  {
    name: 'Overview',
    list: ['/platform/overview']
  },
  {
    name: 'Vip',
    list: ['/platform/vip']
  },
  {
    name: 'Agent',
    list: ['/platform/agent']
  },
  {
    name: 'Advertising',
    list: ['/platform/advertising']
  },
  {
    name: 'Article',
    list: ['/platform/article']
  },
  {
    name: 'Message',
    list: ['/platform/message']
  },
  {
    name: 'Adv-list',
    list: ['/platform/adv-list']
  },
  {
    name: 'Adv-order',
    list: ['/platform/adv-order']
  },
  {
    name: 'Adv-put-in',
    list: ['/platform/adv-put-in']
  },
  {
    name: 'Adv-materiel',
    list: ['/platform/adv-materiel']
  },
  {
    name: 'Adv-customer',
    list: ['/platform/adv-customer']
  },
  //商城
  {
    name: 'EnterpriseList',
    list: ['/invoice/enterprise-list']
  },
  {
    name: 'Warning',
    list: ['/invoice/warning']
  },
  {
    name: 'Silent',
    list: ['/invoice/silent']
  },
  {
    name: 'ProviderList',
    list: ['/invoice/provider-list']
  },
  {
    name: 'Attribute',
    list: ['/invoice/attribute']
  },
  {
    name: 'Group',
    list: ['/invoice/group']
  },
  {
    name: 'Logistics',
    list: ['/invoice/logistics']
  },
  {
    name: 'OrderList',
    list: ['/invoice/order-list']
  },
  {
    name: 'MarketingOrderList',
    list: ['/invoice/marketing-order-list']
  },
  {
    name: 'Record',
    list: ['/invoice/record']
  },
  {
    name: 'StoreList',
    list: ['/invoice/invoice-list']
  },
  {
    name: 'Subsidy',
    list: ['/invoice/subsidy']
  },
  {
    name: 'SupplierList',
    list: ['/invoice/supplier-list']
  },
  {
    name: 'Statistics',
    list: ['/invoice/statistics']
  },
  {
    name: 'SupplierProduct',
    list: ['/invoice/supplier-product']
  },
  {
    name: 'Compact',
    list: ['/invoice/compact']
  },
  {
    name: 'Quality',
    list: ['/invoice/quality']
  },
  //营销
  // 订单
  {
    name: 'OrderList',
    list: ['/invoice/order-list', '/invoice/order-detail']
  },

];

const pages = {
  state: {
    pagesList: list,
    extendPageList: extend,
    navBarActive: '',
    sons: [],
    sonsBarActive: '',
  },

  mutations: {
    SET_NAVBAR_AVTIVE: (state, name) => {
      state.navBarActive = name
    },
    SET_SONS: (state, urlArr) => {
      state.sons = urlArr
    },
    SET_SONS_NAVBAR_AVTIVE: (state, name) => {
      state.sonsBarActive = name
    },
  },

  actions: {
    setNavbar({commit, state}, url) {
      let pagesList = state.pagesList;
      let index = findElem(pagesList, 'url', url)
      commit('SET_NAVBAR_AVTIVE', pagesList[index].name)
      commit('SET_SONS', pagesList[index].sons)
      commit('SET_SONS_NAVBAR_AVTIVE', pagesList[index].sons[0].sons[0].name)
    },
    setSonsNavbarActive({commit, state}, url) {
      for (let v of state.extendPageList) {
        if (v.list.includes(url)) {
          commit('SET_SONS_NAVBAR_AVTIVE', v.name)
        }
      }
    }

  }
}

export default pages