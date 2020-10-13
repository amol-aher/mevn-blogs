const express = require('express')
const router = express.Router()
const categoriesController = require('./categoryController')
const auth = require('../../../config/auth')

router.get('/', auth, categoriesController.index)
router.post('/', auth, categoriesController.create)
router.get('/:id', auth, categoriesController.show)
router.put('/:id', auth, categoriesController.update)
router.delete('/:id', auth, categoriesController.destroy)

module.exports = router