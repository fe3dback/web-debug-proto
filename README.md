---
home: true
title: Documentation
lang: en-US
actionText: Get Started
actionLink: /docs/
features:
- title: Any language
  details: Protocol can be implemented on any programming language
- title: Framework integration
  details: Install bundle for your favorite framework and start debug
- title: Client-side
  details: Working in browser dev-tools, API clients like "postman", console utils like curl, etc..
- title: Open source and free
  details: This is open source protocol with MIT license
- title: Easy
  details: You can implement it in super custom backend app in hour
- title: Scalable
  details: Clients can debug nested requests from all backends
footer: MIT Licensed | Copyright © 2018-present Perov Konstantin (fe3dback@yandex.ru)
---

<Badge text="draft v0.1" type="warn" />

## Abstract

Union debug protocol for any modern web application. Scheme can be
easy implemented on any programming language and framework.

Also any client can implement debug support and give more
helpful information to developers. HTTP response traditionally
contains:

- response body
- response headers

This protocol working over HTTP, and allows to add more
information about what is going on during request, for example:

- sql queries
- events
- profiling (timings, flamegraph)
- matched routes
- checked acl
- used cache (hits, reads, writes, etc..)
- logs
- user information
- .. and many more (also custom data)

## How it works

1. Client makes real Request to Server:

```text
/api/my-url/?hello-world
```

2. Server return real Response with 3 debug headers:

```text
X-Http-Debug-Id: 5b67d5...e09
X-Http-Debug-Version: 1.0
X-Http-Debug-Api: /_profile/?id=
```

3. Client make Debug-Request to Server:

```text
/_profile/?id=5b67d5...e09
```

4. Server return Debug-Response:

```json
{
    "id": "5b67d5...e09",
    "request_in": 1547058561177,
    "response_out": 1547058622423,
    "controller": "MyController",
    "cache_hits_count": 14,
    "queries": [
        {
            "db_type": "mysql",
            "query": "SELECT * FROM articles WHERE ID = ?id",
            "parsed": "SELECT * FROM articles WHERE ID = 1;",
            "duration": 15,
        }
    ]
    ...
}
```

## Application debug

```text
| HTTP CLIENT                                                      |
+------------------------------------------------------------------+
|  |1| REAL                             |3| DEBUG                  |
|  +++ REQUEST           ^              +++ REQUEST            ^   |
|   |                    |               |                     |   |
|   |                    |               |                     |   |
|   v              REAL +++              v              DEBUG +++  |
|              RESPONSE |2|                          RESPONSE |4|  |
+------------------------------------------------------------------+
| APP.BACKEND                                                      |
```
