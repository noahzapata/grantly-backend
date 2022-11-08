const { create, list, show, update, destroy } = require('./cart.controller');
const router = require('express').Router();
const { auth } = require('../../utils/auth');

router.post('/', auth, create);
router.get('/', list);
router.get('/:cartId', show);
router.put('/:cartId', update);
router.get('/destroy/:cartId', destroy);

module.exports = router;
