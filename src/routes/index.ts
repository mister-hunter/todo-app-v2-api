module.exports = app => {
  const readFile = require('../utils/read')

  // default route
  app.get('/', (req, res) => {
    const path = './src/html/index.html'

    readFile((err, data) => {
      if (err) {
        throw err
      }

      res.send(data)
    }, path)
  })

  // other routes
  require('./users')(app)
  require('./auth')(app)
  require('./admins')(app)
}
