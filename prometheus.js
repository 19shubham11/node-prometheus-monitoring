const Prometheus = require('prom-client')

var total_requests = new Prometheus.Counter({
    name: 'total_requests',
    help: 'Total requests made',
    labelNames: ['method']
})

var paths_taken = new Prometheus.Counter({
    name: 'paths_taken',
    help: 'Paths taken',
    labelNames: ['path']
})


var http_response_ms = new Prometheus.Summary({
    name: 'http_response_ms',
    help: 'Response time in millis',
    labelNames: ['method', 'path', 'status']
})


var startCollection = function () {  
    console.log('Starting the collection of metrics, the metrics are available on /metrics') 
    require('prom-client').collectDefaultMetrics();
}

var requestCount = (req,res,next)=>{
    if(req.url!='/metrics'){
        total_requests.inc({ method: req.method })
        paths_taken.inc({ path: req.path })
    }
    next()
}

var responseCount = (req,res,next)=>{
    if(req.url!='/metrics'){
        let time = Date.now() - res.start_time
        console.log(req.url , time)
        http_response_ms.labels(req.method, req.url, res.statusCode).observe(time)
    }
    next()
}


var injectUrl = function (App) {
    App.get('/metrics', (req, res) => {
        res.set('Content-Type', Prometheus.register.contentType)
        res.end(Prometheus.register.metrics())
    })
}
module.exports = {
    'startCollection' : startCollection,
    'requestCount' : requestCount,
    'responseCount' : responseCount,
    'injectUrl' : injectUrl
}