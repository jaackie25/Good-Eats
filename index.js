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


app.post('/', async (req, res) => {
    const email= req.body.email
    const password= req.body.password
    const user = await  db.user.findOne({
        where: {email: email}
         })
    const validLogin = await bcrypt.compare(password, user.password)  
    if(validLogin){
        let currentUser = req.body.email
        res.render('recipes/index', {email:currentUser})
    } else {
        res.render('home', {errorMessage: 'This Email does not exist. Create an account to login'})
    }
})

app.post('/register', async (req, res) =>{
    const password = req.body.password
    const email= req.body.email
    const hash= await bcrypt.hash(password, 10)
    const user =  db.user.create({
                fName: req.body.fName,
                lName: req.body.lName,
                email: email,
                password: hash
            }) 
      res.redirect('/')    
})
    
app.get('/logout', (req, res) => {
    res.render('home', {logout: true})
})

app.listen(PORT, () => {
    console.log(`you are listening on port ${PORT} 👨‍🍳`)
})


app.get('/checking/branch')