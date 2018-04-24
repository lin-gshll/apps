<template>
  <div class="index clearfix">
    <div class="left">
      调光贴膜是很实用的发明，他可以直接贴服在普通玻璃上使用，使其具有了调光玻璃所有的功能， 在很多参数上超过调光玻璃，投影方面尤其优秀。 调光贴膜具有运输方便，安装便捷；便于维护更换； 即贴即用等优点。
    </div>
    <div class="right flex-center flex-space">
      <el-row>
        <el-button type="primary" plain @click='goStudent()'>学生进入</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" plain @click="goAdmin()">管理员进入</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" plain @click="goTeacher()">教室进入</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>


  export default {
    name:"index",
    data() {
        return {
            "index":12
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
    }
  }
</script>

<style scoped>
  .index {
    width: 80%;
    margin: 20px auto;
  }

  .left {
    float: left;
    width: 50%;
    height: 300px;
    margin: 100px 20px;
    padding: 10px;
  }

  .right {
    float: right;
    width: 30%;
    height: 300px;
    margin: 10px;

  }

</style>
