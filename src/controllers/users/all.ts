module.exports = (req, res) => {
  const readFile = require('../utils/read')
  const path = './data/users.json'

  readFile((err, data) => {
    if (err) {
      throw err
    }

    return res.send({
      message: 'Successfully fetched users',
      data,
    })
  }, path)
}
