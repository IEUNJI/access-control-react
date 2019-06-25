import store from '../store/store.js'

const arrayToHash = ary => {
  const hash = {}
  ary.forEach(item => hash[item] = true)
  return hash
}

export const session = (key, value) => {
  if (!value) return sessionStorage.getItem(key)
  sessionStorage.setItem(key, value)
}

export const handleLogin = (menus, permissions, token) => {
  permissions = arrayToHash(permissions)
  store.dispatch({
    type: 'LOGIN',
    menus,
    permissions
  })
  if (token) session('token', token)
}

export const handleLogout = () => {
  sessionStorage.removeItem('token')
  window.location.reload()
}
