const randomstring = require('randomstring')

function generateString() {
    return randomstring.generate(6);
}

module.exports.generateString = generateString;