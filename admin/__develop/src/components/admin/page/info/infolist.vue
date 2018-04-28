<template>
  <div id="add">
      <el-table :data="tableData" border class="mainTable">
        <el-table-column prop="title" label="标题" width="">
        </el-table-column>
        <el-table-column prop="desc" label="内容" width="">
            <template slot-scope="scope">
                <el-button type="text" @click="desc(scope.row)" size="small">{{scope.row.desc.slice(0,20)}}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="admin" label="发布人" width="">
        </el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
             <el-button type="text" @click="topInfo(scope.row)" size="small">置顶</el-button>
            <el-button type="text" @click="editInfo(scope.row)" size="small">编辑</el-button>
            <el-button type="text" @click="delInfo(scope.row,scope.$index)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-dialog title="实验说明与作业" :visible.sync="dialogTableVisible" width="50%" center>
      <div style=" white-space: pre-wrap;max-height:300px;overflow-y:auto;">{{instru}}</div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="dialogTableVisible1" width="50%" center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="标题" prop="no">
            <el-input v-model="ruleForm.title" placeholder="请输入标题" ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="title">
            <el-input   type="textarea" :rows="5"  placeholder="请输入内容" v-model="ruleForm.desc" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import  store from '@/store/admin/info'

  export default {
    data() {
      return {
          tableData:[],
          dialogTableVisible:false,
          dialogTableVisible1:false,
          instru:"",
          ruleForm: {
              admin:JSON.parse(sessionStorage.getItem('user')).username,
              title: '',
              desc:""
          },
          rules: {
              title: [
                { required: true, message: '请输入实验名称', trigger: 'blur' },
                { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
              ],
              desc: [
                { required: true, message: '请输入公告内容', trigger: 'change' }
              ],
          }
      }
    },
    methods: {
      desc(d){
           this.instru = d.desc;
          
            this.dialogTableVisible = true;
        },
        delInfo(d,i){
          store.delInfo({_id:d._id}).then((r)=>{
            if(r.data.status == 1){
              this.$message({
                type:"success",
                message:"删除成功"
              })
              this.tableData.splice(i,1);
            }else{
              this.$message({
                type:"success",
                message:"删除失败"
              })
            }
          })
        },
        topInfo(d){
           store.addInfo({top:1,_id:d._id}).then((r)=>{
             if(r.data.status == 1){
               this.$message({
                 type:"success",
                 message:"置顶成功"
               })
             }else{
               this.$message({
                 type:"error",
                 message:"置顶失败"
               })
             }
           })
        },
        editInfo(d){
          this.dialogTableVisible1 = true;
          this.ruleForm = d;
        },
        submitForm(formName) {
              let that = this;
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  store.addInfo(that.ruleForm).then((r)=>
                  {
                      if(r.data.status == 1)
                      {
                          this.$message(
                              {
                                  type:"success",
                                  message:"修改成功"
                              }
                          )
                          this.dialogTableVisible1 =false;
                          this.$router.push({
                              path:"/admin/infolist"
                            })
                      }else 
                      {
                          this.$message(
                              {
                                  type:"error",
                                  message:"修改失败"
                              }
                          )
                      }
                  })
                } else {
                  this.$message(
                      {
                          type:"error",
                          message:"请填写完整信息"
                      }
                  )
                  return false;
                }
              });
      }
    },
    mounted:function()
    {
        store.infoList().then((r)=>{
            console.log(r.data);
          this.tableData = r.data;
        })
    }
  }
</script>
<style>
  textarea{
     white-space: pre-wrap !important;
  }

</style>
