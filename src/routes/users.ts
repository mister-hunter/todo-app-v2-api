module.exports = app => {
  const auth = require('../middleware/check-auth')
  const userAll = require('../controllers/users/all')
  const userOne = require('../controllers/users/one')
  const userAdd = require('../controllers/users/add')
  const userEdit = require('../controllers/users/edit')
  const userDelete = require('../controllers/users/delete')

  // READ - admin
  app.get('/users', (req, res) => {
    auth(req, res, () => userAll(req, res), true)
  })

  // GET ONE - user
  app.get('/users/:id', (req, res) => {
    auth(req, res, () => userOne(req, res))
  })

  // CREATE - any
  app.post('/users', (req, res) => {
    userAdd(req, res)
  })

  // UPDATE - user
  app.put('/users/:id', (req, res) => {
    auth(req, res, () => userEdit(req, res))
  })

  // DELETE - user
  app.delete('/users/:id', (req, res) => {
    auth(req, res, () => userDelete(req, res))
  })
}
