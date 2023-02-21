const express = require('express')

const app = express()

app.listen(3000, () => {
  console.log('app listening on port 3000')
})

app.get('/books', (req, res) => {
  res.json({ msg: "Welcome to the api" })
})
