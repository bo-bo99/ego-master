<template>
  <div style="text-align:center;margin:20px">
    <el-pagination :current-page.sync="currentPages" :page-size="pageSize" @current-change="changePage" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  created() {

  },
  data() {
    return {
      currentPages: this.currentPage
    }
  },
  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 5
    },
    currentPage: {
      type: Number,
      default: 3
    }
  },

  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    }
  },
}
</script>

<style>
</style>