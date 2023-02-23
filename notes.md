# MongoDB

Collections and Documents

## Atlas
MongoDB as a service

Can also install mongoDB locally

`https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/`

# Start mongodb server

```sh
sudo systemctl start mongod
```

## Optional

Configure MongoDB to run after system reboot

```sh
sudo systemctl enable mongod
```

Start mongo shell

```sh
mongosh
```

# Document Structure

Looks like JSON, however it's being stored as BSON which is Binary JSON.

```sh
{
  "title": "My first blog post",
  "author": "Yoshi",
  "title": ["video games", "reviews"],
  "upVotes": 20,
  "body": "Lorem ipsum...",
  "_id": ObjectId("ai5eg8H9Pk12")
}
```

The `id` is a special `ObjectId type` and `it's assigned to the document by mongo db itself`.

Can also have `nested documents`

```sh
{
  "title": "My first blog post",
  "author": {
    "name":"Yoshi",
    "email":"yoshi@example.com",
    "role":"Game Reviewer",
  },
  "title": ["video games", "reviews"],
  "upVotes": 20,
  "body": "Lorem ipsum...",
  "_id": ObjectId("ai5eg8H9Pk12")
}
```

Select database

```sh
use <dbName>
```

Can create variables
```sh
var name = "yoshi"
```

Help with commands

```sh
help
```

## insertOne (evern if collection does not yet exist)

```sh
db.books.insertOne({title: "The Color of Magic", author: "Terry Pratchett", pages: 300, rating: 7, genres: ["fantasy", "magic"]})
```

Can do this even if the collection does not yet exist

```sh
db.authors.insertOne({name: "Brandon Sanderson", age: 60})
```

## insertMany (evern if collection does not yet exist)

```sh
db.books.insertMany([{title: "The Light Fantastic", author: "Terry Pratchett", pages: 250, rating: 6, genres: ["fantasy"]}, {title: "Dune", author: "Frank Herbert", pages: 500, rating: 10, genres: ["sci-fi", "dystopian"]}])
```

# Find Documents

Get first 20 books

```sh
db.books.find()
```

you can then type

```sh
it
```

to iterate over the next 20 and so on.

## Filtering

```sh
db.books.find({author: "Terry Pratchett"})

db.books.find({author: "Terry Pratchett", rating: 7})
```

## Return specified fields

```sh
db.books.find({author: "Brandon Sanderson"}, {title: 1, author: 1})
```

All books, but only return the specified fields
```sh
db.books.find({}, {title: 1, author: 1})
```

## findOne

```sh
db.books.findOne({_id: ObjectId("63edbeac0d96f13c66a88f5f")})
```

# Limiting and Sorting Data

## Limiting

```sh
db.books.find().count()
```

Combining with filter
```sh
db.books.find({author: "Brandon Sanderson"}).count()
```

Limiting the number of results returned
```sh
db.books.find().limit(3)
```

## Sorting

```sh
db.books.find().sort({ title: 1 })
```

Providing `{ title: 1 }` means sort by title in ascending order.
`{ title: -1 }` means sort by title in descending order.

## Combining

```sh
db.books.find().sort({ title: 1}).limit(3)
```

# Nested Documents

The value of field can be a nested document, or an array of nested documents

```json
{
  "title": "The Way of Kings",
  "genres": ["fantasy", "sci-fi"],
  "rating": 9,
  "author": "Brandon Sanderson",
  "_id": ObjectId("63edb96ff3d635820c583d9c"),
  "stock": {
    "count": 21,
    "price": 7.99,
  }  
}
```

```json
{
  "title": "The Way of Kings",
  "genres": ["fantasy", "sci-fi"],
  "rating": 9,
  "author": "Brandon Sanderson",
  "_id": ObjectId("63edb96ff3d635820c583d9c"),
  "reviews": [
    {"name":"Great Read!","body":"Lorem ipsum..."},
    {"name":"So so I guess","body":"Lorem ipsum..."},
    {"name":"My fav ever book","body":"Lorem ipsum..."}
  ]
}
```

Having nested documents can improve read performance in some cases.

If the number of reviews becomes huge, then it might be worth just storing the latest reviews on each book document.

Then any further reviews can be fetched from a separate reviews collection when we need them.

## insertOne

```sh
db.books.insertOne({title: "The Way of Kings", author: "Brandon Sanderson", rating: 9, pages: 400, genres: ["fantasy"], reviews: [{name: "Yoshi", body: "Great book!!"},{name: "Mario", body: "so so"}]})
```

## insertMany

```sh
db.books.insertMany([ { title: 'The Light Fantastic', author: 'Terry Pratchett', pages: 250, rating: 7, genres: ['fantasy', 'magic'], reviews: [ { name: 'Luigi', body: 'It was pretty good' }, { name: 'Bowser', body: 'Loved It!!!' }, ], }, { title: 'The Name of the Wind', author: 'Patrick Rothfuss', pages: 500, rating: 10, genres: ['fantasy'], reviews: [{ name: 'Peach', body: 'One of my favs' }], }, { title: 'The Color of Magic', author: 'Terry Pratchett', pages: 350, rating: 8, genres: ['fantasy', 'magic'], reviews: [ { name: 'Luigi', body: 'It was OK' }, { name: 'Bowser', body: 'Really good book' }, ], }, { title: '1984', author: 'George Orwell', pages: 300, rating: 7, genres: ['sci-fi', 'dystopian', 'fantasy'], reviews: [ { name: 'Peach', body: 'Not my cup of tea' }, { name: 'Mario', body: 'Meh' }, ], }, ])
```

