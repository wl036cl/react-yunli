/**
 * Author:ll36
 * Create Time:2018/03/27 19:56
 * Descripttion:
 */
import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent'

import Home from '../pages/home'
import {connect} from "react-redux"
//import Welcome from '../pages/welCome'
// import NotFound from '../pages/notFound'
const Welcome = asyncComponent(() => import("../pages/welCome"))
const NotFound = asyncComponent(() => import("../pages/notFound"))
const Sign = asyncComponent(() => import("../pages/sign"))
const GoBang = asyncComponent(() => import("../pages/goBang"))

class Router extends Component {
  // redirect = () => {
  //   if (this.props.redirectInfo.url) {
  //     if (this.props.redirectInfo.replace)
  //       return <Redirect to={this.props.redirectInfo.url}/>
  //     else
  //       return <Redirect push to={this.props.redirectInfo.url}/>
  //   }
  // }

  render() {
    return (
      <HashRouter>
        <Switch>
          {/*{*/}
            {/*this.redirect()*/}
          {/*}*/}
          <Route path="/" exact component={Home}/>
          <Route path="/app" component={Home}/>
          <Route path="/welcome" exact component={Welcome}/>
          <Route path="/sign/:type" exact component={Sign}/>
          <Redirect from="/sign" to="/sign/in" exact component={Sign}/>
          <Route path="/goBang" exact component={GoBang}/>
          <Route component={NotFound}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default connect(state => ({
  redirectInfo: state.redirectInfo
}))(Router);