<template>
  <div id="main"></div>
</template>

<script>
import E from 'wangeditor'
export default {
  data() {
    return {
      editor: ''
    }
  },
  mounted() {
    this.editor = new E('#main')
    this.editor.create();
    this.editor.config.focus = false
    this.editor.config.onchange = (newHtml) => {
      // console.log("change 之后最新的 html", newHtml);
      this.$emit('sendEditor', newHtml)
    };
  }
}
</script>

<style>
</style>