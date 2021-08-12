const connection = require("./connection");
const { ObjectId } = require("mongodb");

const getAll = () => connection().then(
  db => db.collection('lances').find().toArray()
)

const increaseLances = (id) => connection().then(
  db => db.collection('lances').updateOne(
    { _id: ObjectId(id) },
    { $inc: { lances: 5 } }
  )
)

const getById = (id) => connection().then(
  db => db.collection('lances').findOne(
    { _id: ObjectId(id) },
  )
)

module.exports = {
  getAll,
  increaseLances,
  getById
}