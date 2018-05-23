/**
 * Author:ll36
 * Create Time:2018/03/27 20:49
 * Descripttion:
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PageMsg from '../../components/pageMsg/index'
import {setUserInfo} from '../../store/user/action';
import cookies from 'js-cookie'
import moment from 'moment'
import {signInByToken} from '../../api/user'
import {COOKIE_KEY_USERID, COOKIE_KEY_USERTOKEN, EXPIRESDAY} from '../../config/http.config'
import {getUrl} from "../../utils/fullUrl";

class Welcome extends Component {
  static propTypes = {
    //redirect:PropTypes.func,
    userInfo: PropTypes.object.isRequired,
    setUserInfo: PropTypes.func.isRequired
  }
  state = {
    redirectUrl: ''
  }

  redirect(url) {
    this.setState({redirectUrl: url})
  }

  async checkSign() {
    if (this.props.userInfo.userId && this.props.userInfo.token) {
      return true
    }
    const [uid, token] = [cookies.get(COOKIE_KEY_USERID), cookies.get(COOKIE_KEY_USERTOKEN)]
    if (uid && token) {
      try {
        let res = await
          signInByToken(uid, token)
        if (res.result === 1) {
          this.props.setUserInfo({
            uid: res.uid,
            token: res.token,
            overTime: new Date(moment().add(EXPIRESDAY, 'days').format('YYYY/MM/DD HH:mm:ss')).getTime(),
            name: res.uname,
            head: getUrl(res.uhead)
          })
          cookies.set(COOKIE_KEY_USERID, res.uid, {expires: EXPIRESDAY})
          cookies.set(COOKIE_KEY_USERTOKEN, res.token, {expires: EXPIRESDAY})
          return true
        }
      } catch (err) {
        console.log(err)
        return false
      }
    } else {
      return false
    }
  }

  componentDidMount() {
    this.checkSign().then(res => {
      if (!res) {
        this.redirect('/sign')
      } else {
        //获取当前地址，重定向到当前地址
        this.redirect('/app')
      }
    })
  }

  render() {
    if (this.state.redirectUrl) {
      return <Redirect to={this.state.redirectUrl}/>
    }

    return (
      <PageMsg msg="Welcome To Your Data"/>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  setUserInfo
})(Welcome);
