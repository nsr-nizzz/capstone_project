const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const onlyStudentMiddleware = require('../middlewares/only-student-middleware');
const userController = require('../controllers/user-controller');

// GET /api/users -> admin only
router.get('/', authenticationMiddleware, onlyAdminMiddleware, userController.index);

// GET /api/users/me -> profil user login
router.get('/me', authenticationMiddleware, userController.getMe);

// GET /api/users/:id -> admin only
router.get('/:id', authenticationMiddleware, onlyAdminMiddleware, userController.getById);

// PATCH /api/users
router.patch('/', authenticationMiddleware, userController.update);

// DELETE /api/users/:id -> admin only
router.delete('/:id', authenticationMiddleware, onlyAdminMiddleware, userController.deleteById);

module.exports = router;
