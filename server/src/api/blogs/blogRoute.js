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

router.get('/:id', [
  check('id').trim().escape().isMongoId().withMessage('ID is not mongoID'),
], auth, blogsController.show)

router.get('/search/:searchText/:page', [
  check('searchText').trim().escape().isLength({min: 3}).withMessage('Search query required with minimum 3 characters'),
], auth, blogsController.search)

router.delete('/:id', [
  check('id').trim().escape().isMongoId().withMessage('ID is not mongoID'),
], auth, blogsController.destroy)

module.exports = router