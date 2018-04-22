<template>
  <div class="exp">
    <el-container>
      <el-table :data="tableData" border>
        <el-table-column prop="no" label="编号" width="">
        </el-table-column>
        <el-table-column prop="title" label="实验名称" width="">
        </el-table-column>
        <el-table-column prop="college" label="开课学院" width="">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="">
            <template slot-scope="scope">
          <span
          :class="scope.row.status === '进行中' ? 'success' : 'primary'"
          close-transition>{{scope.row.status}}</span>
      </template>
        </el-table-column>
        <!--<el-table-column prop="score" label="分数" width="">
        </el-table-column>-->
        <el-table-column label="实验说明与作业" width="">
          <template slot-scope="scope">
            <el-button type="text" @click="desc(scope.row)" size="small">《{{scope.row.title}}》课后作业</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="text"  @click.native.prevent="delWork(scope.row,scope.$index,tableData)" size="small">取消预约</el-button>
            <!--<el-button type="text" @click="del(scope.row)" size="small">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-dialog title="实验说明与作业" :visible.sync="dialogTableVisible" width="50%" center>
      <div style=" white-space: pre-wrap;max-height:300px;overflow-y:auto;">{{instru}}</div>
    </el-dialog>
  </div>
</template>
<script>

  import  host  from '../../../../config/localhost.js';
  import  store  from '@/store/student/student.js';
    export default {
    name:"explist",
    props:["tableData"],
    data() {
      return {
          host:host,
          dialogTableVisible:false,
          instru:"",
          _id:""
          
      }
    },
    mounted:function()
    {
         console.log(this.tableData);
    },
    methods:{
        desc(d){
            this.instru = d.instru;
            this._id = d._id;
            this.dialogTableVisible = true;
        },
        delWork(d,i,rows){
          store.del_exp({"_id":d._id,"stuID":d.stuID}).then((r)=>{
            if(r.data.status == 1){
              rows.splice(i,1);
              this.$message({
                type:"success",
                message:r.data.message
              })
            }else{
              this.$message({
                type:"error",
                message:r.data.message
              });
            }
          })
        }
      
    }
  }
</script>
<style scoped>
  .title-ban {
    width: 100%;

  }
  .primary{
    color:#409EFF;
  }
  .success{
    color:#67C23A;
  }

</style>
