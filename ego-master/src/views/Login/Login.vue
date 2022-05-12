<template>
  <div>
    <div class="login-box">
      <h3 class="title">登录界面</h3>
      <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getLogin } from "@/api/Login/Login.js"
import { mapMutations } from 'vuex'
import jwt from 'jwt-decode'
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    ...mapMutations('loginModule', ['setUser']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { username, password } = this.loginForm
          getLogin(username, password).then(res => {
            if (res.data.status === 0) {
              this.$message({
                message: res.data.message,
                type: 'success'
              });
              let obj = {
                user: res.data.username,
                token: res.data.token,
              }
              this.setUser(obj)
              localStorage.setItem('user', JSON.stringify(obj))
              this.$router.push('/')
            } else {
              this.$message.error(res.data.message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  width: 400px;
  height: 300px;
  margin: 150px auto;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
  background: #fff;
}
.title {
  margin-bottom: 20px;
  text-align: center;
  color: #666;
}
</style>