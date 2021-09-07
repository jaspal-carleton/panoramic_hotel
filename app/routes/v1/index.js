/**
 * Module dependencies
 */
const router = require('express').Router();

/**
 * Attach route(s)
 */
router.use('/', require('./booking'));
router.use('/', require('./unknown'));

/**
 * Export router
 */
module.exports = router;