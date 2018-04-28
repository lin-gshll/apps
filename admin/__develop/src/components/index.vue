<template>
  <div class="index clearfix">
    <div class="left" >
      <div class="ft-18-b bg" >
        最新公告
      </div>
      <div style=" white-space: pre-wrap;  padding-left:50px;">
         {{desc}}
      </div>
     
    </div>
    <div class="right flex-center flex-space">
      <el-row>
        <el-button type="primary" plain @click='goStudent()'>学生进入</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" plain @click="goAdmin()">管理员进入</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" plain @click="goTeacher()">教师进入</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>

import  store from '@/store/admin/info'

  export default {
    name:"index",
    data() {
        return {
            "index":12,
            desc:""
        }
    },
    methods:{
        goStudent(){
             this.$router.push({path:"student"})
        },
          goAdmin(){
             this.$router.push({path:"admin"})
        },
          goTeacher(){
             this.$router.push({path:"teacher"})
        }
    },
    mounted:function(){
      store.infoList().then((r)=>{
            console.log(r.data);
          this.desc = r.data[0].desc;
        })
    }
  }
</script>

<style scoped>
  body {
    overflow: hidden;
  }

  .index {
    width: 80%;
    margin: 20px auto;
    overflow: hidden;
  }

  .left {
    float: left;
    width: 50%;
    margin: 100px 10px;
    padding: 10px;
  
  }

  .right {
    float: right;
    width: 40%;
    height: 300px;
    margin: 10px;
  }
  .right div{
    margin-left: 20px;
  }
  .bg{
    background: url('../assets/hot.png') no-repeat ;
    background-position:0 2px;
    background-size:20px 20px;  
    padding-left:26px;
  }

</style>
