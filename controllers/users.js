let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))



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

router.get('/favorites/email/:email', (req, res) => {
    db.user.findOne({
        where: {email: req.params.email},
        include:[db.recipe]
    }) .then(foundUser => {
        res.render('users/favorites.ejs', {foundUser})
    }) .catch (error => {
        console.log(error)
    })
})


// router.post('/favorites/email/:email', (req, res) => {
//     db.user.findOne({
//         where: {email: req.params.email},
//         include:[db.recipe]
//     }) .then(foundUser => {
//         res.render('users/favorites.ejs', {foundUser})
//     }) .catch (error => {
//         console.log(error)
//     })
// })




router.post('/favorites/:id', (req, res) => {
    console.log("🚛🛹🚚🚚🛹🛹🛹")
   console.log(req.body)
    console.log(req.params)
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
    const email= req.body.email
    // console.log(req.body, "REQ BODY")
    console.log(req.body, "BODY CONSOLE")
    console.log(req.params.id, "PARAMS ID")
    db.user.findOne({
        where: {email:req.body.email}
    }).then(user => {
        console.log(user, "USER CONSOLE")
        db.recipe.destroy({
            where:{recipeId: req.params.id}
        }).then(response => {
            // res.send("got to the delete portion")
            res.redirect(`/users/favorites/email/${email}`)
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