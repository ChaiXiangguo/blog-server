exports.handleSysException = (err, code, message) => {
  message = err.message
  const error = new Error(message || '系统内部错误')
  error.code = code || 500
  throw error
}