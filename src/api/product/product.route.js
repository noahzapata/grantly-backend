const { create, list, show, update, destroy } = require('./product.controller');
const router = require('express').Router();
const { auth } = require('../../utils/auth');

router.post('/', auth, create);
router.get('/', list);
router.get('/:productId', show);
router.put('/:productId', update);
router.get('/destroy/:productId', destroy);

module.exports = router;
