const defaultState = {
  isLogin: false,
  menus: {},
  permissions: {}
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: true,
        menus: action.menus,
        permissions: action.permissions
      }
    default:
      return state
  }
}
