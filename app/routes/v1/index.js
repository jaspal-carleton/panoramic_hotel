/**
 * Module dependencies
 */
const router = require('express').Router();

/**
 * Attach route(s)
 */
router.use('/', require('./booking'));

/**
 * Export router
 */
module.exports = router;