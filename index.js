const express = require('express')
const app = express()
const port = 3000
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب و الكباب ', year: 1992, rating: 6.2 }
]

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

app.get(`/movies/add`, (req, res) => {
    res.send(`Add a new Movie`)

})

app.get(`/movies/edit`, (req, res) => {
    res.send(`Update a movie`)
})

app.get(`/movies/delete`, (req, res) => {
    res.send(`Delete a movie`)
})

app.get(`/movies/get`, (req, res) => {
    res.json({ status: 200, data: movies })

})
app.get(`/movies/get/:order?`, (req, res) => {
    req.params.order === "by-date" ?
        res.json({ status: 200, data: movies.sort((movie1, movie2) => movie1.year - movie2.year) }) :
        req.params.order === "by-rating" ?
            res.json({ status: 200, data: movies.sort((movie1, movie2) => movie1.rating - movie2.rating) }) :
            req.params.order === "by-title" ?
                res.json({ status: 200, data: movies.sort((movie1, movie2) => movie1.title.localeCompare(movie2.title)) }) :
                res.send("choose another option")
    
})
app.get(`/movies/get/id/:ID`, (req, res) => {
    let id =req.params.ID;
    id>movies.length || id<=0 || !isNaN(id)? 
    res.status(404).json({ status: 404, error: true ,message:`the movie ${id} does not exist`})
    :
    res.status(200).json({status:200,data:movies[id-1]})
})
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})