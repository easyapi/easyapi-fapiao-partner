<template>
  <div class="main-container">
    <div class="main-breadcrumb flex-r">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>沉默企业</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <el-button
        size="small"
        type="primary"
        @click="()=>{this.$router.push('/store/product-add')}"
      >添加</el-button> -->
    </div>
    <div class="main-content">
      <div class>
        <p class="tip-txt">提示：沉默商户是指超过30天没有开票的商户，包括从注册超过30天未开票的商户</p>
        <el-table
          border v-loading="loading"
          element-loading-text="老铁别急，这就给你整上..."
          header-row-class-name="table-header--gray"
          size="small"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column prop="shopSummaryId" label="序号" align="center"></el-table-column>
          <el-table-column prop="shop.name" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="shop.identifyNumber" label="纳税人识别号" align="center"></el-table-column>
          <el-table-column prop="shop.provider" label="税务服务商" align="center"></el-table-column>
          <el-table-column prop="addTime" label="注册时间" width="180" align="center"></el-table-column>
          <el-table-column prop="lastTime" label="最近开票日期" width="180" align="center"></el-table-column>
          <el-table-column prop="amount" label="历史开票量" align="center"></el-table-column>
          <el-table-column prop="silenceDay" label="沉默天数" align="center"></el-table-column>
        </el-table>
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
import { APPKEY, APPSECRET, sxproductUrl,getShopSummaiesUrl } from "../../../api/api";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      formInline: {
        name: "",
        productCategory: "",
        minTotalSales: "",
        maxTotalSales: "",
        minPrice: "",
        maxPrice: "",
        state:'',
        minQuantity : '',
        maxQuantity : '',
        ifWarn :false
      },
      addTime: "",
      tableData: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      active: 0,
     
      current: 1,
      pageSize: 15,
      multipleSelection: "",
      showDown: true,
      showUp: false,
      total: 0,
      loading: true
    };
  },
  //计算属性
  computed: {},
  watch: {},
  created() {},
  mounted() {
    document.title="沉默企业 - EasyAPI服务商";
    this.getShopSummaiesList();
  },
  //keep-alive 组件激活时调用
  activated() {},
  //keep-alive 组件停用时调用。
  deactivated() {},
  //方法
  methods: {
    // 获取列表
    getShopSummaiesList() {
      this.loading=true;
      this.$ajax({
        method: "get",
        url: getShopSummaiesUrl,
        params: {
          page : this.current - 1,
          size : this.pageSize,
          type : 2
        }
      })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = [];
          } else {
            this.tableData = res.data.content;
            this.total = res.data.totalElements;
          }
          this.loading=false;
        })
        .catch(error => {
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
    getAgentList() {
      let obj = {};
      obj.page = this.current - 1;
      obj.size = this.pageSize;
      obj.nickname = this.nickname;
      obj.phone = this.phone;
      obj.startAddTime = this.startTime;
      obj.endAddTime = this.endTime;
      obj.area = this.area;
      obj.areaType = this.areaType;

      this.$ajax({
        method: "get",
        url: agentsUrl,
        params: obj
      })
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.content;
            this.total = Number(res.data.totalElements);
          } else if (res.data.code === 0) {
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(error => {
          console.log(error.response);
          this.tableData = [];
          this.total = 0;
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
    },
    tabChange(index, event) {
      this.formInline.state = "";
      this.formInline.minQuantity = "";
      this.formInline.maxQuantity = "";
      this.formInline.ifWarn = false;
      this.active = index;
      if (index == 1) {
        this.getProductList(this.formInline);
        this.showUp = true;
        this.showDown = false;
      } else if (index == 2) {
        this.getProductList(this.formInline);
        this.showUp = false;
        this.showDown = true;
      } else if (index == 3) {
        this.getProductList(this.formInline);
        this.showUp = false;
        this.showDown = true;
      } else if (index == 0) {
        this.getProductList(this.formInline);
        this.showUp = false;
        this.showDown = true;
      }
    },
    changePage(current) {
      this.current = current;
      this.getAgentList();
    }
  }
};
</script>
<style scoped lang="scss">
.tip-txt{
  line-height: 40px;
    font-size: 14px;
    color: #fff;
    background: #009486;
    padding: 0 15px;
    margin: 0 auto 20px;
    border-radius: 5px;
}

</style>