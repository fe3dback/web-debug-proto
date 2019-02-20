---
title: Transport - Headers + API
lang: en-US
---

This transport will use `persistent storage` on your server.
Server application will store all debug information to specified
storage, and API should load this information by UUID 
and return to client

## Server side

Only `UUID` and `debug API endpoint` is returned with Response.

### Part 1 - save scheme to persistent storage

During request backend should store all debug data (scheme)
to some persistent storage (db, files, memcached, etc..).

:::tip
Recommended ttl - 10 min
:::

Backend CAN add custom headers to Response:

```
X-Http-Debug-Id: uuid
X-Http-Debug-Api: profileEndPoint
```

- where *uuid* is `Request` `UUID`.
- where *profileEndPoint* is uri of `debug API endpoint`.

:::tip example
Example of valid headers:
```
X-Http-Debug-Id: ef95a542-25a3-4f71-a0e9-640c92f43813
X-Http-Debug-Api: /_profile/?id=
```
:::

`Client` will concat headers and make request to this url:
```
https://app.example.com/_profile/?id=ef95a542-25a3-4f71-a0e9-640c92f43813
```

### Part 2 - profile api

```
/_profile/?id=<UUID>
```

This api should return all debug data, loaded by UUID
from persistent storage

- `debug API endpoint` *SHOULD* return one of described HTTP Responses ordered by priority:
    
    - **case 1:** Found debug information by `UUID`:
    ```
    * Status    = 200 OK
    * Headers   = ANY + Content-Type: application/json
    * Body      = `JSON` with debug information
    ```
    
    Body `JSON` *SHOULD* use valid `scheme` described in [Scheme](/docs/scheme/) section.
    
    ::: tip example of body
    
    @todo example of returned json
    ```json
    { ... }
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
