import { findElem } from '../../utils/fn';
import Cookies from 'js-cookie';
//基本一级页面配置 顶部导航及左侧可显示菜单
//name，url不要重复
/*
* title标题
* name routername
* icon 图标class
* url  路径
* */
let list = [
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
            icon: "",
          },
          {
            title: "预警企业",
            url: '/invoice/warning',
            name: 'Warning',
            icon: "icon-agent",
          },
          {
            title: "沉默企业",
            url: '/invoice/silent',
            name: 'Silent',
            icon: "icon-agent",
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
            icon: "",
          }
        ]
      }
    ]
  }
];
let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
// let cookiesUserInfo = Cookies.get("userInfo");
if (userInfoData && userInfoData.platform) {
  // let userInfo2Json = JSON.parse(cookiesUserInfo);
  let ifCanCreate = userInfoData.platform.ifCanCreate;
  console.log(ifCanCreate);
  if (ifCanCreate === true) {
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
                icon: "",
              },
              {
                title: "预警企业",
                url: '/invoice/warning',
                name: 'Warning',
                icon: "icon-agent",
              },
              {
                title: "沉默企业",
                url: '/invoice/silent',
                name: 'Silent',
                icon: "icon-agent",
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
                icon: "",
              }
            ]
          }
        ]
      }
    ];
  } else if (ifCanCreate === false) {
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
                icon: "",
              },
              {
                title: "预警企业",
                url: '/invoice/warning',
                name: 'Warning',
                icon: "icon-agent",
              },
              {
                title: "沉默企业",
                url: '/invoice/silent',
                name: 'Silent',
                icon: "icon-agent",
              }
            ]
          }
        ]
      }
    ];
  }
}

//扩展页面配置【配置跳转页面选中相应name】
let extend = [
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
  }
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
    setNavbar({ commit, state }, url) {
      let pagesList = state.pagesList;
      let index = findElem(pagesList, 'url', url)
      commit('SET_NAVBAR_AVTIVE', pagesList[index].name)
      commit('SET_SONS', pagesList[index].sons)
      commit('SET_SONS_NAVBAR_AVTIVE', pagesList[index].sons[0].sons[0].name)
    },
    setSonsNavbarActive({ commit, state }, url) {
      for (let v of state.extendPageList) {
        if (v.list.includes(url)) {
          commit('SET_SONS_NAVBAR_AVTIVE', v.name)
        }
      }
    }

  }
}

export default pages