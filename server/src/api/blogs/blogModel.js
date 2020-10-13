const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Blog category is required'] },
  title: { type: String, required: [true, 'Blog title is required'] },
  content: { type: String, required: [true, 'Blog content is required'] },
  likes_count: { type: Integer, default: 0 },
  comments_count: { type: Integer, default: 0 },
  timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog