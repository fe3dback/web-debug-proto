---
title: Version 1
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
| request_in | [ts_mili](types.html#ts-mili) | N | request in time |
| response_out | [ts_mili](types.html#ts-mili) | N | response out time |
| method | [method](types.html#method) | N | HTTP method |
| uri | [uri](types.html#uri) | N | full request uri |
| headers | [param[]](types.html#param) | N | list of request headers |
| query_data | [param[]](types.html#param) | N | parsed query (GET) data |
| post_data | [param[]](types.html#param) | N | parsed body (POST) data |
| session | [param[]](types.html#param) | N | user session data |
| user | [user](types.html#user) | N | current auth user |
| controller | [string](types.html#string) | N | controller name/class |
| action | [string](types.html#string) | N | controller action |
| response_code | [int](types.html#int) | N | HTTP response code |
| memory_usage_bytes | [byte](types.html#byte) | N | max/peak memory usage (in bytes) during request |
| queries | [db_query[]](types.html#db-query) | N | database queries during request |
| cache | [cache_io[]](types.html#cache-io) | N | cache IO calls |
| logs | [log[]](types.html#log) | N | written logs |
| emails | [email[]](types.html#email) | N | n/a |
| timeline | todo | N | n/a |
| events | todo | N | n/a |
| routes | todo | N | n/a |
| templates | todo | N | n/a |
| async_requests | todo | N | n/a |
| sub_requests | todo | N | n/a |

@todo:
- cache_io
- log
- email

#### Example of scheme

```json
{
    "id": "ef95a542-25a3-4f71-a0e9-640c92f43813",
    "version": 1,
    "controller": "ArticlesController",
    "queries": [
        "db_type": "postgres",
        "query": "SELECT * FROM articles LIMIT 1",
        "duration": 4
    ]
}
```


