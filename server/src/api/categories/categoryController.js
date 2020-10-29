const Category = require('./categoryModel')
const appConfig = require('../../../config/appConfig')
const { validationResult } = require('express-validator');

exports.index = async (req, res) => {
  let reqData = queryOptions(req)
  try {
    await Category.find(reqData.query, {}, reqData.options).exec(function(err, categories) {
      Category.countDocuments(reqData.query).exec(function(err, count) {
        res.status(200).send({list: categories, totalPages: Math.ceil(count / reqData.options.limit), totalEntries: count})
      })
    })
  } catch( error ) {
    res.status(400).send({ error: error })
  }
}

exports.allCategories = async (req, res) => {
  try {
    await Category.find({ user: req.userData._id }).exec(function(err, categories) {
      res.status(200).send({list: categories})
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
    return res.status(500).send({ errors: { msg: err.message || "Some error occurred while creating the category" }  })
  })
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

function queryOptions(req) {
  var queryParams = {}

  if ( req.query.reqParams ) {
    queryParams = JSON.parse(req.query.reqParams)
  }
  
  const query = {
    ...( { user: req.userData._id } ),
    ...( queryParams.search ?
      { title: new RegExp(queryParams.search, "i") } : {  }
    )
  }

  const options = {
    ...( queryParams.sorting ? 
      { sort: { [queryParams.sorting.sortKey]: queryParams.sorting.sortOrder } } : 
      { sort: { createdAt: -1 } } 
    ),
    ...( queryParams.limit ? 
      { limit: parseInt(queryParams.limit) } : 
      { limit: appConfig.pagination.perPage } 
    ),
    ...( (queryParams.limit && queryParams.pagination) ? 
      { skip: (queryParams.limit * queryParams.pagination.currentPage) - queryParams.limit } : 
      { skip: (appConfig.pagination.perPage * queryParams.pagination.currentPage) - appConfig.pagination.perPage } 
    )
  }

  return { query: query, options: options }
}