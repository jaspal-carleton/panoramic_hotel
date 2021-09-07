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
        let isBookingExist = false;
        const bookingDateList = getBookingDateList(checkin_date, checkout_date);
        for (const bookingDate of bookingDateList) {
            if (typeof bookingDatesDB.get(bookingDate) !== "undefined") {
                isBookingExist = true;
            }
        };
        if (!isBookingExist) {
            const uid = generateRandomUid();
            bookingDetailsDB.set(uid, {
                email,
                first_name,
                last_name,
                guest_count,
                checkin_date,
                checkout_date
            });
            for (const bookingDate of bookingDateList) {
                bookingDatesDB.set(bookingDate, {
                    id: uid
                });
            };
            obj.status = true;
            obj.id = uid;
            obj.email = email;
            console.log("New booking", obj);
        }
        return obj;
    } catch (err) {
        throw {
            message: err
        };
    }
}

async function fetchBooking(uid) {
    try {
        let obj = {
            status: false
        };
        let bookingDetails = bookingDetailsDB.get(uid);
        if (typeof bookingDetails !== "undefined") {
            obj.status = true;
            obj.data = {...bookingDetails};
        }
        return obj;
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