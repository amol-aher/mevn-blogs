const Category = require('../categories/categoryModel')
const appConfig = require('../../../config/appConfig')

exports.allCategories = async (req, res) => {
  try {
    await Category.find().exec(function(err, categories) {
      res.status(200).send({list: categories})
    })
  } catch( error ) {
    return res.status(500).send({ errors: { msg: error.message || "Some error occurred while fetching categories" }  })
  }
}
