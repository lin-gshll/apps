<template>
  <div class="personal">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系邮箱" prop="email">
        <el-input type="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="college">
        <el-select v-model="ruleForm.college" placeholder="请选择院系">
          <el-option v-for='(item,index) in college' :key="index" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设置密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import  store from '@/store/admin/teacher'
  import college from '../../college.js'
     export default {
            name:"index",
            data() {
                return {
                    college:college,
                    ruleForm: {
                            _id:JSON.parse(this.$route.query.login_info).recodeset._id,
                            name: JSON.parse(this.$route.query.login_info).recodeset.username,
                            sex: '男',
                            college:JSON.parse(this.$route.query.login_info).recodeset.college,
                            status: 0,
                            password: '',
                            email: JSON.parse(this.$route.query.login_info).recodeset.email,
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
                                { required: true, message: '请输入邮箱', trigger: 'change' },
                                 { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                            ],
                            password: [
                                { required: true, message: '请输入密码', trigger: 'change' }
                            ]
                            }
                }
            },
            methods:{
                submitForm(formName) {
                    let that = this;
                    this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(JSON.parse(this.$route.query.login_info));
                        that.ruleForm._id = JSON.parse(this.$route.query.login_info).recodeset._id;
                        store.doAdd(that.ruleForm).then((r)=>
                        {
                            if(r.data.status == 1)
                            {
                                this.$message({
                                            type:"success",
                                            message:"修改成功，请重新登录"
                                        })
                                this.$router.push({
                                    path:"/teacher"
                                })
                            }else 
                            {
                                this.$message(
                                    {
                                        type:"error",
                                        message:r.data.message
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
         }
}
</script>
<style scoped>


</style>
