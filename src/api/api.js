import axios from 'axios'
import store from '../store/store.js'

axios.defaults.baseURL = 'http://localhost:8888'

const whiteList = {
  'post,/reg': true,
  'post,/login': true,
  'post,/check': true
}

axios.interceptors.request.use(
  config => {
    const permission = config.method + ',' + config.url
    if (whiteList[permission]) return config
    if (store.getState().authReducer.permissions[permission]) return config
    return Promise.reject('no permission')
  }
)

axios.interceptors.response.use(
  response => response.data
)

export const login = user => {
  return axios.post('/login', user)
}

export const reg = user => {
  return axios.post('/reg', user)
}

export const check = token => {
  return axios.post('/check', { token })
}

export const getGoods = {
  p: 'get,/getGoods',
  r: () => axios.get('/getGoods')
}

export const delGoods = {
  p: 'get,/delGoods',
  r: () => axios.get('/delGoods')
}

export const getCustomers = {
  p: 'get,/getCustomers',
  r: () => axios.get('/getCustomers')
}

export const delCustomers = {
  p: 'get,/delCustomers',
  r: () => axios.get('/delCustomers')
}
