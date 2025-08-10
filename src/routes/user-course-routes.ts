const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const userCourseController = require('../controllers/user-course-controller');

router.post('/', authenticationMiddleware, onlyAdminMiddleware, userCourseController.enroll);

module.exports = router;
