const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)  
const cors = require('cors')
const { MONGO_URI, SESSION_SECRET } = require('./config')

const authRoutes = require('./routes/authRoutes')
const repoRoutes = require('./routes/repoRoutes')

const app = express()
const sessionStore = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions'
})

app.use(cors({
  origin: 'http://localhost',
  credentials: true,
}))
app.use(express.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true
  }
}))

app.use('/api/auth', authRoutes)
app.use('/api/repos', repoRoutes)

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(5000, '0.0.0.0', () => console.log('Server running on port 5000'))
  })
  .catch(err => console.log(err))
