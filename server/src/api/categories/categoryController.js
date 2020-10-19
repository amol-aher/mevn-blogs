const Category = require('./categoryModel')
const appConfig = require('../../../config/appConfig')
const { validationResult } = require('express-validator');

exports.index = async (req, res) => {
  var perPage = appConfig.pagination.perPage, page = Math.max(0, req.query.page)
  try {
    await Category.find({user: req.userData._id}).sort({createdAt: -1}).limit(perPage).skip(perPage * page).exec(function(err, categories) {
      Category.countDocuments({user: req.userData._id}).exec(function(err, count) {
        res.status(200).send({categories: categories, currentPage: page, totalPages: Math.floor(count / perPage)})
      })
    })
  } catch( error ) {
    res.status(400).send({ error: error })
  }
}

exports.create = async (req, res) => {
  req.body.user = req.userData._id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() })
  }
  const category = new Category(req.body)
  category.save().then(data => {
    return res.status(201).send(data)
  }).catch(err => {
    return res.status(500).send({ message: err.message || "Some error occurred while creating the category" })
  })
}

exports.search = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() })
  }
  var perPage = appConfig.pagination.perPage, page = Math.max(0, req.query.page)
  const searchRegex = new RegExp(req.params.searchText, "i")
  const query = { title: searchRegex, user: req.userData._id }
  const options = { sort: { createdAt: -1 }, limit: 10 }
  
  try {
    await Category.find(query, {}, options).limit(perPage).skip(perPage * page).exec(function(err, categories) {
      Category.countDocuments({user: req.userData._id}).exec(function(err, count) {
        return res.status(200).send({categories: categories, currentPage: page, totalPages: Math.floor(count / perPage)})
      })
    })
  } catch( error ) {
    return res.status(400).send({ error: error })
  }

}

exports.show = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() })
  }
  Category.findOne({_id: id, user: req.userData._id}).populate('user').then(category => {
    if (!category) {
      return res.status(404).send({ message: 'Category not found' })
    }
    res.send(category)
  }).catch(err => {
    return res.status(500).send({ message: err.message || 'Error retrieving category with id ' + id })
  })
}

exports.update = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(422).send({ errors: errors.array() })
  }
  Category.findOneAndUpdate({_id: id, user: req.userData._id}, req.body, {new: true}).then(category => {
    if (category) {
      return res.send(category)  
    } else {
      return res.status(404).send({ message: 'Category not found with id ' + id })
    }
  }).catch(err => {
    return res.status(500).send({ message: err.message || 'Error updating category with id ' + id })
  })
}

exports.destroy = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() })
  }
  Category.findOneAndRemove({_id: id, user: req.userData._id}).then(category => {
    if (!category) {
      return res.status(404).send({ message: 'Category not found with id ' + id })
    }
    res.status(200).send({ message: 'Category removed successfully' })
  }).catch(err => {
    return res.status(500).send({ message: err.message || 'Could not delete category with id ' + id })
  })
}