module.exports = (req, res) => {
  const readFile = require('../utils/read')
  const path = './data/users.json'

  const id = req.body.id

  if (!id) {
    return res.status(200).send({ auth: false })
  } else {
    readFile((err, data) => {
      if (err) {
        throw err
      }

      let user = null
      data.map(e => {
        if (e) {
          if (e.id === id) {
            user = { ...e }
          }
        }
      })

      if (user === null) {
        return res.status(200).send({ auth: false })
      } else {
        return res.status(200).send({ auth: true })
      }
    }, path)
  }
}
