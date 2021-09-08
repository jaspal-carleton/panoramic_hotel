require("rootpath")();

/**
 * Test libraries 
 */
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;

/**
 * Test data
 */
const testData = require("test/helpers/test_data.json");

const helperHash = require("app/helpers/hash");
const helperParams = require("app/helpers/params");
const helperPayload = require("app/helpers/payload");
const helperResponse = require("app/helpers/response");

/**
 * Test suite for helper functions
 */
describe("Test Suite - Helper Functions", function () {

    describe("UUID Generator", function () {
        it("returns uuid", function () {
            sinon.stub(helperHash, "generateRandomUid").returns(testData.uid);
            const result = helperHash.generateRandomUid();
            assert.equal(result, testData.uid)
        });
    });

    describe("Params Helper", function () {
        it("returns config file params", function () {
            const result = helperParams.getConfigParams('app/configs');
            expect(result).to.deep.equal(testData.paramsData);
        });

        it("validates params", function () {
            // sinon.stub(helperParams, "validateParams").returns(true);
            const result = helperParams.validateParams(testData.validateParamsData.args, testData.validateParamsData.list);
            expect(result).to.be.true;
        });
    });

    describe("Payload Helper", function () {
        it("validates email id", function () {
            const result = helperPayload.validateEmail("john@example.com");
            expect(result).to.be.true;
        });

        it("validates name", function () {
            const result = helperPayload.validateName("john");
            expect(result).to.be.true;
        });

        it("validates guest count", function () {
            const result = helperPayload.validateGuestCount(2);
            expect(result).to.be.true;
        });

        it("validates date format", function () {
            const result = helperPayload.validateDateFormat("2021-09-10");
            expect(result).to.be.true;
        });

        it("validates booking start date", function () {
            const result = helperPayload.validateBookingStartDate("2025-01-01");
            expect(result).to.be.true;
        });

        it("validates booking date range", function () {
            const result = helperPayload.validateDateRange("2021-12-01", "2021-12-03");
            expect(result).to.be.true;
        });

        it("returns booking date list", function () {
            const result = helperPayload.getBookingDateList("2021-12-01", "2021-12-03");
            expect(result).to.deep.equal([1638334800000, 1638421200000, 1638507600000]);
            // expect(result).to.be.an('array')
        });
    });

    describe("Response Helper", function () {
        it("generate error stack", function () {
            const result = helperResponse.generateError(404, "Not found");
            assert.equal(result, "NotFoundError: Not found")
        });

        it("generate success stack", function () {
            const result = helperResponse.generateSuccess("test data");
            expect(result).to.deep.equal({"success":true, "data":"test data"});
        });
    });
});
