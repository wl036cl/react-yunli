/**
 * Author:ll36
 * Create Time:2018/03/29 19:58
 * Descripttion:
 */
import React, {Component} from 'react'
import TextsEditList from '../../components/textsEditList'
import classNames from 'classnames'
import {signInByPhone} from '../../api/user'
import {getUrl} from '../../utils/fullUrl'
import {Button} from 'antd-mobile'
import {Toast} from "antd-mobile/lib/index"
import PropTypes from "prop-types"
import cookies from 'js-cookie'
import moment from 'moment'
import {COOKIE_KEY_USERID, COOKIE_KEY_USERTOKEN, EXPIRESDAY} from '../../config/http.config'
import {setUserInfo} from "../../store/user/action";
import {connect} from "react-redux";

class SignIn extends Component {
  static propTypes = {
    redirect: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      textsList: [
        {icon: 'check', type: 'text', placeholder: 'Account', errMsg: 'please input account', value: '', maxLength: 20},
        {icon: 'lock', type: 'password',placeholder: 'Password',errMsg: 'please input password', value: '',maxLength: 20},
        {icon: 'message', type: 'tel', placeholder: 'Verification', errMsg: '', value: '', maxLength: 6}
      ],
      msg: {
        isRight: true,
        content: ' '
      }
    }
    this.signIn = this.signIn.bind(this)
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
        if (!/^\w{6,20}$/.test(item.value))
          list[index].errMsg = '密码为6-20位数字或字母组合！'
        break
      default:break
    }
    this.setState({textsList: list})
    return list
  }

  showMsg(msg, isRight = false) {
    this.setState({msg: {isRight: isRight, content: msg}})
  }

  signIn() {
    const index = this.state.textsList && this.state.textsList.findIndex((item) => {
      return item.errMsg.length > 0
    })
    if (index === -1) {
      const [phone, password] = [this.state.textsList[0].value.trim(), this.state.textsList[1].value.trim()]
      signInByPhone(phone, password).then(res => {
        if (res.result === 1) {
          this.showMsg(res.msg, true)

          this.props.setUserInfo({
            uid: res.uid,
            token: res.token,
            overTime: new Date(moment().add(EXPIRESDAY, 'days').format('YYYY/MM/DD HH:mm:ss')).getTime(),
            name: res.uname,
            head: getUrl(res.uhead)
          })

          cookies.set(COOKIE_KEY_USERID, res.uid, {expires: EXPIRESDAY})
          cookies.set(COOKIE_KEY_USERTOKEN, res.token, {expires: EXPIRESDAY})

          this.props.redirect('/app')
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
    let mgsClass = classNames('errMsg', this.state.msg.isRight ? "green" : "red")

    return (
      <section className="login">
        <TextsEditList title="Sign In" handleChange={this.handleChange} list={this.state.textsList}/>
        <p className={mgsClass}>{this.state.msg.content}</p>
        <Button onClick={this.signIn} type="primary">Sign In</Button>
      </section>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  setUserInfo
})(SignIn)
