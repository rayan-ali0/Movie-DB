const express=require('express')
const app=express()
const port =3000

app.get('/',async(req,res)=>{
    res.send("OK!")
})
var dateTime=new Date();

app.get('/test',async(req,res)=>{
    res.send({status:200,message:"ok"})
})
app.get('/time',async(req,res)=>{
    currentTime=`${dateTime.getHours()}:${dateTime.getMinutes()}`;
    res.send({status:200,message:currentTime})})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})
