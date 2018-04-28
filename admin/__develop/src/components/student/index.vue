<template>
  <div class="index">
    <titleban></titleban>
    <el-tabs tab-position="left" style="min-height:600px;width:85%;margin:10px auto;" @tab-click="tabClick">
      <div style="width:100%;margin:5px auto;" v-show="isShow">
        <el-input :placeholder="placeholder" v-model="searchTxt" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchExp()"></el-button>
        </el-input>
      </div>
      <el-tab-pane label="我的实验">
        <exp :tableData="tableData"></exp>
      </el-tab-pane>
      <el-tab-pane label="我的作业">
        <work :tableData="tableData"></work>
      </el-tab-pane>
      <el-tab-pane label="预约实验">
        <explist :tableExp="tableExp"></explist>
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
    import  store  from '@/store/student/student.js';
    export default {
        data() {
            return {
             isShow:true,
             stu_id:"",
             tableData:[],
             types:"",
             searchTxt:"",
             tableExp:[],
             placeholder:"请实验名称、编号或学院信息"
            }
        },

        methods: {
          tabClick(e){
            if(e.index == 3){
              this.isShow = false;
            }else{
              this.isShow = true;
            }
            this.searchTxt ="";
            this.types = e.index;
            if(e.index == 0 || e.index==1){
                  this.placeholder ="请实验名称、编号或学院信息";
               let stu_info = JSON.parse(sessionStorage.getItem("stu_info"));
               let param={
                    "stuID":stu_info.login_info.recodeset._id,
                }
              store.get_myexp(param).then((r)=>{
                  this.tableData = r.data;
                  this.tableData.forEach(function(item,index,arr){
                    let start = new Date(Date.parse(item.start));
                     let end = new Date(Date.parse(item.end));
                     let d = new Date();
                     if(d>end){
                       arr[index].status = "已结束";
                     }else if(d <start){
                       arr[index].status = "未开始";
                     }else{
                       arr[index].status = "进行中";
                     }
                  })
            })
            }else{
                this.placeholder ="请实验名称、编号或学院信息、说明等信息";
                store.getList().then((r)=>{
                     this.tableExp = r.data;
                })
            }
          },
          searchExp(){
            if(this.types == 0 || this.types == 1){ 
                let stu_info = JSON.parse(sessionStorage.getItem("stu_info"));
                let param={
                    "stuID":stu_info.login_info.recodeset._id,
                    "keys":this.searchTxt
                }
              store.get_myexp(param).then((r)=>{
                  this.tableData = r.data;
                  this.tableData.forEach(function(item,index,arr){
                    let start = new Date(Date.parse(item.start));
                     let end = new Date(Date.parse(item.end));
                     let d = new Date();
                     if(d>end){
                       arr[index].status = "已结束";
                     }else if(d <start){
                       arr[index].status = "未开始";
                     }else{
                       arr[index].status = "进行中";
                     }
                  })  
             })
            }else if(this.types == 2){

              store.getList(this.searchTxt).then((r)=>{
                 this.tableExp = r.data;
           })
            }
          }
        },
        components:{
            titleban,
            exp,
            explist,
            info,
            work
        },
        created: function () {
            let stu_info = JSON.parse(sessionStorage.getItem("stu_info"));
            let param={
                    "stuID":stu_info.login_info.recodeset._id,
                }
            store.get_myexp(param).then((r)=>{
                  this.tableData = r.data;
                  this.tableData.forEach(function(item,index,arr){
                    let start = new Date(Date.parse(item.start));
                     let end = new Date(Date.parse(item.end));
                     let d = new Date();
                     if(d>end){
                       arr[index].status = "已结束";
                     }else if(d <start){
                       arr[index].status = "未开始";
                     }else{
                       arr[index].status = "进行中";
                     }
                  })
            });  
           store.getList().then((r)=>{
                 this.tableExp = r.data;
           })
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
