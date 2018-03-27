<template>
  <div style="height:100%;"> 
    <titleBar></titleBar>
    <el-row class="tac" style="height:100%;">
      <el-col :span="12">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import titleBar from '../components/common/titleBar'

  export default {
    name: 'home',
    created(){
     
    },
    data () {
      return {
        defaultActiveIndex: "0",
        nickname: '',
        collapsed: false
      }
    },
    methods: {
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      jumpTo(url){

      },
      logout(){

      }
    },
    mounted() {
   
    },
    components:
    {
      titleBar
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px;
  }

  .topbar-btn {
    color: #fff;
  }

  /*.topbar-btn:hover {*/

  /*background-color: #4A5064;*/

  /*}*/

  .topbar-logo {
    float: left;
    width: 59px;
    line-height: 26px;
  }

  .topbar-logos {
    float: left;
    width: 120px;
    line-height: 26px;
  }

  .topbar-logo img,
  .topbar-logos img {
    height: 40px;
    margin-top: 5px;
    margin-left: 2px;
  }

  .topbar-title {
    float: left;
    text-align: left;
    width: 200px;
    padding-left: 10px;
    border-left: 1px solid #000;
  }

  .topbar-account {
    float: right;
    padding-right: 12px;
  }

  .userinfo-inner {
    cursor: pointer;
    color: #fff;
    padding-left: 10px;
  }

  .main {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
  }

  aside {
    min-width: 50px;
    background: #333744;

  }

  .showSidebar {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-menu {
    height: 100%;
    /*写给不支持calc()的浏览器*/
    height: -moz-calc(100% - 80px);
    height: -webkit-calc(100% - 80px);
    height: calc(100% - 80px);
    border-radius: 0px;
    background-color: #333744;
    border-right: 0px;
  }

  .el-submenu .el-menu-item {
    min-width: 60px;
  }

  .el-menu {
    width: 180px;
  }

  .el-menu--collapse {
    width: 60px;
  }

  .el-menu .el-menu-item,
  .el-submenu .el-submenu__title {
    height: 46px;
    line-height: 46px;
  }

  .el-menu-item:hover,
  .el-submenu .el-menu-item:hover,
  .el-submenu__title:hover {
    background-color: #7ed2df;
  }

  .menu-toggle {
    background: #4A5064;
    text-align: center;
    color: white;
    height: 26px;
    line-height: 30px;
  }

  .content-container {
    background: #fff;
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 1px;
  }

  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }

</style>
