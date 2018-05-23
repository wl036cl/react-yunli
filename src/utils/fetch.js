/**
 * Author:ll36
 * Create Time:2018/03/20 15:29
 * Descripttion:基于fetch的数据通信模块
 */

import 'whatwg-fetch'
import qs from 'querystring'
import extend from 'deep-extend'

// 缺省请求头
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' // application/x-www-form-urlencoded
}

// 请求参数加工
function mutate(url, {headers, body, query, ...options}) {
  headers = {...defaultHeaders, ...headers}
  options.headers = headers

  if (body) {
    if (typeof body === 'object') {
      body = JSON.stringify(body)
    }
    options.body = body
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query)
    }
    url += (url.indexOf('?') !== -1) ? '&' : '?'
    url += query
  }

  options.credentials = 'same-origin' // omit,same-origin,include
  options.mode = 'cors' // "same-origin", "cors", "no-cors", "navigate", or "websocket"

  return [url, options]
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

//  超时判断（仅fetcjh有效）
const timerPromise = (timeOut) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('request timeout'))
    }, timeOut)
  })
}

/**
 * 接口调用服务
 * @param {String} url 接口API（必填）
 * @param {Object} options 请求参数（选填）{headers, body, query, ...options}
 * @return {Object} Promise
 * @throws {Error}
 */
const callService = (url, options = {})=>{
  return window.fetch(...mutate(url, options)).then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      console.log(error)
      throw error
    })
}

export default callService

export const get = (url, args, options = {}) => {
  options.method = 'GET'
  options.query = args
  return callService(url, options)
}

export const post = (url, args, options = {}) => {
  options.method = 'POST'
  options.body = args
  return callService(url, options)
}

export const put = (url, args, options = {}) => {
  options.method = 'PUT'
  options.body = args
  return callService(url, options)
}

export const patch = (url, args, options = {}) => {
  options.method = 'PATCH'
  options.body = args
  return callService(url, options)
}

export const del = (url, args, options = {}) => {
  options.method = 'DELETE'
  options.query = args
  return callService(url, options)
}
/**
 * 接口调用服务
 * @param {Object} options 请求参数（选填）{url,type,data}（type:'get','post'）
 * @return {Object} Promise
 * @throws
 * 备注：uid,token转化成header中的Oauth-UserId和Oauth-Token
 * 扩展：跨域调用时：Request需设置
 * // 指定允许其他域名访问
 * header('Access-Control-Allow-Origin:*');
 * // 响应类型
 * header('Access-Control-Allow-Methods:*');
 * // 响应头设置（自定义参数，需加入）
 * header('Access-Control-Allow-Headers:Content-Type,plat,Oauth-UserId,Oauth-Token"');
 */
export const fetch = (options = {}) => {
  let headers = {
    'plat': 'yunli',
    'Oauth-UserId': '',
    'Oauth-Token': ''
  }
  let defaultOption = {
    url: '',
    type: 'get',
    timeOut:15*1000,  //  超时时间默认30秒
    data: {},
    callback: 'callback'
  }

  return new Promise((resolve, reject) => {
    extend(defaultOption, options)
    if (defaultOption.url) {
      if (defaultOption.data.hasOwnProperty('uid')) {
        headers['Oauth-UserId'] = defaultOption.data.uid
        delete defaultOption.data.uid
      }
      if (defaultOption.data.hasOwnProperty('token')) {
        headers['Oauth-Token'] = defaultOption.data.token
        delete defaultOption.data.token
      }
      Promise.race([(defaultOption.type === 'get' ? get(defaultOption.url, defaultOption.data, {headers}) : post(defaultOption.url, defaultOption.data, {headers})),timerPromise(defaultOption.timeOut)]).then(res => resolve(res)).catch(err => reject(err))
    } else {
      reject(new Error('url不能为空'))
    }
  })
}
