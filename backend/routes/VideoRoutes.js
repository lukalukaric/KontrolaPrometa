var express = require('express');
var router = express.Router();
var VideoController = require('../controllers/VideoController.js');

/*
 * GET
 */
router.get('/', VideoController.list);

/*
 * GET
 */
router.get('/:id', VideoController.show);

/*
 * POST
 */
router.post('/', VideoController.create);

/*
 * PUT
 */
router.put('/:id', VideoController.update);

/*
 * DELETE
 */
router.delete('/:id', VideoController.remove);

module.exports = router;
