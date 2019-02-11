---
title: Scheme
lang: en-US
---

#### JSON

Scheme should be described in JSON

You can read more about JSON here:
[rfc7151 JSON](https://tools.ietf.org/html/rfc7159)

#### Available fields

| key | type | required | description |
| --- | ---- | -------- | ----------- |
| id | [uuid](types.html#uuid) | Y | unique request id |
| version | [int](types.html#int) | Y | schema version |
| request_at | [ts_mili](types.html#ts-mili) || request received at |
| request_method | [method](types.html#method) || request HTTP method |
| request_uri | [uri](types.html#uri) || full request uri |
| request_headers | [param[]](types.html#param) || list of received request headers |
| request_query | [param[]](types.html#param) || list of received request query (GET) params |
| request_body | [param[]](types.html#param) || list of received request body (POST) params |
| request_cookies | [param[]](types.html#param) || list of received request cookies |
| session_params | [param[]](types.html#param) || loaded session params |
| route | [route](types.html#route) || matched route controller |
| middleware | [middleware[]](types.html#middleware) || list of executed middleware |
| memory_peak | [byte](types.html#byte) || max/peak memory usage (in bytes) during request |
| user | [user](types.html#user) || current auth user |
| acl | [access_check[]](types.html#access-check) || checked permissions and auth during request |
| db_queries | [db_query[]](types.html#db-query) || database queries during request |
| cache_queries | [cache_query[]](types.html#cache-query) || cache queries during request |
| logs | [log[]](types.html#log) || application logs |
| emails | [email[]](types.html#email) || sent emails |
| templates | [template[]](types.html#template) || rendered templates |
| events | [event[]](types.html#event) || triggered events |
| response_at | [ts_mili](types.html#ts-mili) || response generated at |
| response_code | [int](types.html#int) || response HTTP code |

#### Example of scheme

```json
{
    "id": "ef95a542-25a3-4f71-a0e9-640c92f43813",
    "version": 1,
    "controller": "ArticlesController",
    "queries": [
        {
            "db_type": "postgres",
            "query": "SELECT * FROM articles LIMIT 1",
            "duration": 4
        }
    ],
    "logs": [
        {
            "level": "warning",
            "message": "User X is logged in admin panel",
            "group": "php:app_03",
            "context": "{\"user_id\": 12345}"
        }
    ]
}
```

#### Future fields proposal for next version

| key | type | required | description |
| --- | ---- | -------- | ----------- |
| timeline | @todo || profile date for waterfall, all executed code methods with duration |
| async_requests | @todo || not blocking HTTP request (also support debug) |
| sub_requests | @todo || nested, blocking HTTP request (also support debug) |
| custom | @todo || custom tables, view, widgets.. |
