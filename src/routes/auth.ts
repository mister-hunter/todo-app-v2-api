module.exports = app => {
  const authAuth = require('../controllers/auth/auth')
  const authLogin = require('../controllers/auth/login')

  // LOG IN - any
  app.post('/login', (req, res) => {
    authLogin(req, res)
  })

  // AUTH - any
  app.post('/auth', (req, res) => {
    authAuth(req, res)
  })
}
