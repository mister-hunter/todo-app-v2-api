module.exports = (req, res) => {
  const { v4: uuidv4 } = require('uuid')
  const bcrypt = require('bcrypt')
  const path = './data/users.json'
  const readFile = require('../utils/read')
  const writeFile = require('../utils/write')

  readFile(data => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(200).send({ error: 'Missing credentials' })
    }
    const newUserId = uuidv4()

    for (let i = 0; i < data.length; i++) {
      const user = data[i]

      if (user !== null) {
        if (user.email === email) {
          return res.status(200).send({ error: 'User already exists' })
        }
      }
    }

    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        return res.status(200).send({ error: "Can't hash password" })
      }

      data = [...data, { id: newUserId, email, password: hash, saldo: 0 }]

      writeFile(
        JSON.stringify(data, null, 2),
        () => {
          return res.status(200).send({ message: 'User successfully added' })
        },
        path
      )
    })
  }, path)
}
