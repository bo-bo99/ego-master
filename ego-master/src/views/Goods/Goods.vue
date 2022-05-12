<template>
  <div class="goods">
    <div class="header">
      <el-input placeholder="请输入内容" v-model="input" clearable @change="searchIpt">
      </el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">
        <router-link to="/Add-goods" style="color:white">页面添加</router-link>
      </el-button>
      <el-button type="primary" @click="addGoods">添加</el-button>
    </div>
    <div class="wrapper">
      <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'product_id', order: 'Ascending'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="product_id" label="商品ID" width="100" sortable>
        </el-table-column>
        <el-table-column prop="product_name" label="商品名称" width="300" sortable>
        </el-table-column>
        <el-table-column prop="product_price" label="商品价格" width="108" sortable>
        </el-table-column>
        <el-table-column prop="product_count" label="商品数量" width="110" sortable>
        </el-table-column>
        <el-table-column prop="category_id" label="商品类名" width="110" sortable>
        </el-table-column>
        <el-table-column prop="product_status" label="商品状态" width="110" sortable>
        </el-table-column>
        <el-table-column prop="default_img" label="商品图片" width="110">
        </el-table-column>
        <el-table-column prop="discount_price" label="商品折扣价" width="124" sortable>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <MyPagination :total='total' :pageSize='pageSize' :current-page.sync="currentPage" @changePage="changePage">
      </MyPagination>
    </div>
    <GoodsDialog :title="title" :rowData="rowData" ref="dialog" :dialogVisible="dialogVisible" @changeDialog="changeDialog"></GoodsDialog>
  </div>
</template>

<script>
import { getproductList, getproductListLength, getproductListSearch, getproductSearchLength, DeleteProductById } from '@/api/productAPI.js'
import MyPagination from '@/components/MyPagination.vue'
import GoodsDialog from '@/views/Goods/GoodsDialog.vue'
export default {
  created() {
    this.getproductLists(this.page, this.limit)
    this.getproductListLength()
  }
  ,
  data() {
    return {
      input: '',
      page: 1,
      limit: 5,
      tableData: [],
      total: 0,
      pageSize: 0,
      currentPage: 1,
      dialogVisible: false,
      title: '添加商品',
      rowData: {}
    }
  },
  methods: {
    async searchIpt(val) {
      this.currentPage = 1
      if (val == '') {
        this.getproductLists(this.page, this.limit)
        this.getproductListLength()
        return
      } else {
        const { data: res } = await getproductListSearch(val, this.page, this.limit)
        this.getproductSearchLengths(val);

        if (res.status == 0) {
          this.tableData = res.data
          this.pageSize = this.limit
        }
      }
    },
    changePage(page) {
      this.currentPage = page
      this.getproductLists(page, this.limit)
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.title = "编辑商品"
      this.rowData = { ...row }
      // this.$refs.dialog.goodsForm = row
      // this.$refs.dialog.date1 = new Date(row.create_time.split(' ')[0])
      // this.$refs.dialog.date2 = new Date(row.create_time)
    },
    handleDelete(index, row) {
      // console.log(index);
      this.$confirm('此操作将永久删除该商品 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteProductById(row.product_id).then(res => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: res.data.message
            });
            this.http(1)
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async getproductLists(page, limit) {
      const { data: res } = await getproductList(page, limit)
      if (res.status == 0) {
        this.tableData = res.data
        this.pageSize = this.limit
      }
    },
    async getproductListLength() {
      const { data: res } = await getproductListLength()
      if (res.status == 0) {
        this.total = res.data.length
      }
    },
    async getproductSearchLengths(val) {
      const { data: res } = await getproductSearchLength(val)
      console.log(res);
      if (res.status == 0) {
        this.total = res.data.length
      }
    }
    , addGoods() {
      this.dialogVisible = true
      this.title = "添加商品"
    },
    changeDialog() {
      this.dialogVisible = false
    },
  },
  components: {
    MyPagination, GoodsDialog
  }
}
</script>

<style lang="less" scoped>
.goods {
  margin: 20px;
  .header {
    display: flex;
    button {
      margin-left: 20px;
    }
  }
  .wrapper {
    margin-top: 20px;
  }
}
</style>