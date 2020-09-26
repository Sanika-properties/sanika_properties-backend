const express = require('express');
const router = express.Router();
const {
    login_post,
    signup_post,
    logout_get,
    contact_post
} = require('../controllers/authControllers');








router.post('/signup', signup_post);

router.post('/login', login_post);

router.get('/logout', logout_get);

router.post('/contact', contact_post);



module.exports = router;