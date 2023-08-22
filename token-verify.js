const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaW1vbiIsInJvbGUiOiJhZG1pbiJ9.2Zux-OnEC_0wY_J0nOkxlES5PsHDzDqZ7KGywAfpgd0'
function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);
