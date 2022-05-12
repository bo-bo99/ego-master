<template>
  <div>
    <el-upload class="upload-demo" ref="upload" :action="url" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-success="successUpload">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { UploadImg } from '@/api/productAPI.js'
export default {
  data() {
    return {
      url: 'http://localhost:8889/admin/upload',
      fileList: []
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    successUpload(response, file, fileList) {
      // console.log("上传成功", response, file, fileList);
      if (response.res_code == 0) {
        this.$message({
          message: '恭喜你，图片上传成功!',
          type: 'success'
        });
        let imageUrl = 'http://localhost:8889/' + response.url.slice(7)
        this.$emit('sendImageUrl', imageUrl)
      }
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style>
</style>