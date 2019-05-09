<template>
	<div class="login flex-c">
		<div class="login_box flex-r">
			<div class="login_box_lf flex-c">
				<div class="welcome  fz-cl-white">
					<span class="fz-18">欢迎来到</span>
					<p class="fz-36">EasyAPI服务商平台</p>
				</div>
			</div>
			<div class="login_box_rt">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
					<el-form-item label="">
						<h2 class="text-align-center">登录</h2>
					</el-form-item>
					<el-form-item label="" prop="username">
						<el-input v-model="ruleForm.username" placeholder="请输入用户名">
							<i slot="prefix" class="iconfont icon-phone"></i>
						</el-input>
					</el-form-item>
					<el-form-item label="" prop="password">
						<el-input v-model="ruleForm.password" type="password" placeholder="请输入密码">
							<i slot="prefix" class="iconfont icon-password"></i>
						</el-input>
					</el-form-item>
					<div class="remember flex-r">
						<el-checkbox v-model="rememberMe">记住密码</el-checkbox>
						<!--<a>找回密码</a>-->
					</div>
					<el-form-item>
						<el-button type="primary" class="login--btn" @click="submit('ruleForm')">登录</el-button>
					</el-form-item>
					<div class="account--oper text-align-center fz-12" v-if="false">
						<span class="fz-cl-light">没有注册?</span>
						<a class="fz-cl-main" @click="jumpPage('/register')">立即注册</a>
					</div>
				</el-form>
			</div>
		</div>

	</div>
</template>
<script>
  import $ from 'jquery'
  import Cookies from 'js-cookie'
  import {authenticateUrl,accountUrl} from '../api/api'

  export default {
    name: 'Login',
    components: {},
    props: {},
    data() {
      const phoneCodeVerify = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        } else if (/^[0-9]{11}$/.test(value) === false) {
          return callback(new Error('请输入正确格式的11位手机号码'));
        } else {
          callback();
        }

      };
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rememberMe: true,
        rules: {
          username: [
            // { required: true,  validator: phoneCodeVerify, trigger: 'blur' },
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    //计算属性
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    //keep-alive 组件激活时调用
    activated() {
    },
    //keep-alive 组件停用时调用。
    deactivated() {
    },
    //方法
    methods: {
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: 'post',
              url: authenticateUrl,
              data: {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                rememberMe: this.rememberMe
              }
            }).then(res => {
              console.log(res)
              if (res.status===200 && res.data.id_token) {
	              localStorage.setItem('token',"Bearer " + res.data.id_token);
                // Cookies.set('token',"Bearer " + res.data.id_token,new Date(new Date().getTime()*30))
                this.$message.success("登录成功");
                this.$store.dispatch('getUserInfo');
	              setTimeout(()=>{
                  this.$router.push('/platform/overview')
	              },1000)

              }else{
                this.$message.success(`${res.data.message},${res.data.content}`);
              }

            }).catch(error => {
              console.log(error.response)
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      jumpPage(url) {
        this.$router.push({path: url, query: {}})
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
