let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')


// GET -- Favorites button on nav to view favorites
router.post('/favorites/:id', (req, res) => {
    axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`)
    .then(resFav => {
        const meals = resFav.data.meals
        JSON.stringify(meals)
        console.log(resFav.data.meals[0].strMeal)
        // db.recipe.create({
        //     name: 
        // })
    })
    res.render('users/index.ejs')
})

// post to grab hidden form to add favorites (button on recipes id page) -- redirect to favorites page

// DELETE to remove recipe from favorties















module.exports = router