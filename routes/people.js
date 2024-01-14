const express = require('express');
const router = require('express').Router();

const peopleController = require('../controllers/people');

router.get('/', peopleController.getAll);

router.get('/:id', peopleController.getSingle);

module.exports = router;
