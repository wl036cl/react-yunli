/**
 * Author:ll36
 * Create Time:2018/03/27 20:49
 * Descripttion:
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from '../../components/header'
import Side from '../../components/side'
import Sports from '../sports'
import SportEdit from '../sports'
import './style.less'
import {clearUserInfo} from '../../store/user/action'
import {setMainParent} from '../../store/side/action'

class Home extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    clearUserInfo: PropTypes.func.isRequired,
  }

  state = {
    redirectUrl: '',
    push: false,
    sideList: [
      {img: this.props.userInfo.head, text: this.props.userInfo.name},
      {icon: 'right', text: '运动项目', link: '/app/sports'},
      {icon: 'right', text: '身体指数', link: '/app/body'},
      {icon: 'right', text: '设置', link: '/app/setting'},
      {icon: 'right', text: '关于', link: '/app/about'},
      {icon: 'right', text: '休息一刻', link: '/goBang'},
      {icon: 'right', text: '注销', link: '/sign/out'}
    ]
  }

  redirect(url, isPush = false) {
    this.setState({redirectUrl: url, push: isPush})
    //待改，还原地址栏
  }

  componentWillMount() {
    //  检查是否登录
    if (!this.props.userInfo.uid || !this.props.userInfo.token) {
      this.redirect('/welcome')
    }
  }

  componentDidMount(){
    if(this.main)
    {
      this.props.setMainParent(this.main.parentNode)
    }
  }

  mainRoute() {
    return (<Switch>
      <Route path={`${this.props.match.path}/sports`} component={Sports}/>
      <Route path={`${this.props.match.path}/sportedit/:id`} exact component={SportEdit}/>
      <Redirect from={`${this.props.match.path}`} to={`${this.props.match.path}/sports`} exact
                component={Sports}/>
    </Switch>)
  }

  render() {
    if (this.state.redirectUrl) {
      if (this.state.push)
        return <Redirect push to={this.state.redirectUrl}/>
      return <Redirect to={this.state.redirectUrl}/>
    }
    const content = (
      <main ref={(main)=>{this.main=main}}>
        {this.mainRoute()}
      </main>
    )

    return (
      <div>
        <Header title='首页'/>
        <Side list={this.state.sideList}>{content}</Side>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  clearUserInfo,
  setMainParent
})(Home);
