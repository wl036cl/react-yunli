/**
 * Author:ll36
 * Create Time:2018/03/27 20:20
 * Descripttion:
 */
export const IMGURL = 'http://assets.ll36.cn' // 七牛图片地址域名
export const VIDEOURL = 'http://assets.ll36.cn'

export const COOKIE_KEY_USERID = 'yunli_uid'
export const COOKIE_KEY_USERTOKEN = 'yunli_token'
export const EXPIRESDAY = 15

const Prefix = '/api'

const debug = true

export const APIURL = (process.env.NODE_ENV === 'development' && debug ? 'https://ll36.cn' : 'https://ll36.cn') + Prefix // 本地调用
