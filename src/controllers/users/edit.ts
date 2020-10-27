module.exports = (req, res) => {
  const bcrypt = require('bcrypt')
  const path = './data/users.json'
  const readFile = require('../utils/read')
  const writeFile = require('../utils/write')

  const id = req.params['id']
  const email = req.body.email
  const password = req.body.password

  if (id) {
    readFile(data => {
      const resData = []

      for (let i = 0; i < data.length; i++) {
        const item = data[i]

        if (item.id !== id) {
          resData.push(item)
        } else {
          bcrypt.hash(password, 10, (error, hash) => {
            if (error) {
              return res.status(200).send({ error: "Can't hash password" })
            }

            resData.push({
              id,
              email: email ? email : item.email,
              password: password ? password : hash,
              saldo: item.saldo,
            })
          })
        }
      }

      writeFile(
        JSON.stringify(resData, null, 2),
        () => {
          return res.status(200).send({ messsage: 'Updated user' })
        },
        path
      )
    }, path)
  } else {
    return res.status(200).send({ error: 'Invalid ID' })
  }
}
