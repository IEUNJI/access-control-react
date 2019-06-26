import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import allRoutes from '../router/router.js'
import { handleLogout } from '../utils/utils.js'

class Home extends React.Component {
  logout = () => {
    // 登出, 调用处理登出细节的函数
    handleLogout()
  }
  render() {
    // menus 父组件传入的当前用户可访问的路由信息, 即菜单信息
    const { menus } = this.props
    return (
      <div className="home-box">
        <button onClick={this.logout}>登出</button>
        <ul className="home-nav-box">
          {menus.map((item, index) => {
            // 循环 menus, 动态生成当前用户可访问的菜单
            const { title } = allRoutes[item]
            return (
              <li key={index}><NavLink to={item}>{title}</NavLink></li>
            )
          })}
        </ul>
        <div className="home-nav-box">
          {menus.map((item, index) => {
            const { component } = allRoutes[item]
            // 循环 menus, 动态生成当前用户可访问的路由
            // component 为 require 导入的模块, 其中的 default 属性才是组件 (class, function) 本身
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
