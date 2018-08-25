<template>
  <div id="test">{{text}}</div>

</template> 

<script>
//webpack本身是支持js语法的文件类型的，并且支持的语法只是es5的，
//所以在使用超出它理解范围范围的语法时，我们要使用一些帮它去处理这些语法的工具，
//去为我们处理这些文件
export default {
  data() {
    return {
      text: '213bas'
    }
  }
}
</script>

<style>
#test{
  color: red;
}
</style>