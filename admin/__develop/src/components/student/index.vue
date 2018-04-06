<template>
  <div class="index">
    <titleban></titleban>
    <el-tabs tab-position="left" style="height: 800px;width:85%;margin:0 auto;">
      <el-tab-pane label="我的实验">
         <exp></exp>
      </el-tab-pane>
      <el-tab-pane label="我的作业">
        <work></work>
      </el-tab-pane>
      <el-tab-pane label="预约实验">
         <explist :stu_id="stu_id"></explist>
      </el-tab-pane>
      <el-tab-pane label="个人信息管理">
        <info></info>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import echarts from 'echarts'
    import titleban from './page/titleban.vue'
    import exp from './page/exp.vue'
    import explist from './page/explist.vue'
    import info from './page/info.vue'
    import work from './page/work.vue'
    export default {
        data() {
            return {
             stu_id:""
            }
        },

        methods: {
          
        },
        components:{
            titleban,
            exp,
            explist,
            info,
            work
        },
        mounted: function () {
            console.log()
        },
        updated: function () {
          
        }
    }
</script>

<style scoped>
  .index {
    width: 100%;
    height: 100%;
    background: ghostwhite;
  }

</style>
