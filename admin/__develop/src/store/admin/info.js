import axios from 'axios';
import qs from 'qs';
import localhost from '../../../config/localhost'
// 登录api
let exp = {
  apis: {
    // 登录接口
    add_info: localhost.host + '/api/admin/addinfo',
    del_info: localhost.host + '/api/admin/delinfo',
    info_list: localhost.host + '/api/admin/infolist',

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

  addInfo(info) {
    console.log("inqian", info)
    return axios.post(this.apis.add_info, qs.stringify(info)).then((r) => {
      return r;
    })
  },
  delInfo(info) {
    return axios.post(this.apis.del_info, qs.stringify(info)).then((r) => {
      return r;
    })
  },
  infoList(info) {
    return axios.post(this.apis.info_list).then((r) => {
      return r;
    })
  }

}

export default exp;
