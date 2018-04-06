<template>
  <div class="explist">
    <el-container>
      <el-table :data="tableData" border>
        <el-table-column prop="no" label="编号" width="">
        </el-table-column>
        <el-table-column prop="title" label="实验名称" width="">
        </el-table-column>
        <el-table-column prop="college" label="开课学院" width="">
        </el-table-column>
        <el-table-column prop="start" label="实验时间" width="">
          <template slot-scope="scope">
            {{scope.row.start}} <br>{{scope.row.end}}
          </template>
        </el-table-column>
        <el-table-column label="指导说明" width="">
          <template slot-scope="scope">
            <a type="text" :href="host.host+scope.row.guidBook" download="scope.row.guidBook">{{scope.row.originalname}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="place" label="实验地点" width="">
        </el-table-column>
        <el-table-column label="实验说明与作业" width="">
          <template slot-scope="scope">
            <el-button type="text" @click="desc(scope.row)" size="small">作业</el-button>
            <!--<el-button type="text" @click="del(scope.row)" size="small">删除</el-button>-->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="text" @click="addWork(scope.row)" size="small">预约实验</el-button>
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
    data() {
      return {
          tableData:[],
          host:host,
          dialogTableVisible:false,
          instru:"",
          _id:""
          
      }
    },
    mounted:function()
    {
          
        store.getList().then((r)=>{
           // Object.assign(this.tableData,r.data);
            this.tableData = r.data
        })
    },
    methods:{
        desc(d){
          this.instru = d.instru;
            this._id = d._id;
            this.dialogTableVisible = true;
        },
        addWork(d){
          let stu_info = JSON.parse(sessionStorage.getItem("stu_info"));
          console.log(stu_info);
          console.log(d);
          let param={
              "stuID":stu_info.login_info.recodeset._id,
               "expID":d._id,
               "status":0,
               "teaID":d.teaID,
               "title":d.title,
               "no":d.no,
               "instru":d.instru,
               "college":d.college,
               "end":d.end
          }
          store.add_exp(param).then((r=>{
            console.log(r);
            if(r.data.status == -1)
            {
              this.$message({
                type:"error",
                message:r.data.message
             })
            }else {
              this.$message({
                type:"success",
                message:r.data.message
             })
            }
           
          }))
        }
    }
  }
</script>
<style scoped>
  .title-ban {
    width: 100%;

  }

</style>
