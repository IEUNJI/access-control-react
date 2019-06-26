import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

// 私有路由组件, 需要 redux 中的 isLogin 状态为 true 时才能展示对应的组件
class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component, // 重命名为首字母大写的组件
      isLogin, // redux 中的用户登录状态
      menus, // redux 中的当前登录用户的路由 (菜单) 信息, 需要将其传给需要展示的组件
      ...rest // 剩余参数, 包含了 path 等属性, 需要将这些属性传递至 Route
    } = this.props
    return (
      <Route {...rest} render={props => ( // props 形参为 location, history, ... 等路由组件必备的三个属性
        isLogin
        ? <Component {...props} menus={menus} />
        : null
      )} />
    )
  }
}

PrivateRoute = connect(
  state => ({
    isLogin: state.authReducer.isLogin,
    menus: state.authReducer.menus
  }),
  // 不传值, 默认为 dispatch => ({dispatch})
  // 本组件不需要 dispatch, 所以传 () => ({})
  () => ({})
)(PrivateRoute)

export default PrivateRoute
