<template>
  <div class="homework">
      <el-container>
        <el-table :data="tableWork" border>
          <el-table-column prop="title" label="实验名称" width="">
          </el-table-column>
          <el-table-column prop="stuName" label="学生" width="">
          </el-table-column>
          <el-table-column prop="stuNo" label="学号" width="">
          </el-table-column>
          <el-table-column prop="score" label="分数" width="">
            <template slot-scope="scope">
              <span>{{scope.row.score == "-1" ?"暂未批改":scope.row.score}}</span>
            </template>
          </el-table-column>
          <el-table-column label="作业" width="300px">
            <template slot-scope="scope">
              <div v-if="scope.row.workpath =='' " class="error">学生还未上传作业</div>
              <div v-if="!(scope.row.workpath =='')"> 
                <a type="text" :href="host.host+scope.row.workpath" target="_blank">
                  {{scope.row.originalname}}</a></div>
            </template>
          </el-table-column>
          <el-table-column label="批改作业" width="">
            <template slot-scope="scope">
              <el-input-number v-if="scope.row.workpath ==''" :disabled="true" v-model="scope.row.score" style="width:150px;" :min="-1" :max="10" ></el-input-number>

              <el-input-number v-if="!(scope.row.workpath =='')"  v-model="scope.row.score" size="mini" style="width:100px;"  :min="-1" :max="100" ></el-input-number>
              <el-button  v-if="!(scope.row.workpath =='')"  type="success" icon="el-icon-check" @click="correctWork(scope.row)" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-container>
  </div>
</template>
<script>
import store from '../../../store/teacher/teacher.js'
import  host  from '../../../../config/localhost.js';
    export default {
    name:"homework",
    props:["tableWork"],
    data() {
      return {
        host:host,
        score:-1
      }
    },
    methods:{
      correctWork(d){
          store.correct({
            _id:d._id,
            score:d.score
          }).then((r)=>{
            if(r.data.status==-1){
              this.$message({
                type:"error",
                message:r.data.message
              })
            }else{
              this.$message({
                type:"success",
                message:r.data.message
              })
            }
          })
      }
    }
  }
</script>
<style scoped>
.title-ban
{
  width:100%;
}
.error{
  color:red;
}
</style>
