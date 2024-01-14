const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('people').find();
    result.toArray().then((people) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(people);
    });
};

const getSingle = async (req, res) => {
    const peopleId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('people')
        .find({ _id: peopleId });

    result.toArray().then((people) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(people[0]);
    });
};

module.exports = {
    getAll,
    getSingle,
};
