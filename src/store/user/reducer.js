/**
 * Author:ll36
 * Create Time:2018/03/27 19:02
 * Descripttion:
 */
import * as actionType from './actionType'

let defaultInfo = {
  uid: '', //  userId
  token: '', // token
  overTime: 0, //  过期时间
  name: '', //  姓名
  head: ''  //  头像
}

// 修改登录者信息
export const userInfo = (state = defaultInfo , action = {}) => {
  switch (action.type) {
    case actionType.SET_USERINFO:
      return {...state, ...action.data}
    case actionType.CLEAR_USERINFO:
      return {...state, ...defaultInfo}
    default:
      return state;
  }
}