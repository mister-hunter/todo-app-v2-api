module.exports = (req, res) => {
  const readFile = require('../utils/read')
  const writeFile = require('../utils/write')
  const path = './data/admins.json'

  readFile(data => {
    const id = req.body.id

    if (!id) {
      return res.status(200).send({ error: 'Missing ID' })
    }

    let exists = false

    for (let i = 0; i < data.length; i++) {
      const user = data[i]

      if (user !== null) {
        if (user.id === id) {
          exists = true
        }
      }
    }

    if (exists) {
      return res.status(200).send({ message: 'Admin already exists' })
    }

    data = [...data, id]

    writeFile(
      JSON.stringify(data, null, 2),
      () => {
        return res.status(200).send({ message: 'Admin successfully added' })
      },
      path
    )
  }, path)
}
