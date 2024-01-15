const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const setCorsHeader = (response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
};

const getAll = async (req, res) => {
    const result = await mongodb
        .getDatabase()
        .db()
        .collection(process.env.MONGO_COLLECTION)
        .find();
    result.toArray().then((user) => {
        res.setHeader('Content-Type', 'application/json');
        setCorsHeader(res);
        res.status(200).json(user);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection(process.env.MONGO_COLLECTION)
        .find({ _id: userId });

    result.toArray().then((user) => {
        res.setHeader('Content-Type', 'application/json');
        setCorsHeader(res);
        res.status(200).json(user[0]);
    });
};

module.exports = {
    getAll,
    getSingle,
};
