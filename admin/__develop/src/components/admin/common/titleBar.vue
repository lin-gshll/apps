<template>
    <div class="title-bar bg-white ft-20">
        <div class="l-h-60 title-con flex">
            <div class="flex">
                 <span class="title-icom">  
                 
                 </span> 
                 <span style="margin-left:10px;">
                        活动管理平台
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
      isLogin: false,
      userName: ""
    };
  },
  methods: {
    goLogin: function() {
      this.$router.push({ path: "/" });
    },
    goOut: function() {
      this.$router.push({ path: "/" });
    }
  },
  mounted: function() {
    this.userName = GData.loginInfo.loginnm
    if (this.userName) {
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
  background: url("images/logo1.png") no-repeat;
  background-position: 10px 10px;
}
.login {
  margin-right: 150px;
}
</style>