import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import allRoutes from '../router/router.js'
import { handleLogout } from '../utils/utils.js'

class Home extends React.Component {
  logout = () => {
    handleLogout()
  }
  render() {
    const { menus } = this.props
    return (
      <div className="home-box">
        <button onClick={this.logout}>登出</button>
        <ul className="home-nav-box">
          {menus.map((item, index) => {
            const { title } = allRoutes[item]
            return (
              <li key={index}><NavLink to={item}>{title}</NavLink></li>
            )
          })}
        </ul>
        <div className="home-nav-box">
          {menus.map((item, index) => {
            const { component } = allRoutes[item]
            return (
              <Route key={index} path={item} component={component.default} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Home
