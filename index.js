// required packages
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
let db = require('./models')
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')
const bcrypt = require('bcrypt')


// config app
const app = express();
const PORT = process.env.PORT || 5000;

// use and set
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(methodOverride('_method'))
rowdy.begin(app)


// attaching controllers
app.use('/recipes', require('./controllers/recipes'))
app.use('/users', require('./controllers/users'))



app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/', (req,res) => {
const passwordHash = bcrypt.hashSync(req.body.password,10)
    db.user.findOne({
        where: {
            email: req.body.email,
            password: passwordHash
        }
    }) .then(user => {
        if(user) {
            res.redirect('/recipes')
        } else {
            res.render('home', {errorMessage: 'This Email does not exist. Create an account to login'})
        }
    }) .catch(error => {
        console.log(error)
    })
})
    

app.post('/register', (req, res) => {
    const passwordHash = bcrypt.hashSync(req.body.password,10)
    db.user.create({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: passwordHash
    }) .then(user => {
        console.log(user.get())
        res.redirect('/')
    }) .catch(error => {
        res.render('register', {errorMessage: 'This email already exists. Try again with a different email'})
    })
    // redirect to /login page
    
})

app.listen(PORT, () => {
    console.log(`you are listening on port ${PORT} 👨‍🍳`)
})