import Cookies from 'js-cookie'
import axios from '@/api/fetch'
import {accountUrl} from '@/api/api'
import {getToken,removeToken} from '@/utils/auth'

const user = {
  state: {
    userInfo:'',
    username: '',
    token: localStorage.getItem('token'),
  },

  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
  },

  actions: {
    // 获取用户信息
    getUserInfo({commit, state}) {
      axios({
        method: 'get',
        url: accountUrl,
      }).then(res => {
        console.log(res)
        let userInfoData = res.data;
        commit('SET_USERNAME', userInfoData.username)
        commit('SET_USERINFO', userInfoData)
      }).catch(error => {
        console.log(error.response)
      });
    },
    // 退出登录
    logOut({commit, state}) {
      // removeToken('authenticationToken');
      localStorage.removeItem("token")
    },
  }
}

export default user
