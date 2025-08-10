const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const userCourseController = require('../controllers/user-course-controller');

// POST api/user_courses -> bisa admin dan student
router.post('/', authenticationMiddleware, userCourseController.enroll);

module.exports = router;
