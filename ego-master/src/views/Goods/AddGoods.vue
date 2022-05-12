<template>
  <div class="add-goods">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods'}">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="myFrom">
      <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px" class="demo-goodsForm" props="category_id">
        <el-form-item label="类目选择">
          <el-button type="primary">类目选择</el-button>
        </el-form-item>
        <el-form-item label="商品名称" prop="product_name">
          <el-input v-model="goodsForm.product_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="product_price">
          <el-input v-model="goodsForm.product_price"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" required>
          <el-col :span="11">
            <el-form-item props="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="goodsForm.create_time" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item props="date1">
              <el-time-picker placeholder="选择时间" v-model="goodsForm.create_time" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="商品数量" prop="product_count">
          <el-input v-model="goodsForm.product_count"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣价" prop="name">
          <el-input v-model="goodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" props="default_img">
          <el-button type="primary">上传图片</el-button>
        </el-form-item>
        <el-form-item label="商品描述" prop="discount_price">
          <textarea cols="30" rows="10"></textarea>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('goodsForm')">确定</el-button>
          <el-button @click="resetForm('goodsForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsForm: {
        product_name: '',
        product_price: '',
        category_id: '',
        product_count: '',
        create_time: '',
        product_status: '',
        default_img: '',
        discount_price: '',
      },
      rules: {
        product_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        product_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        create_time: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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
.add-goods {
  margin: 10px;
}
.title {
  padding: 10px;
  background: #fff;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.myFrom {
  background: #fff;
  padding: 10px;
  padding-right: 30px;
}
.line {
  text-align: center;
}
</style>