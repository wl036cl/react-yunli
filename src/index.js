import React from 'react'
import {render} from 'react-dom'
import FastClick from 'fastclick'
import 'lib-flexible'
import './styles/base.less'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import store from './store'
import Router from './router'
import registerServiceWorker from './registerServiceWorker';

FastClick.attach(document.body)

let hotRender = (App) => {
  render(
    <Provider store={store}>
      <AppContainer>
        <App/>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
}

hotRender(Router)

// 监听state变化
let currentValue = store.getState() // 获取当前值
let unsubscribe = store.subscribe(() => {
  const previosValue = currentValue

  currentValue = store.getState()

  console.log('上一个值:', previosValue, '当前值:', currentValue)
})

//  取消监听
// console.log(process)
// if (process.env.MODE_ENV === 'production') {
//   unsubscribe()
// }

//Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    hotRender(Router);
  })
}

//  生产环境资源缓存
registerServiceWorker()