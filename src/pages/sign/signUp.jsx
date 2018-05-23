/**
 * Author:ll36
 * Create Time:2018/03/29 19:58
 * Descripttion:
 */
import React, {Component} from 'react'
import TextsEditList from '../../components/textsEditList'
import {Button} from 'antd-mobile'
import {Toast} from "antd-mobile/lib/index"
import classNames from 'classnames'
import PropTypes from "prop-types";
import {signUp} from "../../api/user";

export default class SignUp extends Component {
  static propTypes = {
    toogleSign: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      textsList: [
        {icon: 'person', type: 'text', placeholder: 'Account', errMsg: 'please input account', value: '', maxLength: 20},
        {icon: 'email', type: 'text', placeholder: 'Email', errMsg: 'please input email', value: '', maxLength: 20},
        {icon: 'lock', type: 'password', placeholder: 'Password', errMsg: 'please input password', value: '', maxLength: 20},
        {icon: 'lock', type: 'password', placeholder: 'Password', errMsg: 'please input password', value: '', maxLength: 20}
      ],
      msg: {
        isRight: true,
        content: ' '
      }
    }
  }
// 子组件调用，查询错误、修改state
  handleChange = (index, list) => {
    let item = list[index]
    list[index].errMsg = ''
    if (item.value.length > item.maxLength) {
      list[index].errMsg = '太长了'
    }
    switch (index) {
      case 0:
        if (!/^[\u4e00-\u9fa5|\w]{6,20}$/.test(item.value))
          list[index].errMsg = '帐号为6-20位汉字，数字或字母组合！'
        break
      case 1:
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(item.value))
          list[index].errMsg = "email格式不正确！"
        break
      case 2:
        if (!/^\w{6,20}$/.test(item.value))
          list[index].errMsg = '密码为6-20位数字或字母组合！'
        break
      case 3:
        if (item.value!== list[2].value)
          list[index].errMsg = "两次密码不一致！"
        break
      default:break
    }
    this.setState({textsList: list})
    return list
  }

  showMsg(msg, isRight = false) {
    this.setState({msg: {isRight: isRight, content: msg}})
  }

  signUp=()=> {
    const index = this.state.textsList && this.state.textsList.findIndex((item) => {
      return item.errMsg.length > 0
    })
    if (index === -1) {
      const [phone, email, password, password2] = [this.state.textsList[0].value.trim(), this.state.textsList[1].value.trim(), this.state.textsList[2].value.trim(), this.state.textsList[3].value.trim()]
      signUp(phone, email, password, password2).then(res => {
        if (res.result === 1) {
          this.showMsg(res.msg, true)
          //跳转到登录页面
          this.props.toogleSign()
        } else {
          this.showMsg(res.msg)
        }
      }).catch(err => {
        console.log(err)
        Toast.fail(err.message)
      })
    } else {
      Toast.fail(this.state.textsList[index].errMsg, 1)
    }
  }
  render() {
    let mgsClass = classNames('errMsg',this.state.msg.isRight?"green":"red")

    return (
      <section className="login">
        <TextsEditList title="Sign Up" handleChange={this.handleChange} list={this.state.textsList}/>
        <p className={mgsClass}>{this.state.msg.content}</p>
        <Button onClick={this.signUp} type="primary">Sign Up</Button>
      </section>
    )
  }
}
