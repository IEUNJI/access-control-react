import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component,
      isLogin,
      menus,
      ...rest
    } = this.props
    return (
      <Route {...rest} render={props => (
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
  () => ({})
)(PrivateRoute)

export default PrivateRoute
