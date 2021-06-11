const { default: axios } = require('axios')
let express = require('express')
let db = require('../models')
let router = express.Router()



// page after login will have form to search by recipe and ingredient
router.get('/', (req, res) => {
    res.render('recipes/index.ejs')
})

// post to grab form for recipe name search 
router.get('/results', (req, res) => {
    let query = req.query.name
    // console.log(query)
    axios.get(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(resName => {
        const meals = resName.data.meals
        JSON.stringify(meals)
// filtering object array
        let items = []
        meals.forEach(meal => {
        items = loop(meal) 
      }) 
        res.render('recipes/results.ejs', {meals:meals, items:items})
    })
})

// post to grab form for ingredient search 
router.get('/results', (req, res) => {
    
})
// GET view details recipe -- add a favorites button option



function loop(arr) {
    // console.log(arr)
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
        let ingreMeas= [ingre[i][1], meas[i][1]]
        finalRecipe.push(ingreMeas)
    }
    // console.log(finalRecipe)
    return finalRecipe
}












module.exports = router