const express = require('express')
const router = express.Router()
const blogsController = require('./blogController')
const auth = require('../../../config/auth')
const {check} = require('express-validator');

router.get('/', auth, blogsController.index)

router.post('/', [
  check('title').isLength({min:10, max:150}).trim().escape().withMessage('Title must be between 10 to 150 characters'),
  check('category').not().isEmpty().withMessage('Category is required'),
  check('description').trim().escape().not().isEmpty().withMessage('Blog description is required'),
  check('content').trim().escape().not().isEmpty().withMessage('Blog content is required'),
],auth, blogsController.create)

router.put('/:id', [
  check('title').isLength({min:10, max:150}).trim().escape().withMessage('Title must be between 10 to 150 characters'),
  check('category').not().isEmpty().withMessage('Category is required'),
  check('description').trim().escape().not().isEmpty().withMessage('Blog description is required'),
  check('content').trim().escape().not().isEmpty().withMessage('Blog content is required'),
],auth, blogsController.update)

module.exports = router