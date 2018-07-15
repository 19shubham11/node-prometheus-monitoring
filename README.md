# node-prometheus-monitoring

This is an example for monitoring Node.js servers with Prometheus.

## Setup server

* `npm install` and hit `node app.js` to start the server 
* There are 3 GET endpoints and 1 POST endpoint with random response times to simulate monitoring
* Prometheus metrics are exported at `/metrics`

## Setup prometheus
* Download latest relase from [here](https://prometheus.io/download/) , they also have a really cool documentation.
* In the prometheus.yml set the target to the node server we had just set up
* Prometheus dashboard is visible on `localhost:9090`


## Metrics

This setup supports the following metrics along with a few default node js metrics whic the  [node prometheus client](https://github.com/siimon/prom-client) provides
1. total_requests
2. HTTP Response time (in ms)

Based on the above two , we can derive a plot a few metrics of our using prometheus's query language , below are a few

* Error Rate[TODO]
* RPM (Requests per minute) =>
```sum(rate(http_response_ms_sum[1m])) by (service, method, path, status)  * 60```

* Average Response Time =>
`avg(rate(http_response_ms_sum[5m]) / rate(http_response_ms_count[5m])) by  (service, method, path, status)`

* Average Memory Usage =>
`avg(nodejs_external_memory_bytes / 1024 / 1024) by (service)`


### TODO
- [ ] Error Rate
- [ ] Throughput
- [ ] Graphana
- [ ] More alerts