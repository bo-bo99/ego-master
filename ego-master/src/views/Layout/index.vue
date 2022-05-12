<template>
  <div class="layout">
    <MyMenu class="menu"></MyMenu>
    <Content class="content" :class="{isActive:isCollapse}"></Content>
  </div>
</template>

<script>
import MyMenu from './Mymenu.vue';
import Content from './Content.vue';
import bus from "@//views/Eventbus.js";
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  created() {
    bus.$on("share", (val) => {
      this.isCollapse = val
    })
  },
  components: {
    MyMenu, Content
  }
}
</script>

<style lang="less" scoped>
.layout {
  .menu {
    background: #1b3554;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .content {
    margin-left: 200px;
    transition: 0.6s all;
  }
  .isActive {
    margin-left: 64px;
    transition: 0.4s all;
  }
}
</style>