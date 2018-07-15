# node-prometheus-monitoring


`total_requests`
```
//Error Rate =>

//sum(increase(http_response_ms_count{code=~"^5..$"}[1m])) /  sum(increase(http_response_ms_count[1m]))
```

`RPM =>`
`sum(rate(http_response_ms_sum[1m])) by (service, method, path, status)  * 60`


`Average Response Time =>`
`avg(rate(http_response_ms_sum[5m]) / rate(http_response_ms_count[5m])) by  (service, method, path, status)`



`Average Memory Usage =>`
`avg(nodejs_external_memory_bytes / 1024 / 1024) by (service)`


