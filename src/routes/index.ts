const router = require('express').Router();

// Auth routes
router.use('/auth', require('./auth-routes'));

// User routes
router.use('/users', require('./user-routes'));

// Course routes
router.use('/courses', require('./course-routes'));

// User-course routes
router.use('/user_courses', require('./user-course-routes'));

// Module routes (nested di dalam course)
router.use('/courses/:courseSlug/modules', require('./module-routes'));

module.exports = router;
