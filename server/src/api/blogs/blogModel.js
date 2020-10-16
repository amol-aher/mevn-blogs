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

blogSchema.pre('save', async function() {
  console.log('Pre savce')
});

blogSchema.post('save', async function(blog) {
  console.log('called')
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog