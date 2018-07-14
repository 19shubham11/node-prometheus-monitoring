const express = require('express')
var bodyParser = require('body-parser');
var app = express()
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.start_time = Date.now()
    next()
})
const port = process.env.PORT || 3320

const Prometheus = require('./prometheus')

//SetTimeouf function to see some variable results in the dashboard
app.get('/', (req, res, next) => {
    setTimeout(()=>{
        res.set('Content-Type', 'application/json')
        res.json({ message: Math.random()*500 })
        next()
    },Math.random()*500)
})

app.get('/test', (req, res, next) => {
    setTimeout(()=>{
        res.set('Content-Type', 'application/json')
        res.json({ message: Math.random()*500 })
        next()
    },Math.random()*500)
   
})

app.get('/test_time', (req, res, next) => {
    setTimeout(()=>{
        res.set('Content-Type', 'application/json')
        res.json({ message: Math.random()*500 })
        next()
    },3000)
})

app.get('/bad', (req, res, next) => {
  next(new Error('My Error'))
})


app.post('/post',(req,res,next)=>{
    setTimeout(()=>{
    if(!req.body.Name){
        let err = {
            err : 'Bad Parms'
        }
        res.status(400).send(err)
    }else{
        res.set('Content-Type', 'application/json')
        res.json({ message: `Hello ${req.body.Name}` })
    }
    next()
},Math.random()*500)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

app.use(Prometheus.requestCount)
app.use(Prometheus.responseCount)

Prometheus.injectUrl(app)
Prometheus.startCollection()