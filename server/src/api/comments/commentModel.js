const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Comment user is required'] 
  },

  body: {
    type: String,
    required: [true, 'Comment body is required'] 
  },

  refId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Association required'],
    refPath: 'refModel'
  },

  refModel: {
    type: String,
    required: true,
    enum: ['Blog', 'Article']
  }
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment