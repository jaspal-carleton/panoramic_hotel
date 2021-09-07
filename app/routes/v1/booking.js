/**
 * Module dependencies
 */
 const router = require('express').Router();
 const {
     createBooking,
     fetchBooking,
     deleteBooking
 } = require('../../services/booking');
 const {
     generateError,
     generateSuccess
 } = require('../../helpers/response');
 const {
     validateParams
 } = require('../../helpers/params');
 const {
     validateEmail,
     validateName,
     validateGuestCount,
     validateDateFormat,
     validateBookingStartDate,
     validateDateRange
 } = require('../../helpers/payload');

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

    // Extract body object
    const email = body.email;
    const first_name = body.first_name;
    const last_name = body.last_name;
    const guest_count = body.guest_count;
    const checkin_date = body.checkin_date;
    const checkout_date = body.checkout_date;

    // Validate body object attribute values
    if (!validateEmail(email)) {
        next(generateError(400, "INVALID_EMAIL"));
        return;
    }
    if (!validateName(first_name)) {
        next(generateError(400, "INVALID_FIRST_NAME"));
        return;
    }
    if (!validateName(last_name)) {
        next(generateError(400, "INVALID_LAST_NAME"));
        return;
    }
    if (!validateGuestCount(guest_count)) {
        next(generateError(400, "INVALID_GUEST_COUNT"));
        return;
    }
    if (!validateDateFormat(checkin_date)) {
        next(generateError(400, "INVALID_CHECKIN_DATE"));
        return;
    }
    if (!validateDateFormat(checkout_date)) {
        next(generateError(400, "INVALID_CHECKOUT_DATE"));
        return;
    }
    if (!validateBookingStartDate(checkin_date)) {
        next(generateError(400, "INVALID_CHECKIN_START_DATE"));
        return;
    }
    if (!validateDateRange(checkin_date, checkout_date)) {
        next(generateError(400, "INVALID_HOLIDAY_COUNT"));
        return;
    }

    // Create new booking
    const reply = createBooking(
        email,
        first_name,
        last_name,
        guest_count,
        checkin_date,
        checkout_date
    );
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