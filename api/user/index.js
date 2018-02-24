/**
 * 用户管理的路由
 * @author:guoger
 */
'use strict'
const router = require('koa-router')()
const controller = require('./user.controller')

router.get('/list', controller.list)
router.post('/login', controller.login)
router.post('/register', controller.register)
module.exports = router
