const express = require('express')
const router = express.Router()
const commentsController = require('./commentController')
const auth = require('../../../config/auth')
const apPConfig = require('../../../config/appConfig')
const {check} = require('express-validator');

router.post('/:refModel/:refId', [
  check('refModel').isIn(apPConfig.commentsFor),
  check('body').trim().escape().isLength({min: 3}).withMessage('Body must be greater than 3 characters'),
], auth, commentsController.create)

router.delete('/:id', [
  check('id').trim().escape().isMongoId().withMessage('ID is not mongoID'),
], auth, commentsController.destroy)

module.exports = router