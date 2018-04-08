module.exports.responseValidatorAsync = function (expectedStatusCode, validationFunction) {
    return {
        json: function (statusCode, data) {
            statusCode.should.equal(expectedStatusCode);
            validationFunction(data);
        },
        send: function (statusCode, data) {
            statusCode.should.equal(expectedStatusCode);
            validationFunction(data);
        }
    };
};