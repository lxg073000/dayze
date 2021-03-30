const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateEventInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : ''

    if(!Validator.isLength(data.title, { min: 1, max: 50 })) {
        errors.title = 'title is too long'
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title is required'
    }

    if(!Validator.isLength(data.description, { min: 0, max: 200 })) {
        errors.description = 'description must be less than 200 characters'
    }

    if (Validator.isEmpty(data.date)) {
        errors.date = 'Date is required'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}