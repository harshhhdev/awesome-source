require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const Article = require('./models/article')
require('./passport-config')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/views/styling'))
app.use(express.static(__dirname + '/views/articles/style'))
app.use(express.static(__dirname + '/views/scripts'))
app.use(express.static(__dirname + '/views/scripts'))
app.use(express.static(__dirname + '/views/scripts'))
app.use(express.static(__dirname + '/views/images'))
app.use(express.static(__dirname + '/views/articles/style/icons'))

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}, () => console.log('Connected to Database.'))
  
app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))

app.set('view engine','ejs')

const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.redirect('/login')
  }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', isLoggedIn, async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('index', { articles: articles, name: req.user.displayName, pic: req.user.photos[0].value, email: req.user.emails[0].value })
})

app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// Auth Routes
app.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.session = null
  req.logout()
  res.redirect('/login')
})
  
app.set('view-engine', 'ejs')

app.get('/account', isLoggedIn, async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render("account.ejs",{ article: articles, name: req.user.displayName, pic:req.user.photos[0].value, email: req.user.emails[0].value })
})
  

app.get('/login', (req, res) => {
    res.render('login.ejs')
})
  
app.set('view engine', 'ejs')

app.get('/new', isLoggedIn, (req, res) => {
  res.render('articles/new', { article: new Article(), name: req.user.displayName, pic: req.user.photos[0].value })
})

app.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

app.post('/', isLoggedIn, async (req, res, next) => {
  console.log('Posting...')
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

app.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    console.log('Working...')

    let article = req.article

    article.title = req.body.title
    article.description = req.body.description
    article.link = req.body.link
    article.markdown = req.body.markdown
    article.username = req.user.displayName
    article.pic = req.user.photos[0].value
    article.reactions = 0
    
    try {
      console.log('Saving...')
      article = await article.save()
      res.redirect(`/${article.slug}`)
      console.log('Done!')
    } catch (e) {
      console.log(e)
      res.render(`/${path}`, { article: article })
      console.log('Fail!')
    }
  }
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on ${port}!`))