/**
 * Author:ll36
 * Create Time:2018/03/22 16:00
 * Descripttion:根据key（主键：），合并修改目标数组（后台返回的list）
 * target:[{key:xx,……},{key:xxx,……}]
 * source:[{key:xx,……},{key:xxx,……}]
 * 返回新内容，不影响数据来源
 */
export const extentArray = (target, source, key) => {
  let data = []

  if (Array.isArray(target) && Array.isArray(source) && key) {
    if (target.length && source.length) { // 先修改
      target.forEach((item) => {
        if (item.hasOwnProperty(key)) {
          let _item = source.find((i) => {
            return i.hasOwnProperty(key) && i[key] === item[key]
          })

          if (_item) {
            data.push(_item)
          } else {
            data.push(item)
          }
        }
      })
    }
    if (!data.length) {
      //  未修改
      data = source
    } else if (source.length) {
      //  新增
      source.forEach((item) => {
        let index = data.findIndex((i) => {
          return i.hasOwnProperty(key) && i[key] === item[key]
        })

        if (item.hasOwnProperty(key) && index === -1) {
          data.push(item)
        }
      })
    }
  }
  return data
}
