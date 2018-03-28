import Vue from 'vue'
import Router from 'vue-router'
//管理员
import login from '@/components/admin/login'
import index from "@/components/admin/index"
import test from "@/components/admin/page/test"
import teacherList from "@/components/admin/page/teacher/teacher"
import addTeacher from "@/components/admin/page/teacher/add"
import studentList from "@/components/admin/page/student/student"
import addStudent from "@/components/admin/page/student/add"
import expList from "@/components/admin/page/exp/exp"
import addexp from "@/components/admin/page/exp/add"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: '',
      component: login,
      hidden: true
    },
    {
      path: '/index',
      component: index,
      name: '实验管理',
      iconCls: 'el-icon-message', //图标样式class
      children: [{
          path: '/admin/exp',
          component: expList,
          name: '实验列表'
        },
        {
          path: '/admin/addexp',
          component: addexp,
          name: '新增实验'
        }
      ]
    },
    {
      path: '/index',
      component: index,
      name: '学生管理',
      iconCls: 'fa fa-address-card',
      children: [{
          path: '/admin/student',
          component: studentList,
          name: '学生列表'
        },
        {
          path: '/admin/addstudent',
          component: addStudent,
          name: '添加学生'
        }
      ]
    },
    {
      path: '/index',
      component: index,
      name: '教师管理',
      iconCls: 'fa fa-id-card-o',
      children: [{
          path: '/admin/teacher',
          component: teacherList,
          name: '教师列表'
        },
        {
          path: '/admin/addteacher',
          component: addTeacher,
          name: '添加教师'
        }
      ]
    }
  ]
})
