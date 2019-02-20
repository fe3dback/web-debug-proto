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

:::danger work in progress
Protocol, scheme, documentation and transports currently in draft

See contact page for any issued, ideas, proposal, etc..
:::

## How it works

<img-centered uri="/debug-flow-preview.png" alt="Client-Server debug request"></img-centered>

:::warning
@todo normal example picture here
:::

#### 1. Client makes Request to Application:

```
https://example.com/api/my-url/?hello-world
```

#### 2. Application return Response with 2 additional headers:

```
X-Http-Debug-Id: ae1d1530-7c2c-4ff7-bfeb-70f80c8bc7ed
X-Http-Debug-Api: /_profile/?id=
```

#### 3. Client makes request to X-Http-Debug-Api url

```
https://example.com/_profile/?id=ae1d1530-7c2c-4ff7-bfeb-70f80c8bc7ed
```

#### 4. Application server return debug/profile information for first request

:::warning
@todo move this scheme preview to component
:::

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

<primary-link target="/docs/scheme/" title="View scheme"/>
