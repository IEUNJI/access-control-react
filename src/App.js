import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import { session, handleLogin, handleLogout } from './utils/utils.js'
import { check } from './api/api.js'

class App extends React.Component {
  async componentDidMount() {
    const token = session('token')
    const { history } = this.props
    if (!token) return history.push('/login')
    const res = await check(token)
    switch (res.code) {
      case 0:
        const { menus, permissions } = res.decode.user
        handleLogin(menus, permissions)
        if (this.props.location.pathname === '/login') history.push('/')
        break
      case 1:
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

export default withRouter(App)
