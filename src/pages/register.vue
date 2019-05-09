<template>
	<div class="register flex-c">
		<div class="register_box flex-r">
			<div class="register_box_lf flex-c">
				<div class="welcome  fz-cl-white">
					<span class="fz-18">欢迎来到</span>
					<p class="fz-36">宇航人社交电商</p>
				</div>
			</div>
			<div class="register_box_rt">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
					<el-form-item label="">
						<h2 class="text-align-center">注册</h2>
					</el-form-item>
					<el-form-item label="" prop="name">
						<el-input v-model="ruleForm.name"  placeholder="请输入手机号码">
							<i slot="prefix" class="iconfont icon-phone"></i>
						</el-input>
					</el-form-item>
					<el-form-item label="" prop="code">
						<el-input v-model.numbe="ruleForm.code"  placeholder="请输入验证码">
							<i slot="prefix" class="iconfont icon-password" ></i>
							<el-button :disabled="disabledBtn"  slot="append" @click="sendSms">{{btnText}}</el-button>
						</el-input>
					</el-form-item>
					<el-form-item label="" prop="password">
						<el-input v-model="ruleForm.password" type="password"  placeholder="请输入密码">
							<i slot="prefix" class="iconfont icon-password" ></i>
						</el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary"  class="register--btn" @click="submit('ruleForm')">注册</el-button>
					</el-form-item>
					<div class="account--oper text-align-center fz-12">
						<span class="fz-cl-light">已有账号?</span>
						<a class="fz-cl-main" @click="jumpPage('/login')">立即登录</a>
					</div>
				</el-form>
			</div>
		</div>

	</div>
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'Register',
    components: {},
    props: {},
    data() {
      const phoneCodeVerify = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        }else if (/^[0-9]{11}$/.test(value)===false) {
          return callback(new Error('请输入正确格式的11位手机号码'));
        }else {
          callback();
        }

      };

      return {
        ruleForm: {
          name: '',
	        code:null,
          password:''
        },
        rules: {
          name: [
            { required: true,  validator: phoneCodeVerify, trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },

          ]
        },
	      btnText:'获取验证码',
        disabledBtn:false,
	      time:60,
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
      //提交注册
      submit(formName){
        console.log(1)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
	    //1.发送验证码
      sendSms(){
          this.disabledBtn=true;
          this.countTime();

      },
      //2.倒计时
      countTime:function() {
        let _that=this;
        if (this.time > 0) {
          this.time-=1;
          this.btnText= this.time+'秒后重发';
          setTimeout(_that.countTime,1000)
        } else {
          this.time =60;
          this.btnText="获取验证码";
          this.disabledBtn=false;
        }
      },
      jumpPage(url){
        this.$router.push({path:url,query:{}})
      }
    }
  }
</script>
<style scoped lang="scss">
	.a {
		color: $main-color;
	}
</style>