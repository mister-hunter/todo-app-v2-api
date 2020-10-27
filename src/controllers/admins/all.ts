module.exports = (req, res) => {
  const readFile = require('../utils/read')
  const adminPath = './data/admins.json'
  const userPath = './data/users.json'

  readFile((err, adminData) => {
    if (err) {
      return res.status(200).send({ error: "Can't read file" })
    }

    readFile((err, userData) => {
      if (err) {
        return res.status(200).send({ error: "Can't read file" })
      }

      const resData = []

      for (let i = 0; i < adminData.length; i++) {
        const admin = adminData[i]

        for (let j = 0; j < userData.length; j++) {
          const user = userData[j]

          if (user === null) {
            return
          }

          if (admin === user.id) {
            resData.push({ id: user.id, email: user.email })
          }
        }
      }

      return res
        .status(200)
        .send({ message: 'Successfully fetched admins', data: resData })
    }, userPath)
  }, adminPath)
}
