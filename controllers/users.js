let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))



router.get('/favorites/:email', (req, res) => {
    const email = req.params.email
    db.user.findOne({
        where: {email: req.params.email},
        include:[db.recipe]
    }) .then(foundUser => {
        res.render('users/favorites.ejs', {foundUser:foundUser})
    }) .catch (error => {
        console.log(error)
    })
})

// router.get('/favorites/email/:email', (req, res) => {
//     const email = req.params.email
//     db.user.findOne({
//         where: {email: req.params.email},
//         include:[db.recipe]
//     }) .then(foundUser => {
//         res.render('users/favorites.ejs', {foundUser:foundUser})
//     }) .catch (error => {
//         console.log(error)
//     })
// })




router.post('/favorites/:id', (req, res) => {
    console.log("🚛🛹🚚🚚🛹🛹🛹")
   console.log(req.body, "REQ BODY")
    console.log(req.params, "REQ PARAMS")
    const email= req.body.email
    console.log(email, "EMAIL CHECK")
    axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`)
    .then(resFav => {
        const meals = resFav.data.meals
        JSON.stringify(meals)
        db.user.findOne({
            where: {
                email: req.body.email
            }
        }).then (user => {
           console.log(user, "USER CONSOLE CHECK")
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

router.delete('/favorites/:id', (req, res) => {
    db.user.findOne({
        where: {email:req.body.email}
    }).then(user => {
        // console.log(user, "USER CONSOLE")
        db.recipe.destroy({
            where:{recipeId: req.params.id}
        }).then(response => {
            // res.send("got to the delete portion")
            res.redirect('/')
            // res.redirect('/recipes')
        })
    })
    // res.send("got to the delete portion")
    // res.redirect(`/users/favorites/${id}`)
    // res.render('users/favorites.ejs', {recipeId: id})
})








module.exports = router



// favorite ejs image render solution

// <% results.forEach(result => { %>
//     <p> <%=result.recipe.name%> </p>
//     <img src="<%=result.image %>" alt="">
//     <a href="/recipes/<%=result.recipe.recipeId %>">Click here to view details</a>