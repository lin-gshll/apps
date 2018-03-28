<template>
  <div class="student">
    <el-container>
      <el-table :data="tableData" border class="mainTable">
        <el-table-column prop="no" label="编号" width="">
        </el-table-column>
        <el-table-column prop="title" label="实验名称" width="">
        </el-table-column>
        <el-table-column prop="college" label="开课学院" width="">
        </el-table-column>
        <el-table-column prop="start" label="实验开始时间" width="">
        </el-table-column>
        <el-table-column prop="end" label="实验结束时间" width="">
        </el-table-column>
        <el-table-column prop="teaID" label="指导教师" width="">
        </el-table-column>
        <el-table-column prop="created" label="创建时间" width="">
        </el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)" size="small">编辑</el-button>
            <el-button type="text" @click="del(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-dialog title="编辑学生" :visible.sync="editForm">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="编号" prop="no">
          <el-input v-model="ruleForm.no"></el-input>
        </el-form-item>
        <el-form-item label="实验名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="开课学院" prop="college">
          <el-select v-model="ruleForm.college" placeholder="请选择院系">
            <el-option v-for='(item,index) in college' :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验时间">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="开始时间" v-model="ruleForm.start" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="结束时间" v-model="ruleForm.end" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="开课状态">
          <el-select v-model="ruleForm.status" placeholder="请选择开课状态">
            <el-option v-for='(item,index) in status' :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指导说明" prop="title">
          <el-input v-model="ruleForm.guidBook"></el-input>
        </el-form-item>
        <el-form-item label="指导教师" prop="teaID">
          <el-select v-model="ruleForm.teaID" placeholder="请选择院系">
            <el-option v-for='(item,index) in teacherList' :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import store from '@/store/admin/exp.js';
  import college from "../../../college.js"
  export default {
    name:"student",
    data() {
      return {
         college:college,
          tableData: [],
          editForm:false,
          ruleForm: {
            title: '',
            status: '',
            no:'',
            college:"",
            start:"",
            end: 0,
            teaID: '',
            guidBook: '',

        },
        rules: {
          name: [
            { required: true, message: '请输入教师姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          class: [
            { required: true, message: '请选择班级', trigger: 'change' }
          ],
           college: [
            { required: true, message: '请选择院系', trigger: 'change' }
          ],
           email: [
            { required: true, message: '请输入邮箱', trigger: 'change' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        }
      }
        
    },
    methods: {
      del(d) {
        store.delTeacher(d._id.toString()).then((r)=>{
          if(r.data.status == 1){
            this.$message({
              type:"success",
              message:r.data.message
            })   
            for(var i=0;i<this.tableData.length;i++){
              if(this.tableData[i]._id == d._id.toString())
              {
                this.tableData.splice(i,1);
              }
            }
          } else{
             this.$message({
              type:"error",
              message:r.data.message
            })
          }         
        })
      },
      edit(d){
        this.editForm = true;
        Object.assign(this.ruleForm,d);
      },
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            store.doAdd(that.ruleForm).then((r)=>
            {
                if(r.data.status == 1)
                {
                    this.$message(
                        {
                            type:"success",
                            message:"修改成功"
                        }
                    )
                    this.editForm = false;
                    store.getList().then((r)=>{
                        this.tableData= r.data;
                        for(var i=0;i<this.tableData.length;i++){
                          this.tableData[i].created = this.tableData[i].created.slice(0,10);
                        }
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
     mounted:function(){
         store.getList().then((r)=>{
            this.tableData= r.data;
            for(var i=0;i<this.tableData.length;i++){
              this.tableData[i].created = this.tableData[i].created.slice(0,10);
            }
        })
    }
  }
</script>

<style scoped>
  body {
    background: #DFE9FB;
  }

</style>
