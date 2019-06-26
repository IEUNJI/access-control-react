import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
// PrivateRoute 自定义的私有路由组件
import PrivateRoute from './components/PrivateRoute.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import { session, handleLogin, handleLogout } from './utils/utils.js'
import { check } from './api/api.js'

class App extends React.Component {
  async componentDidMount() {
    const token = session('token')
    const { history } = this.props
    // token 不存在, 跳转至登录页
    if (!token) return history.push('/login')
    // token 存在, 进行 token 校验
    const res = await check(token)
    switch (res.code) {
      case 0:
        // 校验成功
        const { menus, permissions } = res.decode.user
        // 执行登录操作
        handleLogin(menus, permissions)
        // 如果用户的目标路径为登录页, 则跳转至首页
        if (this.props.location.pathname === '/login') history.push('/')
        break
      case 1:
        // 校验失败, 说明 token 过期或 token 为伪造, 执行登出操作
        handleLogout()
        break
    }
  }
  render() {
    return (
      <div className="app-box">
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}

// withRouter 给 App 组件的 props 传入 location, history, ... 三个属性
export default withRouter(App)
