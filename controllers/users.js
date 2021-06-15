let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')


// async function getImageSrcs (recipeIds) {
//     const images = []
//     for (let i = 0; i < recipeIds.length; i++) {
//         const image = await axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeIds[i]}`)
//         const src = image.data.meals[0].strMealThumb
//         images.push(src)
//     }
//     return images 
// }  
router.get('/favorites/:email', (req, res) => {
    // console.log(req.params, "🚜🚙🚙🚚")
    // console.log(req.params)
    db.user.findOne({
        where: {email: req.params.email},
        include:[db.recipe]
    }) .then(foundUser => {
        // console.log(user, "🛺🚚🚜🛹🚅")
        res.render('users/favorites.ejs', {foundUser})
    }) .catch (error => {
        console.log(error)
    })

})
    // const user = await db.user.findOne({
    //     where: {email: req.params.email},
    //     include:[db.recipe]
    // }) 
    // const recipes = user.dataValues.recipes
    // const recipeIds= []
    // recipes.forEach(recipe => {
    //    recipeIds.push(recipe.dataValues.recipeId) 
    // })
    // const imageSrc = await getImageSrcs(recipeIds)
    // const results = []
    // for(let i =0; i<recipes.length; i++) {
    //     const result = {
    //         recipe: recipes[i],
    //         image: imageSrc[i]
    //     }
    //     results.push(result)
    // }
    //     res.render('users/favorites', {results})



router.post('/favorites/:id', (req, res) => {
//    console.log(req.body)
//     console.log(req.params)
    axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`)
    .then(resFav => {
        const meals = resFav.data.meals
        JSON.stringify(meals)
        db.user.findOne({
            where: {
                email: req.body.email
            }
        }).then (user => {
        //    console.log(user)
            db.recipe.create({
                name: req.body.recipe,
                userId: user.dataValues.id,
                recipeId: req.body.mealId,
            })
        }) 
        res.render('users/index.ejs', {meals})
        // res.send("testing again")
    })
})



// DELETE to remove recipe from favorties

router.delete('/favorites/:id', (req, res) => {
    // console.log(req.params, "CONSOLE")
    // console.log(id, "ID CONSOLE")

    const email= req.body.email
    console.log(req.body, "REQ BODY")
    console.log(req.body, "BODY CONSOLE")
    console.log(req.params.id, "PARAMS ID")
    db.user.findOne({
        where: {email:req.body.email}
    }).then(user => {
        console.log(user, "USER CONSOLE")
        db.recipe.destroy({
            where:{recipeId: req.params.id}
        }).then(response => {
            res.send("got to the delete portion")
            // res.redirect("")
        })
    })
    // res.send("got to the delete portion")
    // res.redirect(`/users/favorites/${id}`)
    // res.render('users/favorites.ejs', {recipeId: id})
})


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



// favorite ejs image render solution

// <% results.forEach(result => { %>
//     <p> <%=result.recipe.name%> </p>
//     <img src="<%=result.image %>" alt="">
//     <a href="/recipes/<%=result.recipe.recipeId %>">Click here to view details</a>