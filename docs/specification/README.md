---
title: Specification
lang: en-US
---

## Terms

#### UUID
Universe unique id

You can read more about UUID here:
[rfc4122 UUID](https://tools.ietf.org/html/rfc4122)

Recommended to use 4 version of UUID (random)

Example:
```
ef95a542-25a3-4f71-a0e9-640c92f43813
```

#### JSON

You can read more about JSON here:
[rfc7151 JSON](https://tools.ietf.org/html/rfc7159)

#### Server
Your application service working over HTTP

#### Profile Client
Some testing / profiling application, for example:
- API testing apps, like *postman*
- browser tools, like *chromium devtools*
- console utils, like *curl*
- etc..

#### Request
HTTP Request to your `Server`

#### Response
HTTP Response for `Request`


## Transports overview

### Headers+api

Server return only debug UUID and api endpoint.
Client make request to api endpoint and load all debug data.

[read specification](transport/headers-request)

:::tip pros
+ universal transport, working everywhere
+ not increase response time, body size
+ nested requests can be easy handled in backend
:::

:::danger cons
- persistent storage on server
- O(n) round trips, where n = count of nested requests + 1
- need to maintain special api (used for fetch debug data by UUID)
:::


### json response

All debug data injected to normal application json response (in special
json key)

[read specification](transport/json-response)

:::tip pros
+ server does not store anything
+ no additional round trips (all debug data already in response)
:::

:::danger cons
- working only with json responses
- custom backend logic with json output
- increase body size and request time
- application client should ignore custom fields in response
- http server should be properly configured (cache, ttl, etc..)
:::


### html meta

All debug data injected to header meta tag with special id.

[read specification](transport/html-meta)

:::tip pros
+ server does not store anything
+ no additional round trips (all debug data already in response)
+ working with custom js clients (html app)
:::

:::danger cons
- working only with html pages
- increase body size and request time
- client should get json by xpath and parse it from string
:::

## Implementations

#### Server side

Server application CAN implement one or more transports at
same time.

#### Client side

Client SHOULD load debug data from transports by priority:
- html meta
    - if Content-Type is html, 
    - if HTML contains meta tag with id `id="x-http-debug"` and json
- json response
    - if Content-Type is application/json
    - if json body contains key `"_x_http_debug": "{..}"`
- Headers+api
    - if Response Headers contain `X-Http-Debug-Id`