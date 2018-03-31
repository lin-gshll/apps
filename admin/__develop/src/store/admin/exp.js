import axios from 'axios';
import qs from 'qs';
import localhost from '../../../config/localhost'
// 登录api
let exp = {
  apis: {
    // 登录接口
    do_add: localhost.host + '/api/admin/addexp',
    //获取列表delteacher
    get_list: localhost.host + '/api/admin/explist',
    del_teacher: localhost.host + '/api/admin/delexp',
    get_teacher:localhost.host + '/api/admin/teacherlist'

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
    console.log("inqian", add_info)
    return axios.post(this.apis.do_add, qs.stringify(add_info)).then((r) => {
      return r;
    })
  },
  getList() {
    return axios.get(this.apis.get_list).then((r) => {
      return r;
    })
  },
  getTeacherList() {
    return axios.get(this.apis.get_teacher).then((r) => {
      return r;
    })
  },
  delExp(_id) {
    return axios.post(this.apis.del_teacher,
      qs.stringify({
        _id: _id
      })).then((r) => {
      return r;
    })
  }

}

export default exp;
