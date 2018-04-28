<template>
  <div class="index">
    <titleban></titleban>
    <div class="active">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的实验" name="first">
          <myexp :tableData="tableData" @workInfo="workInfo"></myexp>
        </el-tab-pane>
        <el-tab-pane label="学生成绩" name="second">
          <scorelist :echartData="echartData" @workInfo="workInfo"></scorelist>
        </el-tab-pane>
        <el-tab-pane label="查看学生作业" name="third">
          <div style="width:60%;margin-bottom:20px;">
            <el-input placeholder="请实验名称、编号或者学生名字、编号" v-model="searchTxt" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchExp()"></el-button>
            </el-input>
         
          </div>
          <homework :tableWork="tableWork"></homework>
        </el-tab-pane>
        <el-tab-pane label="个人信息维护" name="fourth">
          <personal></personal>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import titleban from './page/titleban'
import myexp from './page/myexp'
import scorelist from './page/scorelist'
import homework from './page/homework';
import personal from './page/personal';
import store from '../../store/teacher/teacher.js'
import  host  from '../../../config/localhost.js';

  export default {
    name:"index",
    data() {
      return {
        activeName:"first",
        login_info:JSON.parse(this.$route.query.login_info),
        tableData:[],
        tableWork:[],
        echartData:[],
        searchTxt:""
      };
    },
    methods: {
      handleClick(key, keyPath) {
          if(key.index == 2){
              //获取实验作业
            store.get_work({teaID:this.login_info.recodeset.username}).then((r)=>{
              // Object.assign(this.tableData,r.data);
                this.tableWork = r.data;
            })
          }
          store.get_score({teaID:this.login_info.recodeset.username}).then((r)=>{
               this.echartData = r.data;
          });
            

      },
      workInfo(p,temp,s){
         this.activeName = "third";
         if(temp == 1){
          store.get_work({teaID:this.login_info.recodeset.username,title:p}).then((r)=>{
            this.tableWork = r.data
          })
        }else if(temp == 2){
          let lt = s.split("~");
           store.get_work({teaID:this.login_info.recodeset.username,title:p,lt:Number(lt[0]),lg:Number(lt[1])}).then((r)=>{
            this.tableWork = r.data;
          })
        }else{
          store.get_work({teaID:this.login_info.recodeset.username,expID:p}).then((r)=>{
                this.tableWork = r.data
           })
         }
    
      },
      searchExp(){
         store.get_work({teaID:this.login_info.recodeset.username,keys:this.searchTxt}).then((r)=>{
            this.tableWork = r.data
        })
      }
    },
    components:
    {
      titleban,
      myexp,
      scorelist,
      homework,
      personal
    },
    mounted:function(){
       //获取所有实验
       store.getList(this.login_info.recodeset.username).then((r)=>{
            this.tableData = r.data;
        });
        //获取实验作业
        store.get_work({teaID:this.login_info.recodeset.username}).then((r)=>{
            this.tableWork = r.data
        });
      
    }
  }
</script>

<style scoped>
  .active {
    margin: 10px auto;
    width: 80%;

  }

</style>
