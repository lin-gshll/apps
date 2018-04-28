<template>
  <div id="add">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="标题" prop="no">
        <el-input v-model="ruleForm.title" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="title">
        <el-input   type="textarea" :rows="5"  placeholder="请输入内容" v-model="ruleForm.desc" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import  store from '@/store/admin/info'

  export default {
    data() {
      return {
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
                            message:"添加成功"
                        }
                    )
                    this.$router.push({
                        path:"/admin/infolist"
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
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted:function()
    {

    }
  }
</script>
<style scoped>
  #add {
    width: 80%;
    margin: 0 auto;
  }
  textarea{
     white-space: pre-wrap !important;
  }
</style>
