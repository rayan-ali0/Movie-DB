const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send("OK!")
})
var dateTime = new Date();

app.get('/test', (req, res) => {
    res.send({ status: 200, message: "ok" })
})
app.get('/time', (req, res) => {
    currentTime = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
    res.send({ status: 200, message: currentTime })
})

app.get(`/hello/:Id?`,(req,res)=>{
    let id=req.params.Id;
    id ? res.send(`Hello ${id}`) : res.send("Hello")
})
app.get(`/search`,(req,res)=>{
    let search=req.query.s;// I put .s in order to take just the variable s in the url if I used req.query it will take all variable in the url and put them in an object
   search ? res.send({status:200,message:"ok",data:search}) : res.send({status:500,error:true,message:"you have to provide a search"})
})


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})