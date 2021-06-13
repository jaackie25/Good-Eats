let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')


// GET -- Favorites button on nav to view favorites
router.post('/favorites/:id', (req, res) => {
   console.log(req.body)
    console.log(req.params)
    axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`)
    .then(resFav => {
        const meals = resFav.data.meals
        JSON.stringify(meals)
        db.user.findOne({
            where: {
                email: req.body.useremail
            }
        }). then (user => {
            db.recipe.create({
                name: req.body.recipe,
                userId: user.dataValues.id
            })
            console.log(user.dataValues.id)
        })
        // db.recipe.create({
        //     name: 
        // })
        res.render('users/index.ejs', {meals})
    })
   
})

// post to grab hidden form to add favorites (button on recipes id page) -- redirect to favorites page

// DELETE to remove recipe from favorties















module.exports = router