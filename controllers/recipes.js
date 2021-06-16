const axios = require('axios')
let express = require('express')
let db = require('../models')
let router = express.Router()



// will display the top recipes
router.get('/results', (req, res) => {
    axios.get(`http://www.themealdb.com/api/json/v1/1/search.php?s=`)
    .then(resName => {
        const meals = resName.data.meals
        JSON.stringify(meals)
        res.render('recipes/results.ejs', {meals})
    })
})



// post to grab form for ingredient search 
router.get('/ingredient', (req, res) => {
    let ingredient = req.query.ingredient
    axios.get(`http://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(resName => {
        const meals = resName.data.meals
        JSON.stringify(meals)
        res.render('recipes/ingredient.ejs', {meals, ingredient})
    })
})


// route will render recipe instructions
router.get('/:id', (req, res) => {
    axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`)
    .then(resId => {
       const meals = resId.data.meals
      JSON.stringify(meals)
      let items = []
        meals.forEach(meal => {
        items = loop(meal) 
      }) 
      res.render('recipes/details.ejs', {meals:meals, items:items, recipeId: req.params.id})
    })
})


// function to retrieve measurements and food item needed
function loop(arr) {
    let ingre = []
    let meas = []
    let finalRecipe = []
    let arrValues = Object.entries(arr)
    arrValues.forEach((val) => {
        if(val[0].includes('Ingre') &&  val[1] !== "" && val[1]!= null) {
            ingre.push(val)
        } else if(val[0].includes('Meas') && val[1] !== "" && val[1]!= null) {
            meas.push(val)
            }
        })
    for (let i = 0; i < ingre.length; i++ ){
        let ingreMeas= [meas[i][1], ingre[i][1]]
        finalRecipe.push(ingreMeas)
        }
    return finalRecipe
}












module.exports = router