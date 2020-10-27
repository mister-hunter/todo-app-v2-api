module.exports = (req, res) => {
  const readFile = require('../utils/read')
  const writeFile = require('../utils/write')
  const path = './data/admins.json'

  const id = req.params['id']

  if (id) {
    readFile(data => {
      if (data.length <= 1) {
        return res.status(200).send({ message: "Can't remove last admin" })
      }

      const newData = []

      for (let i = 0; i < data.length; i++) {
        const item = data[i]

        if (item !== id) {
          newData.push(item)
        }
      }

      writeFile(
        JSON.stringify(newData, null, 2),
        () => {
          res.status(200).send({ message: 'Removed admin' })
        },
        path
      )
    }, path)
  } else {
    res.status(200).send({ error: 'Invalid ID' })
  }
}
