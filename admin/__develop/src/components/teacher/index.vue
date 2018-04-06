<template>
  <div class="index">
    <titleban></titleban>
    <div class="active">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的实验" name="first">
          <myexp></myexp>
        </el-tab-pane>
        <el-tab-pane label="学生成绩" name="second">
          <scorelist></scorelist>
        </el-tab-pane>
        <el-tab-pane label="查看学生作业" name="third">
          <homework></homework>
        </el-tab-pane>
        <el-tab-pane label="其他" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import titleban from './page/titleban'
import myexp from './page/myexp'
import scorelist from './page/scorelist'
import homework from './page/homework';

  export default {
    name:"index",
    data() {
      return {
        activeName:"first"
      };
    },
    methods: {
      handleClick(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components:
    {
      titleban,
      myexp,
      scorelist,
      homework
    }
  }
</script>

<style scoped>
  .active {
    margin: 10px auto;
    width: 80%;
  }

</style>
