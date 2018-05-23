/**
 * Author:ll36
 * Create Time:2018/04/10 10:09
 * Descripttion:
 */
import extend from 'deep-extend'

let defaultOption = {
  type: 'parent', //  parent或child
  depth: 4  //  查询深度（默认3层）
}

const diff = (current, target, category) => {
  switch (category) {
    case 'id':
      if (current.id === target)
        return current
      break
    case 'class':
      if (current.className.indexOf(target)>-1)
        return current
      break
    case 'tag':
      if (current.nodeName.toLowerCase() === target)
        return current
      break
  }
  return null
}

const findChild = (current, target, category, depth) => {
  if (depth <= 0)
    return null

  if (current && target && category) {
    let result = diff(current, target, category)
    if (result)
      return result

    let children = current.childNodes
    if (children) {
      let length = children.length
      for (let i = 0; i < length; i++) {
        current = children[i]
        return findChild(current, target, category, depth - 1)
      }
    }
  }
}

const findParent = (current, target, category, depth) => {
  if (depth <= 0)
    return null

  if (current && target && category) {
    let result = diff(current, target, category)
    if (result)
      return result

    let parent = current.parentNode
    if (parent) {
      return findParent(parent, target, category, depth - 1)
    }
  }
}
/**
 * 根据node查询父/子node（可通过id，class，nodeName）
 * @param {String} node 当前节点（必填）
 * @param {String} target 目标节点（必填）（例：#aa..aa,li）
 * @param {Object} options 请求参数（选填）{type, depth}
 * @return {Object} Node  目标节点或Null
 */
export const findNode = (node, target, options) => {
  options && extend(defaultOption, options)
  if (node && target && defaultOption.depth) {
    let category = target.startsWith('#') ? 'id' : (target.startsWith('.') ? 'class' : 'tag')
    target = target.replace(/^[\#\.]{1}/, '')
    return defaultOption.type === 'parent' ? findParent(node, target, category, defaultOption.depth) : findChild(node, target, category, defaultOption.depth)
  }
  return null
}