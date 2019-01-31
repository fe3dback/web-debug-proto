---
title: Specification
lang: en-US
---

## Server Side

### Terms

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

#### Profile API

Working debug/profile API in your `Server`.

This API take `UUID` as input and *SHOULD*
return all debug information about `Request`

read more in *Rules* section.

#### Debug headers

This is HTTP headers in `Response`:

```
X-Http-Debug-Id: uuid
X-Http-Debug-Api: profileEndPoint
```

- where *uuid* is `Request` `UUID`.
- where *profileEndPoint* is uri of `Profile API`.

Example of valid headers:
```
X-Http-Debug-Id: ef95a542-25a3-4f71-a0e9-640c92f43813
X-Http-Debug-Api: /_profile/?id=
```

`Profile Client` will concat headers and make request to this url:
```
https://app.example.com/_profile/?id=ef95a542-25a3-4f71-a0e9-640c92f43813
```

- where `https://app.example.com/` is HTTP protocol and hostname from `Request`

### Rules

- `Server` *MAY* add `debug headers` to HTTP `Responses`
- `Profile API` *SHOULD* return one of described HTTP Responses ordered by priority:
    - **case 1:** Found debug information by `UUID`:
    ```
    * Status    = 200 OK
    * Headers   = ANY + Content-Type: application/json
    * Body      = `JSON` with debug information
    ```
    Body `JSON` *SHOULD* use valid `scheme` described in [Scheme](/docs/scheme/) section.
    ::: tip example of body
    ```json
    {
        "id": "ef95a542-25a3-4f71-a0e9-640c92f43813",
        "version": 1,
        "uri": "/articles/",
        "queries": [
            "db_type": "postgres",
            "query": "SELECT * FROM articles LIMIT 1",
            "duration": 4
        ]
    }
    ```
    :::
    - **case 2:** Not allowed (usually on production):
    ```
    * Status    = 403 Forbidden
    * Headers   = ANY
    * Body      = ANY
    ```
    - **case 3:** Not found debug information by `UUID`, but profiling is allowed:
    ```
    * Status    = 404 Not Found
    * Headers   = ANY
    * Body      = ANY
    ```
    - **case 4:** Any other situation (profiler will not work):
    ```
    * Status    = ANY
    * Headers   = ANY
    * Body      = ANY
    ```

## Client Side

@todo
