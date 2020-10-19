const Blog = require('./blogModel')
const appConfig = require('../../../config/appConfig')
const {validationResult } = require('express-validator');

exports.index = async (req, res) => {
  var perPage = appConfig.pagination.perPage, page = Math.max(0, req.query.page)
  try {
    await Blog.find({user: req.userData._id}).sort({createdAt: -1}).populate({
      path: 'category',
      select: '_id title show_on_website createdAt updatedAt',
      model:'Category'
    }).populate('comments').limit(perPage).skip(perPage * page).exec(function(err, blogs) {
      Blog.countDocuments({user: req.userData._id}).exec(function(err, count) {
        res.status(200).send({blogs: blogs, currentPage: page, totalPages: Math.floor(count / perPage)})
      })
    })
  } catch( error ) {
    res.status(400).send({ error: error.message })
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
    return res.status(500).send({ message: err.message || "Some error occurred while creating the blog." })
  })
}

exports.search = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  var perPage = appConfig.pagination.perPage, page = Math.max(0, req.query.page)
  const searchRegex = new RegExp(req.params.searchText, "i")
  const query = { title: searchRegex, user: req.userData._id }
  const options = { sort: { createdAt: -1 }, limit: 10 }
  
  try {
    await Blog.find(query, {}, options).limit(perPage).skip(perPage * page).exec(function(err, blogs) {
      Blog.countDocuments(query).exec(function(err, count) {
        return res.status(200).send({blogs: blogs, currentPage: page, totalPages: Math.floor(count / perPage)})
      })
    })
  } catch( error ) {
    return res.status(400).send({ error: error })
  }

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
      return res.status(404).send({ message: 'Blog not found with id ' + id })
    }
  }).catch(err => {
    return res.status(500).send({ message: err.message || 'Error updating blog with id ' + id })
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