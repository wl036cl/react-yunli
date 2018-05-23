/**
 * Author:ll36
 * Create Time:2018/03/29 19:51
 * Descripttion:
 */
import React, {Component} from 'react'
import SignIn from "./signIn"
import SignUp from "./signUp"
import classNames from 'classnames'
import {Redirect} from 'react-router-dom'
import cookies from 'js-cookie'
import './style.css'
import {Flex, Pagination, Icon} from 'antd-mobile'
import {clearUserInfo} from "../../store/user/action"
import {connect} from "react-redux"
import {COOKIE_KEY_USERID, COOKIE_KEY_USERTOKEN} from "../../config/http.config"
import {Toast} from "antd-mobile/lib/index"

class Sign extends Component {
  state = {
    isLogin: true,
    redirectUrl: ''
  }

  signOut = () => {
    this.props.clearUserInfo()
    cookies.remove(COOKIE_KEY_USERID)
    cookies.remove(COOKIE_KEY_USERTOKEN)
    Toast.success('注销成功！')
  }

  toogleSign = () => {
    this.setState({isLogin: !this.state.isLogin})
  }

  redirect(url) {
    this.setState({redirectUrl: url})
  }

  componentWillMount() {
    if (this.props.match.params.type === 'out' && !!this.props.userInfo.uid) {
      this.signOut()
    }
  }

  render() {
    if (this.state.redirectUrl) {
      return <Redirect to={this.state.redirectUrl}/>
    }
    // let fullHeight = document.documentElement.offsetHeight + 'px'

    let swiperClass = classNames('swiper-wrap', {
      'right': !this.state.isLogin
    })

    return (
      <div>
        <Flex className={swiperClass}>
          <div className="swiper-slide"><SignIn redirect={(url) => this.redirect(url)}></SignIn></div>
          <div className="swiper-slide"><SignUp toogleSign={this.toogleSign}></SignUp></div>
        </Flex>
        <Pagination simple className="custom-pagination-with-icon" total={2} onChange={this.toogleSign}
                    current={this.state.isLogin ? 1 : 2} locale={{
          prevText: (<span className="arrow-align"><Icon type="left"/>Sgin In</span>),
          nextText: (<span className="arrow-align">Sgin Up<Icon type="right"/></span>)
        }}></Pagination>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  clearUserInfo
})(Sign);