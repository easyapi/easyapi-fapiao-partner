<template>
  <div class="main-container">
    <div class="main-breadcrumb flex-r">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>预警企业</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-content">
      <div class>
        <p class="tip-txt">提示：连续7天没开票的所有商户</p>
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
          <el-table-column prop="addTime" label="注册时间" width="180" align="center"></el-table-column>
          <el-table-column prop="lastTime" label="最近开票日期" width="180" align="center"></el-table-column>
          <el-table-column prop="successCount" label="成功开票量" align="center"></el-table-column>
          <el-table-column prop="failCount" label="失败开票量" align="center"></el-table-column>
        </el-table>
        <div class="pagination text-align-right">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.page"
            :page-sizes="[15, 30, 45, 60]"
            :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getShopSummaryList,
  } from "../../api/shop";

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
          state: '',
          minQuantity: '',
          maxQuantity: '',
          ifWarn: false
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
        pagination: {
          page: 1,
          size: 15,
          total: 0
        },
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
    created() {
    },
    mounted() {
      document.title = "预警企业 - 服务中心 - EasyAPI发票管理";
      this.getShopSummaryList();
    },
    //keep-alive 组件激活时调用
    activated() {
    },
    //keep-alive 组件停用时调用。
    deactivated() {
    },
    //方法
    methods: {
      // 获取列表
      getShopSummaryList() {
        this.pagination.page = this.pagination.page - 1
        let params = {...this.pagination}
        params.keyword = this.formInline.keyword
        getShopSummaryList(params).then(res => {
          if (res.data.code === 0) {
            this.tableData = [];
          } else {
            this.tableData = res.data.content;
            this.pagination.total = res.data.totalElements;
          }
          this.loading = false;
        }).catch(error => {
          console.log(error);
        });
      },
      handleSizeChange(val) {
        this.loading = true;
        this.pageSize = val;
        this.getShopSummaryList(this.formInline);
      },
      handleCurrentChange(val) {
        this.current = val;
        this.getShopSummaryList(this.formInline);
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
          method: "GET",
          url: agentsUrl,
          params: obj
        }).then(res => {
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
        this.$router.push({
          path: "/store/product-add",
          query: {
            id: row.productId
          }
        });
      },
      handleSelectionChange(val) {
        let productId = [];
        if (val.length != 0) {
          for (let key in val) {
            productId.push(val[key].productId);
            this.multipleSelection = productId.join(",");
          }
        } else {
          this.multipleSelection = "";
        }
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
  .tip-txt {
    line-height: 40px;
    font-size: 14px;
    color: #fff;
    background: #009486;
    padding: 0 15px;
    margin: 0 auto 20px;
    border-radius: 5px;
  }

</style>
