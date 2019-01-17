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
footer: MIT Licensed | Copyright © 2019 Perov Konstantin (fe3dback@yandex.ru)
---

## How it works

<Badge text="draft v0.1" type="warn" />

1. Client makes Request to Application:

```
https://example.com/api/my-url/?hello-world
```

2. Application return Response with 2 additional headers:

```
X-Http-Debug-Id: ae1d1530-7c2c-4ff7-bfeb-70f80c8bc7ed
X-Http-Debug-Api: /_profile/?id=
```

3. Client makes request to X-Http-Debug-Api url

```
https://example.com/_profile/?id=ae1d1530-7c2c-4ff7-bfeb-70f80c8bc7ed
```

4. Application server return debug/profile information for first request

```json
{
    "id": "ae1d1530-7c2c-4ff7-bfeb-70f80c8bc7ed",
    "version": 1,
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

@todo read more
