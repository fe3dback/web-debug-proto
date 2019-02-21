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

:::warning work in progress
Protocol, scheme, documentation and transports currently in draft

See contact page for any issues, ideas, proposal, etc..
:::

## How it works

```text

                                                       app server              Service A
                     GET https://example.com/hello     __________              __________ 
              ###################################>    [_..._....°]            [_|||||||_°]
  Client                   ___                        [_..._....°]    .-------[_|||||||_°]
   __  _                  |   |\                      [_..._....°]   /        [_|||||||_°]
  [__]|=|                 |   '-|                     [_..._....°]  /
  /::/|_|    <------------| APP |<-----------         [_|||||||_°] /
              Response    |_____|                     [_|||||||_°].
                                                      [_|||||||_°] \           Service B
                                                      [_________°]  \          __________ 
                                                      [_________°]   \        [_|||||||_°]
                                                      [_________°]    '-------[_|||||||_°]
              GET example.com/_profile/id=ae1d..ed    [___....__°]            [_|||||||_°]
              ###################################>        |   ^
  Client                   ___                            v   |
   __  _                  |   |\                        _.-----._  
  [__]|=|                 |   '-|                     .-         -.
  /::/|_|    <------------| DEB |<-----------         |-_       _-|
              Debug data  |_____|                     |  ~-----~  |
                                                      |    db     |
                                                      `._       _.'
                                                         "-----"   

```

#### 1. Client makes Request to Application:

```
https://example.com/hello
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

<<< @/examples/scheme_v1.json

<primary-link target="/docs/scheme/" title="View scheme"/>
