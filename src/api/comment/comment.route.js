const { create, list, show, update, destroy } = require('./comment.controller');
const router = require('express').Router();
const { auth } = require('../../utils/auth');

router.post('/:productId', auth, create);
router.get('/', list);
router.get('/:commentId', show);
router.put('/:commentId', update);
router.get('/destroy/:commentId', destroy);

module.exports = router;
