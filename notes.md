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
