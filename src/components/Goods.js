import React from 'react'
import { connect } from 'react-redux'
import { getGoods, delGoods } from '../api/api.js'

class Goods extends React.Component {
  getGoodsR = async () => {
    const res = await getGoods.r()
    alert(res.data)
  }
  delGoodsR = async () => {
    const res = await delGoods.r()
    alert(res.data)
  }
  render() {
    const { permissions } = this.props
    return (
      <div className="goods-box">
        <h2>Goods</h2>
        {
          permissions[getGoods.p]
          ? <button onClick={this.getGoodsR}>获取货物信息</button>
          : null
        }
        {
          permissions[delGoods.p]
          ? <button onClick={this.delGoodsR}>删除货物信息</button>
          : null
        }
      </div>
    )
  }
}

Goods = connect(
  state => ({ permissions: state.authReducer.permissions }),
  () => ({})
)(Goods)

export default Goods
