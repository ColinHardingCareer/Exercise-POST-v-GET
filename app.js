const express = require('express')
const app = express()
const port = 3000

// Use the session middleware
const session = require('express-session')
app.use(session({ secret: 'keyboard cat', 
                  cookie: { maxAge: 60000 },
                  saveUninitialized: false,
                  resave: false}))

// Use the urlencoded (body-parser) middleware
app.use(express.urlencoded())

// Process GET requests to / by returning a count of the visits during the
// current session or a welcome message if this is the first visit.
// Access the session as req.session
app.get('/', function(req, res, next) {
  if (!req.session.views) {
    req.session.views = 1
    res.send('welcome to the session demo. refresh!')
  } else {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write(`<p>views:  ${req.session.views}</p>`)
    res.write(`<p>expires in:  ${req.session.cookie.maxAge / 1000}s</p>`)
    res.end()
  }
})

// Process GET requests to /test by extracting username from the query string
// in the request URI and saying hello
app.get('/test', (req, res) => {
    res.send(`hello ${req.query.username}!`)
})

// Process POST requests to /test by extracting username from the query string
// in the body of the request and saying hello
app.post('/test', (req, res) => {
    res.send(`hello ${req.body.username}!`)
})

// Middleware installed. Start the server.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
