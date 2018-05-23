/**
 * Author:ll36
 * Create Time:2018/03/27 19:02
 * Descripttion:
 */
import * as actionType from './actionType'

let defaultInfo = {
  mainParent:null, //  mianRef(antd的drawer设定main高度，scroll为main而非body或window)
  open: false  //  是否打开侧边栏
}

//  修改侧边栏
export const sideInfo = (state = defaultInfo, action = {}) => {
  switch (action.type) {
    case actionType.TOGGLE_SIDE:
      return {...state, ...{open: !state.open}}
    case actionType.OPEN_SIDE:
      return {...state, ...{open: true}}
    case actionType.HIDE_SIDE:
      return {...state, ...{open: false}}
    case actionType.SET_MAINPARENT:
      return {...state, ...{mainParent:action.mainParent}}
    default:
      return state;
  }
}