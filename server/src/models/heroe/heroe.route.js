const express = require('express');
const Heroes = require('./heroe.controller.js');
const router = express.Router();

router.get('/', Heroes.get);

router.get('/:heroe_id', Heroes.getById);

router.put('/:heroe_id', Heroes.update);

router.post('/create', Heroes.post);

router.delete('/:heroe_id', Heroes.remove);

module.exports = router;