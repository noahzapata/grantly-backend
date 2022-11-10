const Router = require('express');
const { formData } = require('../../utils/formData');
const { auth } = require('../../utils/auth');
const {
  signUpHandler,
  signInHandler,
  list,
  show,
  update,
  destroy,
  findUserProducts,
  findUserFavs,
} = require('./user.controller');
const router = Router();

router.get('/', list);
router.post('/signup', signUpHandler);
router.post('/login', signInHandler);
router.get('/data', auth, show);
router.post('/userproducts', findUserProducts);
router.post('/userfavs', findUserFavs);
router.delete('/delete/:userId', destroy);
router.post('/update', formData, update);

module.exports = router;
