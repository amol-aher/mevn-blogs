const Category = require('./categoryModel')
const { validationResult } = require('express-validator');

exports.index = async (req, res) => {
  try {
    const categories = await Category.find({user: req.userData._id}).sort({createdAt: -1})
    res.send(categories)
  } catch( error ) {
    res.status(400).json({ error: error })
  }
}

exports.create = async (req, res) => {
  req.body.user = req.userData._id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const category = new Category(req.body)
  category.save().then(data => {
    return res.status(201).send(data)
  }).catch(err => {
    return res.status(500).send({ message: err.message || "Some error occurred while creating the category." })
  }) 
}

exports.search = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const searchRegex = new RegExp(req.params.searchText, "i")
  const query = { title: searchRegex, user: req.userData._id }
  const options = { sort: { createdAt: -1 }, limit: 10 }
  Category.find(query, {}, options).exec(function(err, categories) { 
    if (err) {
      return res.status(404).send({ message: 'Categories not found' })
    }
    res.send(categories);
  });
}

exports.show = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  Category.findOne({_id: id, user: req.userData._id})
  .then(category => {
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
    return res.status(422).json({ errors: errors.array() })
  }
  Category.findOneAndUpdate({_id: id, user: req.userData._id}, req.body, {new: true}).then(category => {
    if (!category) {
      return res.status(404).send({ message: 'Category not found with id ' + id })
    }
    res.send(category)
  }).catch(err => {
    return res.status(500).send({ message: err.message || 'Error updating category with id ' + id })
  })
}

exports.destroy = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
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