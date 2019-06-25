import React from 'react'
import { login, reg } from '../api/api.js'
import { handleLogin } from '../utils/utils.js'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }
  }
  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  toLoginOrReg = async type => {
    const { username, password } = this.state
    const handlers = { login, reg }
    const res = await handlers[type]({ username, password })
    if (res.code === 1) return alert(res.msg)
    const { user: { menus, permissions }, token } = res
    handleLogin(menus, permissions, token)
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
