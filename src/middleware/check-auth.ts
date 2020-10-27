module.exports = (req, res, next, a) => {
  const readFile = require('../utils/read')
  const jwt = require('jsonwebtoken')

  const path = './data/admins.json'
  const id = req.headers.id ? req.headers.id : null

  let decode

  try {
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    decode = decoded
  } catch (err) {
    return res.status(401).send({ error: 'authorization failed' })
  }

  if (a) {
    if (!id) {
      return res.status(401).send({ error: 'authorization failed' })
    }

    readFile((err, data) => {
      if (err) {
        throw err
      }

      const json: any[] = JSON.parse(data)

      let user = null
      json.map(e => {
        if (e && id) {
          if (e === id) {
            user = { ...e }
          }
        }
      })

      if (user) {
        req.user = decode

        next()
      } else {
        return res.status(401).send({ error: 'authorization failed' })
      }
    }, path)
  } else {
    req.user = decode

    next()
  }
}
