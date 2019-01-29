---
title: Version 1
lang: en-US
---

## custom components tests

@todo remove this block

<test>
{
    "test": 123452,
    "model-x": %user%,
    "model-y": %user%
}
</test>


#### JSON

Scheme should be described in JSON

You can read more about JSON here:
[rfc7151 JSON](https://tools.ietf.org/html/rfc7159)

#### Available fields

| key | type | required | description |
| --- | ---- | -------- | ----------- |
| id | [uuid](types.html#uuid) | Y | unique request id |
| version | [int](types.html#int) | Y | schema version |
| request_in | [ts_mili](types.html#ts-mili) || request in time |
| response_out | [ts_mili](types.html#ts-mili) || response out time |
| method | [method](types.html#method) || HTTP method |
| uri | [uri](types.html#uri) || full request uri |
| headers | [param[]](types.html#param) || list of request headers |
| query_data | [param[]](types.html#param) || parsed query (GET) data |
| post_data | [param[]](types.html#param) || parsed body (POST) data |
| session | [param[]](types.html#param) || user session data |
| user | [user](types.html#user) || current auth user |
| controller | [string](types.html#string) || controller name/class |
| action | [string](types.html#string) || controller action |
| response_code | [int](types.html#int) || HTTP response code |
| memory_usage_bytes | [byte](types.html#byte) || max/peak memory usage (in bytes) during request |
| queries | [db_query[]](types.html#db-query) || database queries during request |
| cache | [cache_query[]](types.html#cache-query) || cache queries during request |
| logs | [log[]](types.html#log) || application logs |
| emails | [email[]](types.html#email) || sent emails |
| routes | [route[]](types.html#route) || checked and matched uri routes |
| templates | [template[]](types.html#template) || rendered templates |
| events | [event[]](types.html#event) || triggered events |
| acl | [access_check[]](types.html#access-check) || checked permissions and auth during request |

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

#### Future fields proposal for v2

| key | type | required | description |
| --- | ---- | -------- | ----------- |
| timeline | @todo || profile date for waterfall, all executed code methods with duration |
| async_requests | @todo || not blocking HTTP request (also support debug) |
| sub_requests | @todo || nested, blocking HTTP request (also support debug) |
