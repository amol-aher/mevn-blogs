const Blog = require('./blogModel')

const {validationResult } = require('express-validator');

exports.index = async (req, res) => {
  try {
    const blogs = await Blog.find({user: req.userData._id}).sort({createdAt: -1})
    res.send(blogs)
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
  const blog = new Blog(req.body)
  blog.save().then(data => {
    return res.status(201).send(data)
  }).catch(err => {
    return res.status(500).send({ message: err.message || "Some error occurred while creating the blog." })
  })
}

exports.update = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
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