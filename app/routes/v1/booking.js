/**
 * Module dependencies
 */
const router = require('express').Router();
const {
    validateParams
} = require('../../helpers/params');

/**
 * Route interceptor for creating new booking
 */
router.post('/booking', (req, res, next) => {
    // HTTP POST req body
    const { body } = req;

    // Check HTTP body object present
    const isValid = validateParams(body, [
        'email',
        'first_name',
        'last_name',
        'guest_count',
        'checkin_date',
        'checkout_date'
    ]);
    if (!isValid) {
        next(generateError(400, 'MISSING_MANDATORY_PARAMETERS'));
        return;
    }
    res.send(200);
});

/**
 * Fetch booking
 */
router.get('/booking/:id', (req, res, next) => {
    const params = req.params;
    const id = params.id;
    res.send(200);
});

/**
 * Delete booking
 */
router.delete('/booking/:id', (req, res, next) => {
    const params = req.params;
    const id = params.id;
    res.send(200);
});

/**
 * Export router
 */
module.exports = router;