# Operators & Complex Queries

Rating greater than 7 and greater than or equal to

```sh
db.books.find({ rating: {$gt: 7} })

db.books.find({ rating: {$gte: 7} })
```

Less than 7 and less than or equal to

```sh
db.books.find({ rating: {$lt: 7} })

db.books.find({ rating: {$lte: 7} })
```

## Combining filters

```sh
db.books.find({ rating: {$gt: 7}, author: "Patrick Rothfuss"})
```

logical operators

```sh
db.books.find({$or: [{rating: 7}, {rating: 9}]})

db.books.find({$or: [{rating: 7}, {author: "Terry Pratchett"}]})
```

pages less than 300 or pages greater than 400

```sh
db.books.find({$or: [{pages: {$lt: 300}}, {pages: {$gt: 400}}]})
```

# $in & $nin

```sh
db.books.find({rating: {$in: [7,8,9]}})
```

```sh
db.books.find({rating: {$nin: [7,8,9]}})
```

# Querying Arrays

If, inside the genres array - the search term exists, then the corresponding document will be returned.

```sh
db.books.find({genres: "fantasy"})
```

Alternatively, if you do want to `exact match` on the array

```sh
db.books.find({genres: ["fantasy"]})
```

Exact match both

```sh
db.books.find({genres: ["fantasy", "magic"]})
```

Get documents that have all of the specified genres

```sh
db.books.find({genres: {$all: ["fantasy", "sci-fi"]}})
```

Get all books where there is a review by Luigi

```sh
db.books.find({"reviews.name": "Luigi"})
```

# Deleting data

```sh
db.books.deleteOne({ _id: ObjectId("63effdeb0d96f13c66a88f66") })
```

```sh
db.books.deleteMany({author: 'Terry Pratchett'})
```

# Updating data

```sh
db.books.updateOne( {_id: ObjectId("63effdeb0d96f13c66a88f65")}, {$set: {rating: 8, pages: 360}} )
```

```sh
db.books.updateMany({ author: "Terry Pratchett"}, {$set: {author: "Terry Pratchet"}})
```

## Incrementing

```sh
db.books.updateOne({_id: ObjectId("63effdeb0d96f13c66a88f66")}, {$inc: {pages: 2}})
```

## Negative incrementing

```sh
db.books.updateOne({_id: ObjectId("63effdeb0d96f13c66a88f66")}, {$inc: {pages: -2}})
```

## Push / Pull (modifying arrays)

Remove item from array

```sh
db.books.updateOne({_id: ObjectId("63effdeb0d96f13c66a88f66")}, {$pull: {genres: "fantasy"}})
```

Add item to array

```sh
db.books.updateOne({_id: ObjectId("63effdeb0d96f13c66a88f66")}, {$push: {genres: "fantasy"}})
```

## $each

Add another 2 genres (named, '1' and '2')

```sh
db.books.updateOne({_id: ObjectId("63effdeb0d96f13c66a88f66")}, {$push: {genres: {$each: ["1","2"]}}})
```

## Basic starter

```js
const express = require('express')

const app = express()

app.listen(3000, () => {
  console.log('app listening on port 3000')
})

app.get('/books', (req, res) => {
  res.json({ msg: "Welcome to the api" })
})

```

## MongoDB Drivers

```sh
npm i mongodb
```

# Connecting to MongoDB

db.js

```js
const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/bookstore')
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
```

app.js

```js
const express = require('express')
const { connectToDb, getDb } = require('./db')

const app = express()

let db

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})

app.get('/books', (req, res) => {
  res.json({ msg: "Welcome to the api" })
})
```

# Cursors and Fetching Data

The `find` method returns a `cursor`

```js
db.collection('books').find() // cursor
```

we can use `toArray` and `forEach` with the above

`toArray` fetches all of the `Document`s

When we use either of these two methods, MongoDB `gets the Documents in batches`

The collection could contain many `Document`s.

`Default batch size is 101 Document`s

The `sort` method also `returns a cursor`

# Fetch data

## All docs

app.js

```js
...
app.get('/books', (req, res) => {
  let books = []

  db.collection('books')
    .find()
    .sort({ author: 1 })
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})
```

## Single doc

```js
app.get('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not fetch the document'})
      })
  } else {
    res.status(500).json({error: 'Not a valid doc id'})
  }
})
```

## Add book

```js
app.post('/books', (req, res) => {
  const book = req.body
  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({err: 'Could not create a new document'})
    })
})
```

## Delete book

```js
app.delete('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .deleteOne({_id: new ObjectId(req.params.id)})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not delete the document'})
      })
  } else {
    res.status(500).json({error: 'Not a valid doc id'})
  }
})
```

## Update book

```js
app.patch('/books/:id', (req, res) => {
  const updates = req.body

  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not update the document'})
      })
  } else {
    res.status(500).json({error: 'Not a valid doc id'})
  }
})
```
