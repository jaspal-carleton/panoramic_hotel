require("rootpath")();

/**
 * Test libraries 
 */
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

const serviceBooking = require("app/services/booking");

/**
 * Test suite for booking services
 */
describe("Test Suite - Booking Service Functions", function () {
    let bookingId = "";

    describe("Create Booking", function () {
        it("should create new booking", function () {
            const result = serviceBooking.createBooking(
                "john.doe@example.com",
                "John",
                "Doe",
                2,
                "2022-12-10",
                "2022-12-12"
            );
            result.then( res => {
                expect(res).to.have.property('id');
                bookingId = res.id;
            })
        });

        it("should not create booking with same dates", function () {
            const result = serviceBooking.createBooking(
                "jane.doe@example.com",
                "Jane",
                "Doe",
                2,
                "2022-12-10",
                "2022-12-12"
            );
            result.then( res => {
                expect(res.status).to.be.false;
            })
        });
    });

    describe("Fetch Booking", function () {
        it("should retrieve existing booking", function () {
            const result = serviceBooking.fetchBooking(bookingId);
            result.then( res => {
                expect(res.data).to.have.property('email');
            })
        });

        it("should fail to retrieve wrong booking", function () {
            const result = serviceBooking.fetchBooking("xyz");
            result.then( res => {
                expect(res.status).to.be.false;
            })
        });
    });

    describe("Delete Booking", function () {
        it("should delete existing booking", function () {
            const result = serviceBooking.deleteBooking(bookingId);
            result.then( res => {
                expect(res.status).to.be.true;
            })
        });

        it("should fail to delete wrong booking", function () {
            const result = serviceBooking.deleteBooking("xyz");
            result.then( res => {
                expect(res.status).to.be.false;
            })
        });
    });
    
});
