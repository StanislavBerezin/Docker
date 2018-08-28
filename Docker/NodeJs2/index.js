const express = require('express')
const redis = require('redis')
const process = require('process')

const app = express()

const client = redis.createClient({
    //it will know that you are looking for a container
    host: 'redis-server'
})

client.set('visits', 0)


app.get('/', (req, res)=>{
    process.exit(0)
    client.get('visits', (err, visits)=>{
        res.send("number of aaSsits is " + visits)
        client.set('visits', parseInt(visits) + 1)
    })
})

app.listen(8081, ()=>{
    console.log("listening on port 8081")
})