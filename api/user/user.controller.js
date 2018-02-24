const User = require('mongoose').model('User')
const handleSysException = require('../../common/tools').handleSysException
const jwt = require('jsonwebtoken')
const config = require('../../config')
// 用户列表
exports.list = async (ctx, next) => {
    ctx.body = {a:1}
}
// 登录
exports.login = async (ctx, next) => {
  try {
    const entity = ctx.request.body
    const result = await User.findOne({nickname:entity.nickname})
    if (result) {
      if (result.password.trim() === entity.password) {
        const token = jwt.sign({ _id: result._id, nickname: result.nickname}, config.secrets.session, { expiresIn: '7d' })
        ctx.body = {token: token}
      } else {
        ctx.body = {err: 'The password is err', code: '10001'}
      } 
    } else {
      ctx.body = {err: 'The user does not exist', code: '10000'}
    }
  } catch (error) {
    handleSysException(error)
  }
}
// 注册
exports.register = async (ctx, next) => {
  try {
    const entity = ctx.request.body
    const result = await User.create(entity)
    ctx.body = result
  } catch (error) {
    handleSysException(error)
  }
}
