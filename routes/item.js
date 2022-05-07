const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item');

router.get('/', itemController.getAll);

router.get('/:id', itemController.getSingle);

router.post('/', itemController.createitem);

router.put('/:id', itemController.updateitem);

router.delete('/:id', itemController.deleteitem);

module.exports = router;