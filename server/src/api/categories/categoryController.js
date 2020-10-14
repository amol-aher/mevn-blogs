const Category = require('./categoryModel')

var categoryData = {}

exports.index = async (req, res) => {
  try {
    const categories = await Category.find({user: req.userData._id}).sort({createdAt: -1})
    res.send(categories)
  } catch( error ) {
    res.status(400).json({ error: error })
  }
}

exports.create = async (req, res) => {
  const category = new Category({
    user:             req.userData._id,
    title:            req.body.title,
    description:      req.body.description,
    show_on_website:  req.body.show_on_website,
  })
  category.save().then(data => {
    res.status(201).send(data)
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while creating the category." })
  }) 
}

exports.search = (req, res) => {
  const searchRegex = new RegExp(req.params.searchText, "i")
  const query = { title: searchRegex, user: req.userData._id }
  const options = { sort: { createdAt: -1 }, limit: 10 }
  Category.find(query, {}, options).exec(function(err, categories) { 
    if (err) {
      return res.status(404).send({ message: 'Categories not found' })
    }
    res.send(categories);
  });
}

exports.show = async (req, res) => {
  const id = req.params.id
  Category.findOne({_id: id, user: req.userData._id})
  .then(category => {
    if (!category) {
      return res.status(404).send({ message: 'Category not found' })
    }
    res.send(category)
  }).catch(err => {
    if (err.kind == 'ObjectId') {
      return res.status(404).send({ message: err.message || 'Category not found with id ' + id })
    }
    return res.status(500).send({ message: err.message || 'Error retrieving category with id ' + id })
  })
}

exports.update = async (req, res) => {
  const id = req.params.id
  Category.findOneAndUpdate({_id: id, user: req.userData._id}, {
    title:            req.body.title,
    description:      req.body.description,
    show_on_website:  req.body.show_on_website,
  }, {new: true}).then(category => {
    if (!category) {
      return res.status(404).send({ message: 'Category not found with id ' + id })
    }
    res.send(category)
  }).catch(err => {
    if (err.kind == 'ObjectId') {
      return res.status(404).send({ message: err.message || 'Category not found with id ' + id })
    }
    return res.status(500).send({ message: err.message || 'Error updating category with id ' + id })
  })
}

exports.destroy = async (req, res) => {
  const id = req.params.id
  Category.findByIdAndRemove(id).then(category => {
    if (!category) {
      return res.status(404).send({ message: 'Category not found with id ' + id })
    }
    res.send({ message: 'Category removed successfully' })
  }).catch(err => {
    if (err.kind == 'ObjectId' || err.name === 'NotFound' ) {
      return res.status(404).send({ message: err.message || 'Category not found with id ' + id })
    }
    return res.status(500).send({ message: err.message || 'Could not delete category with id ' + id })
  })
}