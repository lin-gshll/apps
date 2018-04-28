<template>
    <div class="title-bar bg-grey ft-20">
        <div class="l-h-60 title-con flex">
            <div class="flex">
                 <span class="title-icom">  
                 
                 </span> 
                 <span style="margin-left:10px;">
                        实验教务管理系统 &nbsp;&nbsp;&nbsp;&nbsp;  <span class="ft-24" style="color:#b2b267;">学生端 </span> 
                 </span>
            </div>
            <div style="position:absolute;right:2%;" v-if="isLogin">
              <el-button type="text" @click.stop="" >{{userName}}</el-button>
                &nbsp;|
              <el-button type="text" @click="goOut">退出</el-button>
            </div>
            <div style="position:absolute;right:2%;" v-if="!isLogin">
              <el-button type="text"  @click="goLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "titleBar",
  data() {
    return {
      isLogin:false,
      userName: JSON.parse(sessionStorage.getItem("stu_info")).username || "admin"
    };
  },
  methods: {
      goOut(){
        this.$router.push({
          path:"/"
        })
        sessionStorage.setItem("stu_info","");
      },
      goLogin(){
         this.$router.push({
          path:"/student"
        })
      }
  },
  mounted: function() {
      if(sessionStorage.getItem("stu_info")){
        this.isLogin = true;
      }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
  align-items: center;
}
.title-bar {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px !important;
  border: 1px solid #ccc;
}
.title-icom {
  display: inline-block;
  height: 60px;
  width: 100px;
  
  background: url("../../../assets/stu.png") no-repeat;
  background-position: 50px 10px;
  background-size:40px 40px; 
}
.login {
  margin-right: 150px;
}
</style>