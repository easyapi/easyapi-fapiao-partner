<template>
  <div class="main-container">
    <div class="main-breadcrumb flex-r">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>服务商管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        size="small"
        type="primary"
        @click="showDiglog(0,'','')"
      >添加</el-button>
    </div>
    <div class="main-content">
      <div class="search-content">
        <el-form :inline="true" :model="formInline" class="search__from" label-width="70px">
          <el-form-item label="关键字">
            <el-input size="small" v-model="formInline.keyword" placeholder="可输入企业名称、税号等关键字" style="width:360px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="getProductList(formInline)">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class>
        <el-table
          border v-loading="loading"
          element-loading-text="老铁别急，这就给你整上..."
          header-row-class-name="table-header--gray"
          size="small"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column prop="platformId" label="序号" align="center"></el-table-column>
          <el-table-column prop="addTime" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="name" label="服务商名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="showDiglog(1,scope.$index,scope.row)">设置管理员</el-button>
              <el-button size="mini" @click="editPlatform('',scope.$index, scope.row)">{{btnText}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          :modal-append-to-body="false"
          :title="titleTips"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <el-form
            :model="formInline"
            :rules="rules"
            ref="formInline"
            label-width="130px"
            class="demo-ruleForm"
          >
          <div v-if="show1">
            <el-form-item label="企业名称：" prop="name">
              <el-input v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号：" prop="identifyNumber">
              <el-input v-model="formInline.identifyNumber"></el-input>
            </el-form-item>
          </div>
            
            <div v-if="show2">
              <el-form-item type="number" label="管理员账号：" prop="username">
              <el-input v-model="formInline.username"></el-input>
            </el-form-item>
            <el-form-item type="number" label="验证码：" prop="code">
              <el-input v-model="formInline.code" style="width:50%;"></el-input>
              <el-button @click="sendCaptcha" :disabled="btnDisabled">{{captchaTip}}</el-button>
            </el-form-item>
            <el-form-item type="text" label="用户昵称：" prop="nickname">
              <el-input v-model="formInline.nickname"></el-input>
            </el-form-item>
            <el-form-item type="password" label="初始密码：" prop="password">
              <el-input v-model="formInline.password"></el-input>
            </el-form-item>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm('formInline')">重 置</el-button>
            <el-button type="primary" @click="submitForm('formInline')">保 存</el-button>
          </span>
        </el-dialog>
        <div class="pagination text-align-right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[15, 30, 45, 60]"
            :page-size="15"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCaptchaUrl, shopBaseUrl,getPlatformsUrl,addPlatformManagerUrl,editPlatformUrl } from "../../../api/api";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      formInline: {
        platformId: "",
        identifyNumber:'',
        name: "",
        username: "",
        code: "",
        nickname: "",
        password: ""
      },
      addTime: "",
      btnText:"",
      state:"",
      show1:false,
      show2:false,
      tableData: [],
      centerDialogVisible: false,
      btnType: "",
      captchaTip: "获取验证码",
      titleTips: "提示",
      active: 0,
      current: 1,
      pageSize: 15,
      multipleSelection: "",
      total: 0,
      loading: true,
      rules: {
        name: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        identifyNumber:[
          { required: true, message: "请输入纳税人识别号", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        username:[
          { required: true, message: "请输入管理员账号", trigger: "blur" },
          { min: 11, max: 11, message: "长度 11 个字符", trigger: "blur" }
        ],
        code:[
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 11 个字符", trigger: "blur" }
        ],
        password:[
          { required: true, message: "请输入初始密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  //计算属性
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getPlatformsList();
  },
  //keep-alive 组件激活时调用
  activated() {},
  //keep-alive 组件停用时调用。
  deactivated() {},
  //方法
  methods: {
    // 获取列表
    getPlatformsList() {
      this.loading=true;
      this.$ajax({
        method: "get",
        url: getPlatformsUrl,
        params: {
          page : this.current - 1,
          size : this.pageSize,
          keyword: this.formInline.keyword
        }
      })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = [];
          } else {
            this.tableData = res.data.content;
            if(res.data.content.state==1){
              this.btnText = "启用";
            }else{
              this.btnText = "停用";
            }
            this.total = res.data.totalElements;
          }
          this.loading=false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 弹出框
    showDiglog(type, index, row) {
      this.centerDialogVisible = true;
      this.btnType = type;
      this.formInline.platformId = row.platformId;
      console.log(row.platformId);
      if (type == 0) {
        this.show1 = true;
        this.titleTips = "添加企业";
        this.show2 = false;
      } else {
        this.show2 = true;
        this.titleTips = "设置管理员";
        this.show1 = false;
      }
    },
    // 发送验证码
    sendCaptcha() {
      this.btnDisabled = true;
      this.$ajax({
        method: "post",
        url: getCaptchaUrl,
        data: {
          mobile: this.formInline.username
        }
      })
        .then(res => {
          this.captchaTip = "获取成功";
        })
        .catch(error => {
          this.btnDisabled = false;
          this.$message.warning("请输入手机号！");
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.loading = true;
      this.pageSize = val;
      this.getProductList(this.formInline);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.current = val;
      
      this.getProductList(this.formInline);
      console.log(`当前页: ${val}`);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.btnType)
          if (this.btnType == 1) {
            this.$ajax({
              method: "post",
              url: addPlatformManagerUrl,
              data: {
                platformId: this.formInline.platformId,
                username: this.formInline.username,
                code: this.formInline.code,
                nickname: this.formInline.nickname,
                password: this.formInline.password
              }
            })
              .then(res => {
                if (res.status === 200) {
                  this.centerDialogVisible = false;
                  this.$message.success("设置成功！");
                } else if (res.data.code === 0) {
                  this.$message.error("设置失败！");
                }
              })
              .catch(error => {
                this.$message.error("设置失败！");
                console.log(error.response);
              });
          } else {
            this.$ajax({
              method: "post",
              url: sendShopUrl,
              data: {
                identifyNumber: this.formInline.identifyNumber,
                name: this.formInline.name
              }
            })
              .then(res => {
                if (res.status === 200) {
                  this.centerDialogVisible = false;
                  this.$message.success("添加成功！");
                  this.getShopsList();
                } else if (res.data.code === 0) {
                  this.$message.error("添加失败！");
                }
              })
              .catch(error => {
                this.$message.error(error.response.data.message);
              });
          }
        } else {
          console.log("error submit!!");
        }
      });
    },
    resetForm(formName) {
      // this.centerDialogVisible = false;
      this.captchaTip = "获取验证码";
      this.btnDisabled = false;

      this.$refs[formName].resetFields();
    },
    editPlatform(type, index, row) {
      if(this.btnText == "启用"){
        this.state = 1;
      }else{
        this.state = 0;
      }
      this.$ajax({
        method: "post",
        url: editPlatformUrl+row.platformId,
        data: {
          state:this.state,
        }
      })
        .then(res => {
          if (res.status === 200) {
            if(this.state == 0){
              this.btnText = "启用";
            }else{
              this.btnText = "停用";
            }
          } 
        })
        .catch(error => {
          console.log(error.response);
          if(this.state == 0){
              this.btnText = "启用";
            }else{
              this.btnText = "停用";
            }
          
        });
    },
    handleEdit(index, row) {
      console.log(index, row.productId);
      this.$router.push({
        path: "/store/product-add",
        query: {
          id: row.productId
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      let productId = [];
      if (val.length != 0) {
        for (let key in val) {
          productId.push(val[key].productId);
          this.multipleSelection = productId.join(",");
        }
      } else {
        this.multipleSelection = "";
      }
      console.log(this.multipleSelection);
    }
  }
};
</script>
<style scoped lang="scss">
.search-content {
  background: #f8f8f8;
  padding: 15px 0 0 15px;
  margin-bottom: 25px;
}
.tab-click {
  border-bottom: 2px solid #fff;
  margin-bottom: -2px;
  color: #4170ff;
}

</style>