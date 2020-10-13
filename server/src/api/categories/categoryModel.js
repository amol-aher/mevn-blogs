const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Category user is required'] 
  },
  
  title: { 
    type: String, 
    required: [true, 'Category title is required'] 
  },
  
  description: { 
    type: String, 
    default: '' 
  },
  
  show_on_website: { 
    type: Boolean, 
    default: true 
  },
  
  blogs: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Blog' 
    }
  ]
  
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category