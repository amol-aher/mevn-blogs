const express = require('express')
const router = express.Router()
const guestController = require('./guestController')
const {check} = require('express-validator');

router.get('/guest-categories', guestController.allCategories)

module.exports = router