import axios from 'axios';
import qs  from 'qs';
import localhost from '../../config/localhost'
// 登录api
let login = {
  apis: {
    // 登录接口
    do_login: localhost.host + '/api/admin/login'
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

  doLogin(login_info) {
   return  axios.post(this.apis.do_login, qs.stringify(login_info)).then((r) => {
      return r;
    })
  }

}


export default login;
