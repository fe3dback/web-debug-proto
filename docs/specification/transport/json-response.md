---
title: Transport - JSON response
lang: en-US
---

## Server side

1. Specify HTTP header
`Content-Type` = `application/json`

2. Add `_x_http_debug` object to your json response

This object SHOULD contain all required scheme fields.

You can use any json data protocol, for example [json-rpc](https://www.jsonrpc.org/specification), or
your own.

:::tip example response with json-rpc
```json
{
    "jsonrpc": "2.0",
    "result": 19,
    "id": 4,
    "_x_http_debug": {
        "uuid": "ef95a542-25a3-4f71-a0e9-640c92f43813",
        "version": 1,
        "events": [
            {
                "type": "log",
                "time": 1547058561177,
                "importance": 1,
                "payload": {
                    "message": "User X is try to login to admin panel",
                    "group": "php:app_03"
                }
            }
        ]
    }
}
```
:::
