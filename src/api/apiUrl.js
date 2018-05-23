/**
 * Author=ll36
 * Create Time=2018/03/20 15=53
 * Descripttion=
 */
import * as BaseUrl from '../config/http.config'

export const SIGN_IN = BaseUrl.APIURL + '/user/loginin' // 登录

export const SIGN_OUT = BaseUrl.APIURL + '/user/loginOut' // 退出

export const SIGN_UP = BaseUrl.APIURL + '/user/register' // 退出

export const GET_USER = BaseUrl.APIURL + '/user/getUser' // 用户model

export const GET_WORDS = BaseUrl.APIURL + '/word/getWords' // 提示词

export const GET_SPORT = BaseUrl.APIURL + '/sport/getSport' // 运动项目model

export const EDIT_SPORT = BaseUrl.APIURL + '/sport/addOrEditSport' // 编辑或新增项目

export const DELETE_SPORT = BaseUrl.APIURL + '/sport/deleteSport' // 删除项目

export const GET_SPORTS = BaseUrl.APIURL + '/sport/getSports' // 运动项目list

export const GET_SPORT_RECORD = BaseUrl.APIURL + '/sport/getRecord' // 运动项目记录model

export const GET_SPORT_RECORDS = BaseUrl.APIURL + '/sport/getRecords' // 运动项目记录list

export const EDIT_SPORT_RECORD = BaseUrl.APIURL + '/sport/addOrEditRecord' // 编辑或新增项目记录

export const DELETE_SPORT_RECORD = BaseUrl.APIURL + '/sport/deleteRecord' // 删除项目记录
