module.exports = app => {
  const auth = require('../middleware/check-auth')
  const adminAll = require('../controllers/admins/all')
  const adminAdd = require('../controllers/admins/add')
  const adminDelete = require('../controllers/admins/delete')

  // READ- admin
  app.get('/admins', (req, res) => {
    auth(req, res, () => adminAll(req, res), true)
  })

  // CREATE
  app.post('/admins', (req, res) => {
    auth(req, res, () => adminAdd(req, res), true)
  })

  // DELETE
  app.delete('/admins/:id', (req, res) => {
    auth(req, res, () => adminDelete(req, res), true)
  })
}
