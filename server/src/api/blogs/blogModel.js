const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'Blog user is required'] 
  },
  
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: [true, 'Blog category is required'] 
  },

  title: { 
    type: String, 
    required: [true, 'Blog title is required'] 
  },

  description: { 
    type: String, 
    required: [true, 'Blog description is required'] 
  },
  
  content: { 
    type: String, 
    required: [true, 'Blog content is required'] 
  },
  
  likes_count: { 
    type: Number, 
    default: 0 
  },
  
  comments_count: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
})

blogSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'refId',
  match: (doc) => {
    return {refModel: 'Blog'};
  }
});

blogSchema.set('toObject', { virtuals: true });
blogSchema.set('toJSON', { virtuals: true });

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog