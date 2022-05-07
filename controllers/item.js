const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('item').find();
  //console.log(result.toArray());
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
//res.send('Hi does this work?')
};

const getSingle = async (req, res) => {
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('item').find({ _id: itemId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createitem = async (req, res) => {
  const item = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('item').insertOne(item);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the item.');
  }
};

const updateitem = async (req, res) => {
  const itemId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const item = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('item')
    .replaceOne({ _id: itemId }, item);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the item.');
  }
};

const deleteitem = async (req, res) => {
  const itemId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('item').remove({ _id: itemId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the item.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createitem,
  updateitem,
  deleteitem
};