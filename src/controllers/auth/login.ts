module.exports = (req, res) => {
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const readFile = require('../utils/read')
  const path = './data/users.json'

  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(200).send({ error: 'Invalid credentials' })
  }

  if (email.length > 0) {
    readFile((err, data) => {
      if (err) {
        throw err
      }

      let user = null
      data.map(e => {
        if (e) {
          if (e.email === email) {
            user = { ...e }
          }
        }
      })

      if (user === null) {
        return res.status(200).send({ error: 'Invalid credentials' })
      }

      bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
          return res.status(200).send({ error: 'Invalid credentials' })
        } else if (response) {
          const token = jwt.sign(
            {
              email: user.email,
              id: user.id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h',
            }
          )

          return res.status(200).send({
            message: 'Authorization successful',
            token,
            id: user.id,
          })
        } else {
          return res.status(200).send({ error: 'Invalid credentials' })
        }
      })
    }, path)
  } else {
    return res.status(200).send({ error: 'Invalid credentials' })
  }
}
