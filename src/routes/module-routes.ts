const router = require('express').Router({ mergeParams: true });

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const moduleController = require('../controllers/module-controller');

// GET semua modul di course
router.get('/', moduleController.index);

// GET modul spesifik
router.get('/:moduleSlug', moduleController.show);

// Middleware proteksi untuk operasi CUD
router.use(authenticationMiddleware, onlyAdminMiddleware);

// POST modul baru
router.post('/', moduleController.create);

// PATCH modul
router.patch('/:moduleSlug', moduleController.update);

// DELETE modul
router.delete('/:moduleSlug', moduleController.destroy);

module.exports = router;
