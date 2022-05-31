
const {v4: uuidv4} = require('uuid');

const checkCookie = function (req, res, next) {
    const userId = req.cookies['user_id'];
    if (!userId) {
        const userId = uuidv4();
        res.cookie('user_id', userId, {httpOnly: true, secure: false });
    }
    req.user_id = userId
    next()
}

module.exports = checkCookie