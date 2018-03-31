<template>
  <div class="teacher">
    <el-container>
      <el-table :data="tableData" border class="mainTable">
        <el-table-column prop="_id" label="教师ID" width="">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="">
        </el-table-column>
        <el-table-column prop="college" label="院系" width="">
        </el-table-column>
        <el-table-column prop="email" label="联系邮箱" width="">
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
    <el-dialog title="编辑老师" :visible.sync="editForm">
      <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-select v-model="ruleForm.college" placeholder="请选择院系">
            <el-option v-for='(item,index) in college' :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="editForm = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import store from '@/store/admin/teacher.js';
  import college from '../../../college.js'
  export default {
    name:"teacher",
    data() {
      return {
          tableData: [],
          editForm:false,
          college:college,
          ruleForm: {
            name: '',
            sex: '',
            college:"",
            status: 0,
            password: '',
            email: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入教师姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
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
       console.log("linqian",this.college)
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
