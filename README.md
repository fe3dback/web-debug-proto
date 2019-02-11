---
home: true
heroImage: /hero.png
title: Documentation
lang: en-US
actionText: Get Started
actionLink: /docs/
features:
- title: Any language
  details: Protocol can be implemented on any programming language
- title: Framework plug and play
  details: Install bundle for your favorite web framework and its done
- title: Any client
  details: Working in browser dev-tools, API clients like "postman", console utils like curl, etc..
- title: Open source and free
  details: This is open source protocol with MIT license
- title: From scratch..
  details: ..can be implemented in hour. Easy as like falling off a log
- title: Scalable
  details: Microservice ready, you can debug nested requests
footer: MIT Licensed | Copyright © 2019 Perov Konstantin (fe3dback@yandex.ru)
---

## How it works

<img-centered uri="/debug-flow-preview.png" alt="Client-Server debug request"></img-centered>

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
    "request_at": 1547058561177,
    "response_at": 1547058622423,
    "route": {
        "name": "admin_articles_edit",
        "resource": "App\Http\Admin\ArticlesController@edit",
        "url_template": "/articles/edit/{{id}}",
        "type": "controller",
        "resource_loc": {
            "file": "/src/App/Http/Admin/ArticlesController.php",
            "line": 120
        }
    },
    "db_queries": [{
        "db_type": "mysql",
        "query": "SELECT * FROM articles WHERE ID = ?id",
        "parsed": "SELECT * FROM articles WHERE ID = 1;",
        "duration": 15,
        "bindings": [{
            "key": "id",
            "value": "2"
        }]
    }]
    ...
}
```

<primary-link target="/docs/scheme/" title="View scheme"/>
