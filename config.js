const config={
    mongo: {
      uri:"mongodb://176.122.181.147/blog",
      options: {
      }
    },
    secrets: {
      session: 'guoger-security-secret'
    },
     // white list
    whiteList: ['/api/user/register', '/'],
}

module.exports = config