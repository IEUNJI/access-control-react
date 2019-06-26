import React from 'react'
import { login, reg } from '../api/api.js'
import { handleLogin } from '../utils/utils.js'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }
  }
  // input 框输入处理函数
  // input 框的 name 属性需要与 state 中的属性名对应
  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  toLoginOrReg = async type => {
    const { username, password } = this.state
    const handlers = { login, reg }
    // 根据 type 类型, 调用 handlers 中不同的处理函数
    const res = await handlers[type]({ username, password })
    // code === 1 登录 or 注册异常
    if (res.code === 1) return alert(res.msg)
    // code === 0 登录 or 注册成功
    // 从响应信息中拿到 menus (路由信息, 即菜单信息), permissions (ajax 请求权限信息), token
    const { user: { menus, permissions }, token } = res
    // 调用处理登录细节的函数
    handleLogin(menus, permissions, token)
    // 跳转至首页
    this.props.history.push('/')
  }
  render() {
    const { username, password } = this.state
    return (
      <div className="login-box">
        <input type="text" name="username" placeholder="用户名" value={username} onChange={this.handleInput} />
        <input type="text" name="password" placeholder="密码" value={password} onChange={this.handleInput} />
        <button onClick={this.toLoginOrReg.bind(this, 'login')}>登录</button>
        <button onClick={this.toLoginOrReg.bind(this, 'reg')}>注册</button>
      </div>
    )
  }
}

export default Login
