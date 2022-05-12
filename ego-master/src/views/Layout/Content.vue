<template>
  <div>
    <div class="header">
      <i @click="Collapse()" v-if="isCollapse" class="iconfont icon-a-zuoduiqi3x collapse"></i>
      <i @click="NoCollapse()" v-if="!isCollapse" class="iconfont icon-a-youduiqi3x collapse"></i>
      <div class="header-right">
        <el-dropdown @command="clickLang">
          <span class="el-dropdown-link" style="color:#fff;cursor:pointer;">
            多语言<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="user">
          欢迎:{{userinfo.user}}
          <span class="laginout" @click="loginout">退出登录</span>
        </div>
      </div>
    </div>
    <div class="centent">
      <router-view />
    </div>
  </div>
</template>

<script>
import bus from '@/views/Eventbus.js'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState('loginModule', ['userinfo'])
  },
  methods: {
    ...mapMutations('loginModule', ['clearUser']),
    Collapse() {
      this.isCollapse = false,
        bus.$emit('share', this.isCollapse)
    },
    NoCollapse() {
      this.isCollapse = true,
        bus.$emit('share', this.isCollapse)
    },
    clickLang(command) {
      // console.log(command);
      this.$i18n.locale = command
    },
    loginout() {
      this.clearUser();
      localStorage.removeItem("user")
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  line-height: 50px;
  background: #1e78ef;
  color: #fff;
  .iconfont {
    font-size: 56px;
  }
  .collapse {
    cursor: pointer;
  }
  .header-right {
    float: right;
    padding-right: 20px;
    display: flex;
    font-size: 15px;
    .user {
      margin-left: 20px;
      .laginout {
        cursor: pointer;
      }
    }
  }
}
</style>