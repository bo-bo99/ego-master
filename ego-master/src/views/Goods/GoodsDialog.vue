<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <el-form :model="goodsForm" :rules="rules" ref="rulesForm" label-width="100px" class="demo-goodsForm" props="category_id">
        <el-form-item label="类目选择">
          <el-button type="primary" @click="innerVisible=true">类目选择</el-button>
          <span>{{category_name}}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="product_name">
          <el-input v-model="goodsForm.product_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="product_price">
          <el-input v-model="goodsForm.product_price"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="product_status">
          <el-input v-model="goodsForm.product_status"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" required>
          <el-col :span="11">
            <el-form-item props="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item props="date2">
              <el-time-picker placeholder="选择时间" v-model="date2" style="width: 100%;" fromat="'HH:mm:ss'"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="商品数量" prop="product_count">
          <el-input v-model="goodsForm.product_count"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣价" prop="discount_price">
          <el-input v-model="goodsForm.discount_price"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" props="default_img">
          <el-button type="primary" @click="innerVisibleImg=true">上传图片</el-button>
          <img :src="goodsForm.default_img" height="200px">
        </el-form-item>
        <el-form-item label="商品描述" props="product_desc">
          <wangEditor ref="MyEditor" @sendEditor='sendEditor'></wangEditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('goodsForm')">确定</el-button>
          <el-button @click="resetForm('goodsForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </span>
      <el-dialog width="40%" title="类目选择" :visible.sync="innerVisible" append-to-body>
        <TreeGoods @sendTreeData="sendTreeData"></TreeGoods>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog width="40%" title="上传图片" :visible.sync="innerVisibleImg" append-to-body>
        <UploadImg @sendImageUrl="sendImageUrl"></UploadImg>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import TreeGoods from '@/views/Goods/TreeGoods.vue'
import UploadImg from '@/views/Goods/UploadImg.vue'
import wangEditor from '@/views/Goods/wangEditor.vue'
import { getCategoryBycategoryName, Addproduct, updateProductById } from '@/api/productAPI.js'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    rowData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      innerVisible: false,
      innerVisibleImg: false,
      imgUrl: '',
      treeData: {},
      date1: '',
      date2: '',
      category_name: '',
      goodsForm: {
        product_id: '',
        category_id: '',
        product_name: '',
        product_price: '',
        product_count: '',
        create_time: '',
        product_status: '',
        default_img: '',
        discount_price: '',
        product_desc: ''
      },
      rules: {
        category_name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
        ],
        product_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        product_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        date1: [
          { required: true, type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { required: true, type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        product_count: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        product_status: [
          { required: true, message: '请选择商品状态', trigger: 'blur' }
        ],
        discount_price: [
          { required: true, message: '请填写商品折扣', trigger: 'blur' }
        ],
        product_desc: [
          { message: '请填写商品描述', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    rowData(val) {
      this.goodsForm = val
      this.date1 = new Date(val.create_time.split(' ')[0])
      this.date2 = new Date(val.create_time)
      this.$nextTick(() => {
        this.$refs.MyEditor.editor.txt.html(val.product_desc);
      })
    }
  },
  methods: {
    toLocaleString(time) {
      return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()} ${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()} : ${time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()} : ${time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()}`;
    },
    submitForm() {
      this.$refs.rulesForm.validate((valid) => {
        if (valid) {
          this.goodsForm.create_time = this.toLocaleString(this.date2)
          if (this.title == '添加商品') {
            Addproduct(this.goodsForm).then(res => {
              if (res.data.status == 0) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                });
                this.http(1)
                this.$refs.rulesForm.resetFields();
                this.$refs.MyEditor.editor.txt.clear()
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                });
              }
            })
          } else {
            updateProductById(this.goodsForm).then(res => {
              if (res.data.status == 0) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                });
                this.http(1)
                this.$refs.rulesForm.resetFields();
                this.$refs.MyEditor.editor.txt.clear()
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                });
              }
            })
          }
        } else {
          this.$message.error('表单填写错误');
          return false;
        }
      });
    },
    resetForm() {
      this.date1 = ''
      this.date2 = ''
      this.goodsForm = {
        product_id: '',
        category_id: '',
        product_name: '',
        product_price: '',
        product_count: '',
        create_time: '',
        product_status: '',
        default_img: '',
        discount_price: '',
        product_desc: ''
      }
      this.$refs.MyEditor.editor.txt.clear()
    },
    closeDialog() {
      this.$emit('changeDialog')
    },
    handleClose() {
      this.closeDialog();
      if (this.title == '编辑商品') {
        this.date1 = ''
        this.date2 = ''
        this.goodsForm = {
          product_id: '',
          category_id: '',
          product_name: '',
          product_price: '',
          product_count: '',
          create_time: '',
          product_status: '',
          default_img: '',
          discount_price: '',
          product_desc: ''
        }
        this.$refs.MyEditor.editor.txt.clear()
      } else {
        this.$refs.rulesForm.resetFields();
        this.$refs.MyEditor.editor.txt.clear()
      }
    },
    sendTreeData(val) {
      // console.log(val);
      this.treeData = val
    },
    showTreeData() {
      this.innerVisible = false
      this.category_name = this.treeData.category_name
      getCategoryBycategoryName(this.category_name).then(res => {
        this.goodsForm.category_id = res.data.data[0].category_id
      })
    },
    sendImageUrl(val) {
      this.imgUrl = val
    },
    showImg() {
      this.innerVisibleImg = false
      this.goodsForm.default_img = this.imgUrl
    },
    sendEditor(val) {
      this.goodsForm.product_desc = val
    },
    cancel() {
      innerVisible = false
    }
  },
  components: {
    TreeGoods, UploadImg, wangEditor
  }
}
</script>

<style>
</style>