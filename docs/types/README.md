---
title: Supported types
lang: en-US
---

| key | type | description |
| --- | ---- | ----------- |
| id | guid  | unique request id |
| version | int | schema version |
| request_in | ts_mili | request in time |
| response_out | ts_mili | response out time |
| method | method  | HTTP method |
| uri | uri | full request uri |
| headers | param[] | list of request headers |
| controller | string | custom controller name |
| query_data | param[] | parsed query (GET) data |
| post_data | param[] | parsed body (POST) data |
| session | param[] | user session data |
| user | user | current auth user |
| response_code | int | HTTP response code |
| memory_usage_bytes | int | max/peak memory usage (in bytes) during request |
| queries | db_query[] | database queries during request |
| cache_total_count | int | cache read requests count |
| cache_hits_count | int | cache hit requests count |
| cache_writes_count | int | cache write requests count |
| cache_deletes_count | int | cache delete requests count |
| cache_duration | duration_mili | total cache io duration in ms |
| timeline | todo | n/a |
| logs | todo | n/a |
| events | todo | n/a |
| routes | todo | n/a |
| emails | todo | n/a |
| views | todo | n/a |
| async_requests | todo | n/a |
| sub_requests | todo | n/a |
