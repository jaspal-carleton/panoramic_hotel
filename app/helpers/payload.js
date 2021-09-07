/**
 * Module dependencies
 */
const moment = require('moment-timezone');

/**
 * @description validate email
 * @param {String} emailString - email id
 * @returns {Boolean}
 */
function validateEmail(emailString) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailString);
}

/**
 * @description validate name
 * @param {String} nameString - guest name
 * @returns {Boolean}
 */
function validateName(nameString) {
    return String(nameString).length > 1 ? true : false;
}

/**
 * @description validate guest count (max 3 guest allowed)
 * @param {Number} guestCount - count of guest
 * @returns {Boolean}
 */
function validateGuestCount(guestCount) {
    try {
        guestCount = parseInt(guestCount, 10);
    } catch (err) {
        return false;
    }
    if (isNaN(guestCount)) {
        return false;
    } else if (guestCount < 1 || guestCount > 3) {
        return false;
    } else {
        return true;
    }
}

/**
 * @description validate date format
 * @param {String} dateString - date
 * @returns {Boolean}
 */
function validateDateFormat(dateString) {
    return moment(dateString, 'YYYY-MM-DD', true).isValid();
}

/**
 * @description validate booking date (next day onwards allowed)
 * @param {String} startDate - date
 * @returns {Boolean}
 */
function validateBookingStartDate(startDate) {
    const todayDate = moment().format('YYYY-MM-DD');
    const todayMs = moment(todayDate, 'YYYY-MM-DD').valueOf();
    const startMs = moment(startDate, 'YYYY-MM-DD').valueOf();
    return startMs > todayMs ? true : false;
}

/**
 * @description validate date range (max 3 days allowed)
 * @param {String} startDate - date
 * @param {String} endDate - date
 * @returns {Boolean}
 */
function validateDateRange(startDate, endDate) {
    const endMs = moment(endDate, 'YYYY-MM-DD').valueOf();
    const startMs = moment(startDate, 'YYYY-MM-DD').valueOf();
    const diffMs = endMs - startMs;
    if (diffMs === 0 || diffMs === 86400000 || diffMs === 172800000) {
        return true;
    } else {
        return false;
    }
}

/**
 * @description get booking date list in milliseconds
 * @param {Date} startDate - booking start date
 * @param {Date} endDate - booking end date
 * @returns {Array}
 */
function getBookingDateList(startDate, endDate) {
    let rtnArr = [];
    const endMs = moment(endDate, 'YYYY-MM-DD').valueOf();
    const startMs = moment(startDate, 'YYYY-MM-DD').valueOf();
    const diffMs = endMs - startMs;
    if (diffMs === 0) {
        rtnArr.push(startMs);
    } else if (diffMs === 86400000) {
        rtnArr.push(startMs);
        rtnArr.push(endMs);
    } else if (diffMs === 172800000) {
        rtnArr.push(startMs);
        rtnArr.push(startMs + 86400000);
        rtnArr.push(endMs);
    } else {
        rtnArr.push(startMs);
    }
    return rtnArr;
}

/**
* Export modules
*/
module.exports = {
    validateEmail,
    validateName,
    validateGuestCount,
    validateDateFormat,
    validateBookingStartDate,
    validateDateRange,
    getBookingDateList,
};