<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy accordion @node-click="nodeclick">
    </el-tree>
  </div>
</template>

<script>
import { getCategoryListById, getCategoryListByParentId } from '@/api/productAPI.js'
export default {
  data() {
    return {
      props: {
        label: 'category_name',
        children: 'zones',
        isLeaf: 'leaf'
      },
    };
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        getCategoryListById().then(res => {
          if (res.data.data.length > 0) {
            return resolve(res.data.data);
          }
        })
      }
      if (node.level == 1) {
        getCategoryListByParentId(node.data.category_id).then(res => {
          if (res.data.status == 0) {
            return resolve(res.data.data);
          }
        })
      }
      if (node.level == 2) {
        getCategoryListByParentId(node.data.category_id).then(res => {
          if (res.data.status == 0) {
            return resolve(res.data.data);
          }
        })
      }
      if (node.level == 3) {
        return resolve([]);
      }
    },
    nodeclick(data, node) {
      this.$emit('sendTreeData', data)
    }
  }
};
</script>

<style>
</style>