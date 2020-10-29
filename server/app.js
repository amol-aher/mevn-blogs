require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8081
const cors = require('cors')
const morgan = require('morgan')
const mongoose =  require('mongoose')
const config = require('./config/db')
const app = express()

mongoose.set('useCreateIndex', true)
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
  console.log('DB Connected')
}).catch(error => {
  console.log({database_error: error})
})

var corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200
}

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors(corsOptions))

const userRouter = require('./src/api/users/userRoute')
app.use('/users', userRouter)

const categoryRouter = require('./src/api/categories/categoryRoute')
app.use('/categories', categoryRouter)

const blogRouter = require('./src/api/blogs/blogRoute')
app.use('/blogs', blogRouter)

const commentRouter = require('./src/api/comments/commentRoute')
app.use('/comments', commentRouter)

const guestRouter = require('./src/api/guest/guestRoute')
app.use('/guest', guestRouter)

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
})