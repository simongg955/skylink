const randomString = require('randomstring')

function generateString(){
    return randomString.generate(6);
}

module.exports.generateString = generateString;