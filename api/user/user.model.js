/**
 * 用户信息模型
 * @author: guoger
 *
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  // 邮箱地址
  email: {
    type: String,
    required: true
  },
  // 密码
  password: {
    type: String,
    required: true,
    maxlength: 18
  },
  // 昵称
  nickname: {
    type: String,
    required: true,
    maxlength: 18
  },
  // 电话号码
  telephone: {
    type: Number,
    max: 12
  }
})

mongoose.model('User', userSchema)
