const { MongoClient } = require('mongodb')

let dbConnection
let uri = 'mongodb://localhost:27017/bookstore' // local
//let uri = 'mongodb+srv://<username>:<password>@cluster0.ew3syjk.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}