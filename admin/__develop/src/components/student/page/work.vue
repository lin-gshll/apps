<template>
  <div class="work">
    <el-container>
      <el-table :data="tableData" border>
        <el-table-column prop="no" label="编号">
        </el-table-column>
        <el-table-column prop="title" label="实验名称">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.status === '进行中' ? 'success' : 'primary'" close-transition>{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" >
           <template slot-scope="scope">
            <span>{{scope.row.score == "-1" ?"暂未批改":scope.row.score}}</span>
          </template>
        </el-table-column>
        <el-table-column label="作业">
          <template slot-scope="scope">
            <div v-if="scope.row.workpath =='' ">您还未上传作业</div>
            <div v-if="!(scope.row.workpath =='')">{{scope.row.workpath}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="delWork(scope.row,scope.$index,tableData)" size="small">上传作业</el-button>
            <!--<el-button type="text" @click="del(scope.row)" size="small">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-dialog title="实验说明与作业" :visible.sync="dialogTableVisible" width="50%" center>
      <div style=" white-space: pre-wrap;max-height:300px;overflow-y:auto;">{{instru}}</div>
    </el-dialog>
    <el-dialog title="上传作业" :visible.sync="dialogForm" width="50%" center>
      <el-form :model="form">
        <el-form-item label="上传作业" prop="work">
          <el-upload class="upload-demo" :action="importFileUrl" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
            multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList" :on-success="fileSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传zip,word,pdf,excel文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="add_work()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  import  host  from '../../../../config/localhost.js';
  import  store  from '@/store/student/student.js';
    export default {
    name:"work",
    props:["tableData"],
    data() {
      return {
          host:host,
          importFileUrl:host.host+ "/api/student/file",
          dialogTableVisible:false,
          dialogForm:false,
           fileList:[],
          instru:"",
          form:{
            work:"",
            originalname:""
          },
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
          this.form= d;
          this.dialogForm = true;
        },
        add_work(){
        
          // this.form.scoreID = this.form._id;
          // delete this.form.__v;
          // delete this.form._id;
          store.add_work(this.form).then((r)=>{
            if(r.data.status == 1){
              this.$message({
                type:"success",
                message:r.data.message
              })
            }else{
              this.$message({
                type:"error",
                message:r.data.message
              })
            }
            this.dialogForm = false;
            this.fileList=[];
          })
        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      fileSuccess(res, file, fileList)
      {
        this.form.workpath=res.message.path;
        this.form.originalname=res.message.originalname;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
      
    }
  }
</script>
<style scoped>
  .primary {
    color: #409EFF;
  }

  .success {
    color: #67C23A;
  }

</style>
