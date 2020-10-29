const Blog = require('./blogModel')
const appConfig = require('../../../config/appConfig')
const {validationResult } = require('express-validator');

exports.index = async (req, res) => {
  let reqData = queryOptions(req)
  try {
    await Blog.find(reqData.query, {}, reqData.options).exec(function(err, blogs) {
      Blog.countDocuments(reqData.query).exec(function(err, count) {
        res.status(200).send({list: blogs, totalPages: Math.ceil(count / reqData.options.limit), totalEntries: count})
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
  const blog = new Blog(req.body)
  blog.save().then(data => {
    return res.status(201).send(data)
  }).catch(err => {
    return res.status(500).send({ errors: { msg: err.message || "Some error occurred while creating the blog" }  })
  })
}

exports.update = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(422).send({ errors: errors.array() })
  }
  Blog.findOneAndUpdate({_id: id, user: req.userData._id}, req.body, {new: true}).then(blog => {
    if (blog) {
      return res.send(blog)  
    } else {
      return res.status(404).send({ errors: [ { msg: 'Blog not found with id ' + id } ] })
    }
  }).catch(err => {
    return res.status(500).send({ errors: [ { msg: err.message || 'Error updating blog with id ' + id } ] })
  })
}

exports.show = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() })
  }
  Blog.findOne({_id: id, user: req.userData._id}).populate('user').then(blog => {
    if (!blog) {
      return res.status(404).send({ message: 'Blog not found' })
    }
    res.send(blog)
  }).catch(err => {
    return res.status(500).send({ message: err.message || 'Error retrieving blog with id ' + id })
  })
}

exports.destroy = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() })
  }
  Blog.findOneAndRemove({_id: id, user: req.userData._id}).then(blog => {
    if (!blog) {
      return res.status(404).send({ message: 'Blog not found with id ' + id })
    }
    res.status(200).send({ message: 'Blog removed successfully' })
  }).catch(err => {
    return res.status(500).send({ message: err.message || 'Could not delete blog with id ' + id })
  })
}

function queryOptions(req) {
  let queryParams = JSON.parse(req.query.reqParams)
  
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
    ...( queryParams.limit ? 
      { skip: (queryParams.limit * queryParams.pagination.currentPage) - queryParams.limit } : 
      { skip: (appConfig.pagination.perPage * queryParams.pagination.currentPage) - appConfig.pagination.perPage } 
    )
  }

  return { query: query, options: options }
}