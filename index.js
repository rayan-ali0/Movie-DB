const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_DB;
const movieController = require('./controllers/movieController');

mongoose.connect(mongoDB)
    .then(() => {
        app.listen(port, () => {
            console.log(`connected & listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    }

    )

const users = [
    { username: 'John', password: '1234' },
    { username: 'Jane', password: '5678' },
    { username: 'Dohm', password: '9101' }

];



app.get('/', (req, res) => {
    res.send("OK!")
})
var dateTime = new Date();

app.get('/test', (req, res) => {
    res.json({ status: 200, message: "ok" })
})
app.get('/time', (req, res) => {
    currentTime = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
    res.json({ status: 200, message: currentTime })
})

app.get(`/hello/:Id?`, (req, res) => {
    let id = req.params.Id;
    id ? res.send(`Hello ${id}`) : res.send("Hello")
})
app.get(`/search`, (req, res) => {
    let search = req.query.s;// I put .s in order to take just the variable s in the url if I used req.query it will take all variable in the url and put them in an object
    search ? res.json({ status: 200, message: "ok", data: search }) :
        res.status(500).json({ status: 500, error: true, message: "you have to provide a search" })
})


app.get("/users/get", (req, res) => {
    let userName = req.query.name;
    if (userName) {
        let user = users.find((user) => user.username === userName)
        res.json(user)
    }
    res.json(users)
}
)

app.get("/users/get/order", (req, res) => {
    res.json({ status: 200, data: users.sort((user1, user2) => user1.username.localeCompare(user2.username)) })
}
)
app.post("/users/add",(req,res)=>{
    let {username,password}=req.query;
    const newUser = { username:username, password:password}
     users.push(newUser);
    res.json(newUser);
})
app.delete("/users/delete/:username",(req,res)=>{
    let userName = req.params.username;
     const index=users.findIndex((user)=>user.username===userName)
    if(index===-1){
        res.json({error:"user not found"});
    }
    else{
        users.splice(index,1)
        res.json(users);
    }
})

function isAuthenticated(req,res,next){
    const auth=req.headers.authorization
    const index=users.findIndex((user)=>user.username===auth && user.password===auth)
if(index!==-1){
next();
}
else{
    res.status(401).Json({error:"Access Forbidden"})
}
}


app.get('/movies/get', movieController.get)

app.get(`/movies/get/:order`, movieController.getByOrder)

app.get(`/movies/get/id/:ID`, movieController.getById)

app.post("/movies/add",isAuthenticated, movieController.add);

app.delete('/movies/delete/:ID',isAuthenticated, movieController.deleteById)

app.put("/movies/edit/:ID",isAuthenticated, movieController.editById)



// const movies = [
//     { title: 'Jaws', year: 1975, rating: 8 },
//     { title: 'Avatar', year: 2009, rating: 7.8 },
//     { title: 'Brazil', year: 1985, rating: 8 },
//     { title: 'الإرهاب و الكباب ', year: 1992, rating: 6.2 }
// ]

// app.get(`/movies/:cmd?/:order?`, (req, res) => {
//     let cmd = req.params.cmd;
//     cmd ? /*  */
//         cmd === "add" ?
//             res.send(`Add a new Movie`) :
//             cmd === "edit" ?
//                 res.send(`Update a movie`) :
//                 cmd === "delete" ?
//                     res.send(`Delete a movie`) :
//                     cmd === "get" ?
//                     !req.params.order ?   
//                          res.json({ status: 200, data: movies }) :
//                           req.params.order === "by-date" ?
//                              res.json({ status: 200, data: movies.sort((movie1, movie2) => movie1.year - movie2.year) }) :
//                              req.params.order === "by-rating" ?
//                                        res.json({ status: 200, data: movies.sort((movie1, movie2) => movie1.rating - movie2.rating) }):
//                                        req.params.order === "by-title" ?
//                                      res.json({ status: 200, data: movies.sort((movie1, movie2) => movie1.title.localeCompare(movie2.title)) } ):
//                                      res.send("choose another order") :

//                   res.send(`please insert a valid command`) : 
//                   res.send(`Error`) 

// })


// app.post(`/movies/add`, async (req, res) => {
//     let { title, year, rating } = req.query;
//     try {
//         const newMovie = await movieModel.create({ title, year, rating });
//         res.status(200).json(newMovie);
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
//     // if (!title || !year || year.length !== 4 || isNaN(year)) {
//     //     res.status(403).json({ status: 403, error: true, message: 'you cannot create a movie without providing a tiltle and a year' })
//     // } else {
//     //     movies.push({ title: title, year: year, rating: rating });
//     //     res.json(movies);
//     // }

// })

// app.put(`/movies/edit/:ID`, (req, res) => {
//     let { ID } = req.params;
//     let { title, year, rating } = req.query;
//     if (ID > movies.length || ID <= 0 || isNaN(ID)) {
//         res.status(403).json({ status: 403, error: true, message: `The movie ${ID} does not exist` })
//     } else {
//         /*in case of Id , I can use movies.findIndex(movie=>movie.id===parseInt(id))*/
//         if (title) movies[ID - 1].title = title;
//         if (rating) movies[ID - 1].rating = rating;
//         if (year) {
//             if (year.length !== 4 || isNaN(year)) {
//                 res.status(403).json({ status: 403, error: true, message: `Invalid year` })
//             } else
//                 movies[ID - 1].year = year;
//         }

//         res.json(movies);
//     }
// })


// app.delete(`/movies/delete/:ID?`, (req, res) => {
//     let { ID } = req.params;

//     if (!ID || ID > movies.length || ID <= 0 || isNaN(ID)) {
//         res.status(403).json({ status: 403, error: true, message: `The movie ${ID} does not exist` })
//     } else {
//         movies.splice(ID - 1, 1);
//         res.json(movies);
//     }
// }
// )

// app.get(`/movies/get/:order?`, (req, res) => {
//     !req.params.order ? res.json({ status: 200, data: movies })
//         :
//         req.params.order === "by-date" ?
//             res.json({ status: 200, data: movies.sort((movie1, movie2) => movie1.year - movie2.year) }) :
//             req.params.order === "by-rating" ?
//                 res.json({ status: 200, data: movies.sort((movie1, movie2) => movie1.rating - movie2.rating) }) :
//                 req.params.order === "by-title" ?
//                     res.json({ status: 200, data: movies.sort((movie1, movie2) => movie1.title.localeCompare(movie2.title)) }) :
//                     res.send("choose another option")

// })


