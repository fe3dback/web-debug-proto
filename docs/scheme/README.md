---
title: Scheme
lang: en-US
---

## JSON

Scheme should be described in JSON

You can read more about JSON here:
[rfc7151 JSON](https://tools.ietf.org/html/rfc7159)

## Scheme definition

- `Scheme` is list of `Events`
- each `Event` is json object with [properties](#event-properties)
- each `Event` has `type`, `payload` and other not required properties
- `Event` `payload` object scheme depend on `Event` `type`
- `Event` `type` is enum, but can by any custom type. `client` will display `payload` as raw json if type is not known
- `Event` can contains nested `Scheme` with another `events`

:::tip
- Scheme is sort of logs (events) list with context (payload).
- Scheme can by recursive (Tree structure)
- Events in scheme will be sorted from oldest to newest
:::

### Event properties
| name | type | required | description | example |
| ---- | ---- | -------- | ----------- | ------- |
| type | [Event types](#event-types) | Y | event type define object properties of `payload` | `"request"` |
| payload | object | Y | event details (context), available properties depend on `type` | `{ .. }` |
| tags | [string[]](types.html#string) | | tags used for filtering events in `client` | `["db","mysql"]` |
| importance | [int (1-8) or rfc5424 levels](types.html#importance) | | used for filtering in `client` | `5` |
| time | [ts_mili](types.html#ts-mili) | | event timestamp in ms | `1547058563454` |
| duration | [duration_mili](types.html#duration-mili) | | event duration in ms | `4` |
| success | [bool](types.html#bool) | | `false` in case of error / alarm. Will be highlighted in `client` | `false` |
| called_from | [location](types.html#location) | | code location, where this event is called from (ex. where template is rendered) | `{ .. }` |
| defined_in | [location](types.html#location) | | code location, where this event is called from (ex. where template is rendered) | `{ .. }` |
| nested | [`Scheme`](#scheme-definition) | | recursion to `Scheme`. Can contains other nested `Events` | `{ .. }` |

### Event types

This is known list of event types, but you can use any own types

| type | event description |
| --- | ----------- |
| [income_request](types.html#income-request) | request received event, payload contain all request props (method, uri, cookies, params, etc..) |
| [middleware](types.html#middleware) | middleware triggered event |
| [access_check](types.html#access-check) | checked permissions and auth during request |
| [query](types.html#query) | database, io, cache queries during request |
| [log](types.html#log) | application logs |
| [email](types.html#email) | sent email events |
| [template](types.html#template) | rendered templates |
| [response](types.html#template) | response event before output, payload contain response properties (status code, total duration, etc..) |

### importance map table (mapped level to int)

property `importance` can by `int` `[from 1 to 8]`, or mapped level `string` in `enum list`:

| level | importance | description |
| --- | ----------------- | ----------- |
| debug | 1 | Detailed debug information |
| info | 2 | Interesting events. Examples: User logs in |
| notice | 3 |  Normal but significant events |
| warning | 4 | Exceptional occurrences that are not errors. Examples: Use of deprecated APIs, poor use of an API, undesirable things that are not necessarily wrong |
| error | 5 | Runtime errors that do not require immediate action but should typically be logged and monitored |
| critical | 6 | Critical conditions. Example: Application component unavailable, unexpected exception |
| alert | 7 | Action must be taken immediately. Example: Entire website down, database unavailable, etc. This should trigger the SMS alerts and wake you up |
| emergency | 8 | Emergency: system is unusable |

### Example of scheme tree

```text

                                    .---------------------------.
                 .---------------.  |          payload          |
                 |     Event     |  |---------------------------|
                 |---------------|  | event details (context),  |
  .-----------.  | * type        |  | available properties      |
  |  Scheme   |  | * payload     |  | depend on type            |
  |-----------|  | - tags        |  '---------------------------'
  | [ Event ] |  | - time        |                ^
  | [ Event ] |->| - duration    |----------------------------.
  | [ .. ]    |  | - importance  |         v                  |
  | [ Event ] |  | - success     |  .------------.            |
  '-----------'  | - called_from |  |    type    |            |
        ^        | - defined_in  |  |------------|            |
        #        | - nested      |  | log        |            |
        #        '---------------'  | query      |            |
        #                           | email      |            v
        #                           | template   |     .------------.
        #                           | middleware |     |   nested   |
        #                           | ..         |     |------------|
        #                           | CUSTOM     |     | *recursion |
        #                           '------------'     '------------'
        #                                                     #
        <######################################################

```

### Example of scheme

```json
{
  "uuid": "ef95a542-25a3-4f71-a0e9-640c92f43813",
  "version": 1,
  "events": [
  
    {
      "type": "log",
      "time": 1547058561177,
      "importance": 1,
      "payload": {
        "level": "debug",
        "message": "User X is try to login to admin panel",
        "group": "php:app_03"
      }
    },
    
    {
      "type": "log",
      "time": 1547058571245,
      "importance": 2,
      "payload": {
        "level": "warning",
        "message": "User X is logged in admin panel",
        "group": "php:app_03"
      }
    },
    
    {
      "type": "request",
      "time": 1547058563454,
      "importance": 4,
      "payload": {
        "type": "mysql",
        "query": "UPDATE users SET last_loggin = ?dt WHERE id = ?id",
        "parsed": "UPDATE users SET last_loggin = '2019-02-20 10:32:20' WHERE id = 1000",
        "duration": 15,
        "bindings": [
          {
            "key": "id",
            "value": "1000"
          },
          {
            "key": "dt",
            "value": "2019-02-20 10:32:20"
          }
        ]
      },
      "state": false,
      "nested": [
        {
          "type": "log",
          "time": 1547058563454,
          "importance": 1,
          "payload": {
            "level": "debug",
            "message": "Formatting sql query"
          }
        },
        {
          "type": "log",
          "time": 1547058571245,
          "importance": 5,
          "payload": {
            "level": "error",
            "message": "Mysql server is going away!"
          }
        },
        {
          "type": "email",
          "time": 1547058583422,
          "importance": 3,
          "payload": {
            "subject": "Mysql is down!",
            "body": "<h1>Hello admin</h1> <p>mysql is down.</p>",
            "from": "no-reply@example.com",
            "to": "admin@example.com"
          }
        }
      ]
    }
  ]
}
```

## todo (refactor this)

:::warning
this is old stuff, please ignore all below
:::


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


#### Future fields proposal for next version

| key | type | required | description |
| --- | ---- | -------- | ----------- |
| timeline | @todo || profile date for waterfall, all executed code methods with duration |
| async_requests | @todo || not blocking HTTP request (also support debug) |
| sub_requests | @todo || nested, blocking HTTP request (also support debug) |
| custom | @todo || custom tables, view, widgets.. |
