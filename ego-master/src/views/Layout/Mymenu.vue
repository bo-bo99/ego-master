<template>
  <div>
    <el-menu :collapse="isCollapse" default-active="$router.path" class="el-menu-vertical-demo" background-color="#1b3554" text-color="#fff" active-text-color="#ffd04b" router>
      <el-menu-item>
        <span slot="title">易购后台管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">首页</span> -->
        <span slot="title">{{ $t("menu.home") }}</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">商品管理</span> -->
        <span slot="title">{{ $t("menu.goods") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-document"></i>
        <!-- <span slot="title">规格参数</span> -->
        <span slot="title">{{ $t("menu.params") }}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-setting"></i>
        <!-- <span slot="title">广告管理</span> -->
        <span slot="title">{{ $t("menu.advertment") }}</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <!-- <span>订单管理</span> -->
          <span slot="title">{{ $t("menu.order") }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/order-list">
            <i class="el-icon-location"></i>
            订单列表
          </el-menu-item>
          <el-menu-item index="/order/order-back">
            <i class="el-icon-location"></i>
            订单退货
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import bus from "@//views/Eventbus.js";
export default {
  created() {
    bus.$on("share", (val) => {
      this.isCollapse = val
    })
  },
  data() {
    return {
      isCollapse: false
    }
  }
  ,
  methods: {

  }
}
</script>

<style lang="less">
.el-menu {
  border-right: 0;
  .is-active {
    background: #054476 !important;
    color: #fff !important;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>