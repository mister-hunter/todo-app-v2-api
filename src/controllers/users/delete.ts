module.exports = (req, res) => {
  const readFile = require('../utils/read')
  const writeFile = require('../utils/write')
  const path = './data/users.json'

  const id = req.params['id']

  if (id > 0) {
    readFile(
      data => {
        if (data.length <= 1) {
          return res.status(200).send({ error: "Can't remove last user" })
        }

        const newData = []

        for (let i = 0; i < data.length; i++) {
          const item = data[i]

          if (item.id !== id) {
            newData.push(item)
          }
        }

        writeFile(
          JSON.stringify(newData, null, 2),
          () => {
            res.status(200).send({ message: 'Removed user' })
          },
          path
        )
      },
      true,
      path
    )
  } else {
    return res.status(200).send({ error: 'Invalid ID' })
  }
}
