import React from 'react'
import { connect } from 'react-redux'
import { getCustomers, delCustomers } from '../api/api.js'

class Customers extends React.Component {
  getCustomersR = async () => {
    const res = await getCustomers.r()
    alert(res.data)
  }
  delCustomersR = async () => {
    const res = await delCustomers.r()
    alert(res.data)
  }
  render() {
    const { permissions } = this.props
    return (
      <div className="customers-box">
        <h2>Customers</h2>
        {
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
  () => ({})
)(Customers)

export default Customers
