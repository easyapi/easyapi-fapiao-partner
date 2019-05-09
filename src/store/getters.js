const getters = {
  userInfo: state => state.user.userInfo,
  username: state => state.user.username,
  pagesList:state=>state.pages.pagesList,
  navBarActive:state=>state.pages.navBarActive,
  sons:state=>state.pages.sons,
  sonsBarActive:state=>state.pages.sonsBarActive,
}
export default getters
