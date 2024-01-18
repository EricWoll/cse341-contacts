const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const setCorsHeader = (response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
};

const getAll = async (req, res) => {
    /*
        #swagger.summary = 'Gets all users'
        #swagger.tags=['Users']
    */
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
    /*
        #swagger.summary = 'Gets a single user'
        #swagger.description = 'Gets a single user based on an "_id"'
        #swagger.tags=['Users']
        #swagger.parameters['id'] = {
            description: 'Id of user',
            required: true,
            type: 'number',
            schema: {id},
    */
    const userId = new ObjectId(req.params.id);
    const user = await mongodb
        .getDatabase()
        .db()
        .collection(process.env.MONGO_COLLECTION)
        .findOne({ _id: userId });

    res.setHeader('Content-Type', 'application/json');
    setCorsHeader(res);
    res.status(200).json(user);
};

const createUser = async (req, res) => {
    /*
        #swagger.summary = 'Creates a new user'
        #swagger.description = 'Creates a new user based on an "_id"'
        #swagger.tags=['Users']
    */
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection(process.env.MONGO_COLLECTION)
        .insertOne(user);

    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(
            response.error || 'Some error occured while creating the user.'
        );
    }
};

const updateUser = async (req, res) => {
    /*
        #swagger.summary = 'Updates a single user'
        #swagger.description = 'Updates a single user based on an "_id"'
        #swagger.tags=['Users']
        #swagger.parameters['id'] = {
            description: 'Id of user',
            required: true,
            type: 'number',
            schema: {id},
    */
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection(process.env.MONGO_COLLECTION)
        .replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(
            response.error || 'Some error occured while updating the user'
        );
    }
};

const deleteUser = async (req, res) => {
    /*
        #swagger.summary = 'Deletes a single user'
        #swagger.description = 'Deletes a single user based on an "_id"'
        #swagger.tags=['Users']
        #swagger.parameters['id'] = {
            description: 'Id of user',
            required: true,
            type: 'number',
            schema: {id},
    */
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
        .getDatabase()
        .db()
        .collection(process.env.MONGO_COLLECTION)
        .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(
            response.error || 'Some error occured while deleting the user.'
        );
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
};
