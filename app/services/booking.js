/**
 * Module dependencies
 */
const HashMap = require('hashmap');
const { generateRandomUid } = require('../helpers/hash');
const { getBookingDateList } = require('../helpers/payload');

/**
 * Setup in-memory database
 */
let bookingDetailsDB = new HashMap();
let bookingDatesDB = new HashMap();

/**
 * @description Create new booking
 * @param {String} email 
 * @param {String} first_name 
 * @param {String} last_name 
 * @param {Number} guest_count 
 * @param {Date} checkin_date 
 * @param {Date} checkout_date 
 * @returns {Object}
 */
async function createBooking(
    email,
    first_name,
    last_name,
    guest_count,
    checkin_date,
    checkout_date) {
    try {
        let obj = {
            status: false
        };
        const uid = generateRandomUid();
        bookingDetailsDB.set(uid, {
            email,
            first_name,
            last_name,
            guest_count,
            checkin_date,
            checkout_date
        });
        obj.status = true;
        obj.id = uid;
        obj.email = email;
        console.log("New booking", obj);
        return obj;
    } catch (err) {
        throw {
            message: err
        };
    }
}

async function fetchBooking(uid) {
    try {
        return {};
    } catch (err) {
        throw {
            message: err
        }
    }
}

async function deleteBooking(uid) {
    try {
        return {};
    } catch (err) {
        throw {
            message: err
        }
    }
}

module.exports = {
    createBooking,
    fetchBooking,
    deleteBooking
};