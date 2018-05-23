/**
 * Author:ll36
 * Create Time:2018/04/04 17:21
 * Descripttion:
 */
import React, {Component} from 'react'
import goBang from './goBang'
import './style.css'

export default class GoBang extends Component {
  state={
    id:'myGoBang',
    width: Math.round(Math.round(window.devicePixelRatio)*(document.documentElement.clientWidth<document.documentElement.clientHeight?document.documentElement.clientWidth:document.documentElement.clientHeight)),
    height: Math.round(Math.round(window.devicePixelRatio)*(document.documentElement.clientWidth/23*31<document.documentElement.clientHeight?document.documentElement.clientWidth/23*31:(document.documentElement.clientWidth>document.documentElement.clientHeight?document.documentElement.clientHeight:document.documentElement.clientWidth))),  //  高度远大于宽度
  }

  componentDidMount(){
    goBang('myGoBang',{mode:'auto'})
  }

  render() {
    return (
      <div style={{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,backgroundColor: `#312a24`}}>
      <canvas id={this.state.id} width={this.state.width} height={this.state.height}></canvas>
      </div>
    )
  }
}
