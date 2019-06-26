const defaultState = { // 默认 state
  isLogin: false, // 初始值 false, 未登录
  menus: {}, // 用户的路由 (菜单) 信息
  permissions: {} // ajax 请求权限信息
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN': // 登录操作
      return {
        ...state,
        isLogin: true, // 将 isLogin 设置为 true
        // 存储传入的 menus 与 permissions
        menus: action.menus,
        permissions: action.permissions
      }
    default:
      return state
  }
}
