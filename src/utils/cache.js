/**
 * Author:ll36
 * Create Time:2018/03/21 17:14
 * Descripttion:利用localStorage设置时长缓存
 */
function _setCache (key, value, time) {
  let curTime = 0

  if (time && Number(time)) {
    curTime = new Date().getTime() + time * 1000 * 60
  }
  if (value) {
    localStorage.setItem(key, JSON.stringify({data: value, time: curTime}))
  }
}

/**
 * 设置
 * setCache还可以传一个数组，例：[[key,value,time],[key,value,time]]
 * time（单位：分钟）不填或0，永久有效
 */
export const setCache = function (key, value, time) {
  if (Array.isArray(key)) {
    key.map(item => {
      _setCache(item[0], item.length > 1 ? item[1] : null, item.length > 2 ? item[2] : null)
    })
  } else {
    _setCache(key, value, time)
  }
}

export const removeCache = function (key) {
  if (Array.isArray(key)) {
    key.map(item => {
      localStorage.removeItem(item)
    })
  } else {
    localStorage.removeItem(key)
  }
}

export const getCache = function (key) {
  const data = localStorage.getItem(key)

  if (!data) {
    return null
  }
  const dataObj = JSON.parse(data)

  if (dataObj.hasOwnProperty('time') && dataObj.time !== 0 && new Date().getTime() > dataObj.time) {
    //  过期
    removeCache(key)
    return null
  } else if (dataObj.hasOwnProperty('data')) {
    return JSON.parse(dataObj.data)
  }
  return dataObj
}
