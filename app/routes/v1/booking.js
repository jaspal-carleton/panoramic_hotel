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
    reply.then(result => {
        if (result.status) {
            const obj = {
                booking_id: result.id,
                email_id: result.email,
                retrive_booking: {
                    http_method: 'GET',
                    api_endpoint: '/api/v1/booking/:booking_id',
                    full_url: 'http://localhost:5000/api/v1/booking/' + result.id
                },
                cancel_booking: {
                    http_method: 'DELETE',
                    api_endpoint: '/api/v1/booking/:booking_id',
                    full_url: 'http://localhost:5000/api/v1/booking/' + result.id
                }
            }
            res.status(200);
            res.json(generateSuccess(obj));
        }
        else {
            next(generateError(409, "BOOKING_DATE_UNAVAILABLE"));
        }
    });
    reply.catch(err => next(generateError(500, "INTERNAL_SERVER_ERROR")));
});

/**
 * Fetch booking
 */
router.get('/booking/:id', (req, res, next) => {
    const params = req.params;
    const id = params.id;
    const reply = fetchBooking(id);
    reply.then(result => {
        if (result.status) {
            res.status(200);
            res.json(generateSuccess(result.data));
        }
        else {
            next(generateError(404, "NO_BOOKING_FOUND"));
        }
    });
    reply.catch(err => next(generateError(500, "INTERNAL_SERVER_ERROR")));
});

/**
 * Delete booking
 */
 router.delete('/booking/:id', (req, res, next) => {
    const params = req.params;
    const id = params.id;
    const reply = deleteBooking(id);
    reply.then(result => {
        if (result.status) {
            res.status(200);
            res.json(generateSuccess(result.data));
        }
        else {
            next(generateError(404, "NO_BOOKING_FOUND"));
        }
    });
    reply.catch(err => next(generateError(500, "INTERNAL_SERVER_ERROR")));
});

/**
 * Export router
 */
module.exports = router;