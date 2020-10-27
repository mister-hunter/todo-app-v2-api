module.exports = (req, res) => {
  const readFile = require('../utils/read')
  const path = './data/users.json'

  const id = req.params['id']

  if (id) {
    readFile((err, data) => {
      if (err) {
        throw err
      }

      let user = null

      for (let i = 0; i < data.length; i++) {
        const u = data[i]

        if (u.id === id) user = u
      }

      if (user !== null) {
        user.password = ''

        return res
          .status(200)
          .send({ message: 'Successfully fetched user', data: user })
      } else {
        return res.status(200).send({ error: 'Invalid ID' })
      }
    }, path)
  } else {
    return res.status(200).send({ error: 'Invalid ID' })
  }
}
