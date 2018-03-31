import axios from 'axios';
import qs from 'qs';
import localhost from '../../../config/localhost'
// 登录api
let login = {
  apis: {
    // 登录接口
    get_list: localhost.host + '/api/admin/explist',
    edit_exp: localhost.host + '/api/admin/addexp',
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
  getList(teacher_name) {
    return axios.get(this.apis.get_list, {
      params: {
        teacher_name: teacher_name
      }
    }).then((r) => {
      return r;
    })
  },
  edit_exp(info) {
    return axios.post(this.apis.edit_exp, qs.stringify(info)).then((r) => {
      return r;
    })
  }

}


export default login;
