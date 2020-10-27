module.exports = (fileData, callback, filePath, encoding = 'utf8') => {
  const fs = require('fs')

  fs.writeFile(filePath, fileData, encoding, err => {
    if (err) {
      throw err
    }

    callback()
  })
}
