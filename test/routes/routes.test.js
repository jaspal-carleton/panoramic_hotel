require("rootpath")();

/**
 * Test libraries 
 */
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const assert = chai.assert;

// Configure chai
chai.use(chaiHttp);
chai.should();

/**
 * Test suite for router
 */
describe("Test Suite - Router", function () {
    let bookingId = "";

    describe("POST /api/v1/booking", function () {
        it("should create new booking", function (done) {
            chai.request('http://localhost:5000')
                .post('/api/v1/booking')
                .send({
                    "email": "john.doe@example.com",
                    "first_name": "John",
                    "last_name": "Doe",
                    "guest_count": 2,
                    "checkin_date": "2022-12-10",
                    "checkout_date": "2022-12-12"
                })
                .then(function (res) {
                    expect(res).to.have.status(200);
                    done();
                    bookingId = res.body.data.booking_id;
                })
                .catch(function (err) {
                    throw err;
                });
        });

        it("should fail to create booking for same dates", function (done) {
            chai.request('http://localhost:5000')
                .post('/api/v1/booking')
                .send({
                    "email": "jane.doe@example.com",
                    "first_name": "Jane",
                    "last_name": "Doe",
                    "guest_count": 2,
                    "checkin_date": "2022-12-10",
                    "checkout_date": "2022-12-12"
                })
                .then(function (res) {
                    expect(res).to.have.status(409);
                    done();
                })
                .catch(function (err) {
                    throw err;
                });
        });
    });

    describe("GET /api/v1/booking", function () {
        it("should get existing booking", function (done) {
            chai.request('http://localhost:5000')
                .get('/api/v1/booking/' + bookingId)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    done();
                })
                .catch(function (err) {
                    throw err;
                });
        });

        it("should fail to get wrong booking", function (done) {
            chai.request('http://localhost:5000')
                .get('/api/v1/booking/xyz')
                .then(function (res) {
                    expect(res).to.have.status(404);
                    done();
                })
                .catch(function (err) {
                    throw err;
                });
        });
    });

    describe("DELETE /api/v1/booking", function () {
        it("should delete existing booking", function (done) {
            chai.request('http://localhost:5000')
                .delete('/api/v1/booking/' + bookingId)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    done();
                })
                .catch(function (err) {
                    throw err;
                });
        });

        it("should fail to delete wrong booking", function (done) {
            chai.request('http://localhost:5000')
                .delete('/api/v1/booking/xyz')
                .then(function (res) {
                    expect(res).to.have.status(404);
                    done();
                })
                .catch(function (err) {
                    throw err;
                });
        });
    });

});
