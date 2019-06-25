const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(bodyParser.json())

const SECRETKEY = 'ieunji'
const expires = 600
const port = 8888
const resTime = 1000

const gradesPool = {
  guest: {
    menus: [ '/goods', '/customers' ],
    permissions: ['get,/getGoods', 'get,/getCustomers']
  },
  admin: {
    menus: [ '/goods', '/customers', '/opinion' ],
    permissions: ['get,/getGoods', 'get,/delGoods', 'get,/getCustomers', 'get,/delCustomers']
  }
}

const userList = {
  'admin': {
    password: '123456',
    info: { ...gradesPool.admin }
  }
}

app.post('/reg', (req, res) => {
  const { username, password } = req.body
  if (username in userList) return setTimeout(() => res.json({ code: 1, msg: '用户已存在' }), resTime)
  const user = {
    password,
    info: { ...gradesPool.guest }
  }
  userList[username] = user
  const token = jwt.sign({ user: user.info }, SECRETKEY, { expiresIn: expires })
  setTimeout(() => res.json({ code: 0, msg: '注册成功', token, user: user.info }), resTime)
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!(username in userList)) return setTimeout(() => res.json({ code: 1, msg: '用户不存在' }), resTime)
  const user = userList[username]
  if (password !== user.password) return setTimeout(() => res.json({ code: 1, msg: '密码错误' }), resTime)
  const token = jwt.sign({ user: user.info }, SECRETKEY, { expiresIn: expires })
  setTimeout(() => res.json({ code: 0, msg: '登录成功', token, user: user.info }), resTime)
})

app.post('/check', (req, res) => {
  const { token } = req.body
  jwt.verify(token, SECRETKEY, (err, decode) => {
    if (err) return setTimeout(() => res.json({ code: 1, msg: '校验失败' }), resTime)
    setTimeout(() => res.json({ code: 0, msg: '校验成功', decode }), resTime)
  })
})

app.get('/getGoods', (req, res) => {
  setTimeout(() => res.json({ code: 0, data: '成功获取货物信息' }), resTime)
})

app.get('/delGoods', (req, res) => {
  setTimeout(() => res.json({ code: 0, data: '成功删除货物信息' }), resTime)
})

app.get('/getCustomers', (req, res) => {
  setTimeout(() => res.json({ code: 0, data: '成功获取客户信息' }), resTime)
})

app.get('/delCustomers', (req, res) => {
  setTimeout(() => res.json({ code: 0, data: '成功删除客户信息' }), resTime)
})

app.listen(port, () => {
  console.log(`port ${port} !`)
})
