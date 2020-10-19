const Comment = require('./commentModel')
const appConfig = require('../../../config/appConfig')
const { validationResult } = require('express-validator');

exports.index = async (req, res) => {
  var perPage = appConfig.pagination.perPage, page = Math.max(0, req.query.page)
  try {
    await Comment.find({user: req.userData._id}).sort({createdAt: -1}).limit(perPage).skip(perPage * page).exec(function(err, categories) {
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
  req.body.refModel = req.params.refModel.trim().replace(/^\w/, (c) => c.toUpperCase())
  req.body.refId = req.params.refId
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() })
  }
  const comment = new Comment(req.body)
  comment.save().then(data => {
    return res.status(201).send(data)
  }).catch(err => {
    return res.status(500).send({ message: err.message || "Some error occurred while creating the comment" })
  })
}

exports.destroy = async (req, res) => {
  const id = req.params.id
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() })
  }
  Comment.findOneAndRemove({_id: id, user: req.userData._id}).then(comment => {
    if (!comment) {
      return res.status(404).send({ message: 'Comment not found with id ' + id })
    }
    res.status(200).send({ message: 'Comment removed successfully' })
  }).catch(err => {
    return res.status(500).send({ message: err.message || 'Could not delete comment with id ' + id })
  })
}
