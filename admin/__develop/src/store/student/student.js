import axios from 'axios';
import qs from 'qs';
import localhost from '../../../config/localhost'
// 登录api
let student = {
  apis: {
    // 登录接口
    get_list: localhost.host + '/api/admin/explist',
    edit_exp: localhost.host + '/api/admin/addexp',
    app_exp: localhost.host + '/api/student/appexp',
    get_myexp: localhost.host + '/api/student/myexp',
    del_exp: localhost.host + '/api/student/delexp',
    upload_file:localhost.host + '/api/student/file',
    addworkfile:localhost.host + '/api/student/addworkfile'
  },

  params: {
    login_info: {
      account: '', // 必须  登录账号（支持登录名和手机号）
      password: '', // 必须  登录密码
    }
  },

  data: {
    users: [{}]
  },

  state: {},
  getList(keys) {
    return axios.get(this.apis.get_list, {
      params: {
        keys: keys
      }
    }).then((r) => {
      return r;
    })
  },
  add_exp(info) {
    return axios.post(this.apis.app_exp, qs.stringify(info)).then((r) => {
      return r;
    })
  },
  get_myexp(info) {
    return axios.post(this.apis.get_myexp, qs.stringify(info)).then((r) => {
      return r;
    })
  },
  del_exp(info){
     return axios.post(this.apis.del_exp, qs.stringify(info)).then((r) => {
      return r;
    })
  },
  add_work(info){
     return axios.post(this.apis.addworkfile, qs.stringify(info)).then((r) => {
      return r;
    })
  }

}


export default student;
