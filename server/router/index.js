const Router = require('express').Router;
const userController  = require('../controllers/user-controller');
const todosController  = require('../controllers/todos-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const friendsController = require('../controllers/friends-controller');
const collectiveTodosController = require('../controllers/collective-todos-controller');

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

router.get('/users', authMiddleware, userController.getUsers);

router.post('/create', authMiddleware, todosController.create);
router.post('/delete', authMiddleware, todosController.delete);
router.post('/complete', authMiddleware, todosController.complete);
router.post('/edit', authMiddleware, todosController.edit);
router.get('/todos', authMiddleware, todosController.todos);

router.get('/friends', authMiddleware, friendsController.friends);
router.post('/add', authMiddleware, friendsController.add);
router.post('/confirm', authMiddleware, friendsController.confirm);
router.post('/deny', authMiddleware, friendsController.deny);
router.post('/cancel', authMiddleware, friendsController.cancel);
router.post('/remove', authMiddleware, friendsController.remove);

router.get('/collective-todos', authMiddleware, collectiveTodosController.get);
router.post('/create-collective', authMiddleware, collectiveTodosController.create);
router.post('/complete-collective', authMiddleware, collectiveTodosController.complete);
router.post('/edit-collective', authMiddleware, collectiveTodosController.edit);
router.post('/delete-collective', authMiddleware, collectiveTodosController.delete);

module.exports = router;