const randomstring = require('randomstring')

function generateString() {
    return randomstring.generate(4);
}

module.exports.generateString = generateString;