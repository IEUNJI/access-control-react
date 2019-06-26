// 需要使用权限进行控制的路由信息
export default {
  '/goods': {
    // title 为该路由所对应的菜单标题
    title: '货物管理',
    // component 为该路由所对应的组件模块
    // 注意: component 为模块, component.default 才是组件 (class, function) 自身
    component: require('../components/Goods.js')
  },
  '/customers': {
    title: '客户管理',
    component: require('../components/Customers.js')
  },
  '/opinion': {
    title: '舆情监控',
    component: require('../components/Opinion.js')
  }
}
