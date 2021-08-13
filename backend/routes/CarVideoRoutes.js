var express = require('express');
var router = express.Router();
var CarVideoController = require('../controllers/CarVideoController.js');

/*
 * GET
 */
router.get('/', CarVideoController.list);

/*
 * GET
 */
router.get('/:id', CarVideoController.show);

/*
 * POST
 */
router.post('/', CarVideoController.create);

/*
 * PUT
 */
router.put('/:id', CarVideoController.update);

/*
 * DELETE
 */
router.delete('/:id', CarVideoController.remove);

module.exports = router;
