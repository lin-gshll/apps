<template>
  <div class="index">
    <titleban></titleban>
    <div class="active">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的实验" name="first">
          <myexp :tableData="tableData"></myexp>
        </el-tab-pane>
        <el-tab-pane label="学生成绩" name="second">
          <scorelist></scorelist>
        </el-tab-pane>
        <el-tab-pane label="查看学生作业" name="third">
          <homework :tableWork="tableWork"></homework>
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
import store from '../../store/teacher/teacher.js'
import  host  from '../../../config/localhost.js';

  export default {
    name:"index",
    data() {
      return {
        activeName:"first",
        login_info:JSON.parse(this.$route.query.login_info),
        tableData:"",
        tableWork:""
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
    },
    mounted:function(){
       //获取所有实验
       store.getList(this.login_info.recodeset.username).then((r)=>{
           // Object.assign(this.tableData,r.data);
            this.tableData = r.data
        });
        if(this.$route.query.status){
          //获取实验作业
          this.activeName = "third";
          store.get_work({teaID:this.login_info.recodeset.username,expID:this.$route.query.expID}).then((r)=>{
            // Object.assign(this.tableData,r.data);
              this.tableWork = r.data
          })
        }else{
           //获取实验作业
         store.get_work({teaID:this.login_info.recodeset.username}).then((r)=>{
           // Object.assign(this.tableData,r.data);
            this.tableWork = r.data
        })
        }
       
    }
  }
</script>

<style scoped>
  .active {
    margin: 10px auto;
    width: 80%;
  }

</style>
