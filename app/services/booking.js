/**
 * Module dependencies
 */
const { generateRandomUid } = require('../helpers/hash');

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
        const uid = generateRandomUid();
        return uid;
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