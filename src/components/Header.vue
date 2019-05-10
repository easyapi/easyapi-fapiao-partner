<template>
	<div class="header flex-r">
		<div class="header_logo flex-r">
			<img src="../assets/images/logo.png" alt="">
			<span class="fz-14">
				EasyAPI发票管理
			</span>
		</div>
		<div class="header_navbar flex-r">
			<a v-for="(item,index) in pagesList" :class="[navBarActive===item.name?'active':'']" :key="index"
			   @click="jumpPage(item.url)">{{item.title}}</a>
		</div>
		<div class="header_account flex-r">
			<el-popover v-model="showPopover" popper-class="el-popover--box" placement="bottom" visible-arrow width="50"
			            trigger="click">
				<ul>
					<li @click="logOut">退出</li>
				</ul>
				<a slot="reference">
					<img :src="userInfo.photo" alt="">
				</a>
			</el-popover>

		</div>
	</div>

</template>
<script>
  import {mapGetters} from 'vuex'
  import Cookies from 'js-cookie'
  export default {
    name: "Header",
    components: {},
    props: {},
    data() {
      return {
        showPopover: false
      }
    },
    //计算属性
    computed: {
      ...mapGetters([
        "userInfo",
        'pagesList',
        'navBarActive'
      ])
    },
    watch: {},
    created() {

    },
    mounted() {
      this.$store.dispatch('setNavbar', this.$route.matched[0].path);
      if (localStorage.getItem("token")){
        this.$store.dispatch('getUserInfo');
      } else {
        this.$message.warning("请先登录");
        this.$router.push('/login')
      }

    },
    //keep-alive 组件激活时调用
    activated() {},
    //keep-alive 组件停用时调用。
    deactivated() {},
    //方法
    methods: {
      jumpPage(url) {
        if (this.$route.path.indexOf(url) === -1) {
          this.$router.push({path: url, query: {}});
          this.$store.dispatch('setNavbar', url);
        }
      },
      logOut() {
        Cookies.remove('userInfo');
        this.$router.push('/login')
        this.$store.dispatch('logOut');
        this.showPopover = false;
        
      }
    }
  }
</script>
<style scoped lang="scss">
	.el-popover--box {
		padding: 0;

		ul {
			li {
				cursor: pointer;
				line-height: 26px;
				padding: 0 15px;
			}

			&:hover {
				background: $main-color;
				color: $cl-white;
			}
		}

	}
</style>