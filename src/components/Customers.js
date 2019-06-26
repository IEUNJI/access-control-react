import React from 'react'
import { connect } from 'react-redux'
import { getCustomers, delCustomers } from '../api/api.js'

class Customers extends React.Component {
  getCustomersR = async () => {
    // 调用获取客户信息的接口函数 getCustomers.r
    const res = await getCustomers.r()
    alert(res.data)
  }
  delCustomersR = async () => {
    // 调用删除客户信息的接口函数 delCustomers.r
    const res = await delCustomers.r()
    alert(res.data)
  }
  render() {
    // permissions 为 redux 中的当前用户的ajax 请求权限列表
    const { permissions } = this.props
    return (
      <div className="customers-box">
        <h2>Customers</h2>
        {
          // getCustomers.p 为获取客户信息的权限描述字符串
          // 根据此权限描述字符串, 可在 redux 中的 permissions 中查找当前用户是否有此权限
          // 如果当前用户有此权限, 则显示按钮, 无权限则不显示
          permissions[getCustomers.p]
          ? <button onClick={this.getCustomersR}>获取客户信息</button>
          : null
        }
        {
          permissions[delCustomers.p]
          ? <button onClick={this.delCustomersR}>删除客户信息</button>
          : null
        }
      </div>
    )
  }
}

Customers = connect(
  state => ({ permissions: state.authReducer.permissions }),
  // 不传值, 默认为 dispatch => ({dispatch})
  // 本组件不需要 dispatch, 所以传 () => ({})
  () => ({})
)(Customers)

export default Customers
