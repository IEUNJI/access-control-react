import store from '../store/store.js'

// 将数组结构转换为哈希结构, 避免了后续判断时对数组的大量遍历
// 例如:
// 数组结构: [ '/goods', '/customers', '/opinion' ]
// 哈希结构:
// {
//   '/goods': true,
//   '/customers': true,
//   '/opinion': true
// }
// 后续如果想判断 '/opinion' 是否存在, 无需遍历数组, 只需在哈希结构中使用 '/opinion' 属性取值
// 值为 true 则存在, 反之则不存在
const arrayToHash = ary => {
  const hash = {}
  ary.forEach(item => hash[item] = true)
  return hash
}

// sessionStorage 存取方法
// 只传 key 为读取
// 传 key 与 value 为存储
export const session = (key, value) => {
  if (!value) return sessionStorage.getItem(key)
  sessionStorage.setItem(key, value)
}

// 该方法用于处理登录细节
// menus: 当前用户的路由权限信息
// permissions: 当前用户的 ajax 请求权限信息
// token: 非必传, 传则将 token 存储至 sessionStorage
export const handleLogin = (menus, permissions, token) => {
  // 将 ajax 请求权限信息的数组结构转换为哈希结构
  permissions = arrayToHash(permissions)
  // 将 menus, permissions 传入 redux
  store.dispatch({
    type: 'LOGIN',
    menus,
    permissions
  })
  // token 存在, 则将 token 存储至 sessionStorage
  if (token) session('token', token)
}

// 处理登出细节
export const handleLogout = () => {
  // 移除 sessionStorage 中的 token 信息
  sessionStorage.removeItem('token')
  // 页面刷新
  window.location.reload()
}
