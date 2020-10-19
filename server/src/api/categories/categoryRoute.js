const express = require('express')
const router = express.Router()
const categoriesController = require('./categoryController')
const auth = require('../../../config/auth')
const {check} = require('express-validator');

router.get('/', auth, categoriesController.index)
router.post('/', [
  check('title').trim().escape().isLength({min: 3, max: 150}).withMessage('Title must be between 3 to 150 characters'),
], auth, categoriesController.create)

router.get('/:id', [
  check('id').trim().escape().isMongoId().withMessage('ID is not mongoID'),
], auth, categoriesController.show)

router.get('/search/:searchText/:page', [
  check('searchText').trim().escape().isLength({min: 3}).withMessage('Search query required with minimum 3 characters'),
], auth, categoriesController.search)

router.patch('/:id', [
  check('id').trim().escape().isMongoId().withMessage('ID is not mongoID'),
  check('title').trim().escape().isLength({min: 3, max: 150}).withMessage('Title must be between 3 to 150 characters'),
], auth, categoriesController.update)

router.delete('/:id', [
  check('id').trim().escape().isMongoId().withMessage('ID is not mongoID'),
], auth, categoriesController.destroy)

module.exports = router