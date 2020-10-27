module.exports = (callback, filePath, encoding = 'utf8') => {
  const fs = require('fs')

  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err
    }

    callback(JSON.parse(data))
  })
}
