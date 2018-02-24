/**
 * 解析北京token中的payload
 */
// const config = require('../../config').backend
const _ = require('lodash')
const config = require('../config')
const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const tokenResolve = async (ctx, next) => {
  if (config.whiteList.indexOf(ctx.path) !== -1) {
    await next()
  } else {
    let token
    try {
      if (ctx.cookies.get("token")) {
        token = ctx.cookies.get("token").replace(/Bearer /, '')
        const decoded = jwt.verify(token, config.secrets.session)
        const user = await User.findById(decoded._id).exec()
        if (_.isEmpty(user)) {
          ctx.status = 401
          return
        }
        ctx.state.user = decoded
        await next()
      } else {
        ctx.status = 401
        ctx.body = {
          message: 'registration is not complete'
        }
      }
    } catch (err) {
      ctx.status = 401
      ctx.body = {
        message: err.message || 'JsonWebTokenError'
      }
      return
    }
  }
}

module.exports = tokenResolve