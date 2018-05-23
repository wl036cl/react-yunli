/**
 * Author:ll36
 * Create Time:2018/04/02 22:11
 * Descripttion:
 */
import * as actionType from './actionType'

/**
 * toggleSide
 * @param {bool} open（true:open;false:hide;others:toggle）
 */
export const toggleSide = (open) => {
  let type = actionType.TOGGLE_SIDE

  if (typeof open === 'boolean') {
    type = open ? actionType.TOGGLE_SIDE : actionType.HIDE_SIDE
  }

  return {
    type: type,
    open
  }
}

export const setMainParent=(mainParent)=>{
  let type = actionType.SET_MAINPARENT

  return {
    type: type,
    mainParent
  }
}
