let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')


async function getImageSrcs (recipeIds) {
    const images = []
    for (let i = 0; i < recipeIds.length; i++) {
        const image = await axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeIds[i]}`)
        const src = image.data.meals[0].strMealThumb
        images.push(src)
    }
    return images 
}  
router.get('/favorites/:email', async (req, res) => {
    const user = await db.user.findOne({
        where: {email: req.params.email},
        include:[db.recipe]
    }) 
    const recipes = user.dataValues.recipes
    const recipeIds= []
    recipes.forEach(recipe => {
       recipeIds.push(recipe.dataValues.recipeId) 
    })
    const imageSrc = await getImageSrcs(recipeIds)
    const results = []
    for(let i =0; i<recipes.length; i++) {
        const result = {
            recipe: recipes[i],
            image: imageSrc[i]
        }
        results.push(result)
    }
        res.render('users/favorites', {results})
})


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
        }).then (user => {
            console.log(user, "🚲🚛🛹🛵🚈🚈")
            db.recipe.create({
                name: req.body.recipe,
                userId: user.dataValues.id,
                recipeId: req.body.mealId,
            })
        }) 
        res.render('users/index.ejs', {meals})
    })
})



// DELETE to remove recipe from favorties



// router.get('/favorites/:email', (req, res) => {
//     axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
//     .then(response => {
//         const meals = response.data.meals
//         JSON.stringify(meals)
//         db.user.findOne({
//             where: {email: req.params.email},
//             include: [db.recipe]
//         })
//         res.render('users/favorites.ejs', {user}) 
//     })   
//   })






module.exports = router