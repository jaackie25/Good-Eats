// required packages
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
let db = require('./models')
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')

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

app.get('/new', (req, res) => {
    res.render('new')
})

app.post('/', (req,res) => {
    db.user.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }) .then(user => {
        res.redirect('/recipes')
    }) .catch(error => {
        console.log(error)
    })

    // redirect to /recipes
})


app.post('/recipes', (req, res) => {
    const fName= req.body.fName
    const lName= req.body.lName
    const email = req.body.email
    const password = req.body.password
    // db.create.user
    db.user.create({
        fName: fName,
        lName: lName,
        email: email,
        password: password
    }) .then(user => {
        console.log(comment.get())
        res.redirect('/recipes')
    })
    // redirect to /recipes
    
})

app.listen(PORT, () => {
    console.log(`you are listening on port ${PORT} 👨‍🍳`)
})