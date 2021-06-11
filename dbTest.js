const db = require('./models')

// db.recipe.create({
//     name: 'Mac & Cheese',
//     userId: 1
// })
//     .then(recipe => {
//         console.log(recipe.get())
//     })

// db.user.create({
//   fName: "Jackie",
//   lName: "Test",
//   email: "test@gmail.com",
//   password: "testing"
// })
//   .then(user => {
//     console.log(user.get())
//   })

db.user.findOne({
    where: { id: 1 },
    include: [db.recipe]
  }).then(user => {
    console.log(user.recipes)
  })