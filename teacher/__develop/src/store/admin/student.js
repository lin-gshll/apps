import axios from 'axios';
import qs from 'qs';
import localhost from '../../../config/localhost'
// 登录api
let student = {
  apis: {
    // 登录接口
    do_add: localhost.host + '/api/admin/addstudent',
    //获取列表delteacher
    get_list: localhost.host + '/api/admin/studentlist',
    del_teacher: localhost.host + '/api/admin/delstudent'

  },

  params: {
    add_info: {}
  },

  data: {
    users: [{}],
    list: {

    }
  },

  state: {},

  doAdd(add_info) {
      console.log("inqian",add_info)
    return axios.post(this.apis.do_add, qs.stringify(add_info)).then((r) => {
      return r;
    })
  },
  getList() {
    return axios.get(this.apis.get_list).then((r) => {
      return r;
    })
  },
  delStudent(_id) {
    return axios.post(this.apis.del_teacher,
      qs.stringify({
        _id: _id
      })).then((r) => {
      return r;
    })
  }

}


export default student;
