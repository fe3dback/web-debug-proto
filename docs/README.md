---
title: Introduction
lang: en-US
---

## Warning

Web Application Debug protocol currently in draft. <Badge text="v0.1" type="warn" />

All scheme, types, fields can be changed before release.

## Install existing lib

Check in [implementations](/implementations/) page, for already existing
modules and libs.

## Implement from scratch

We recommend split implementation on 3 levels:

```
  +---------------------+
3 | Backend application |
  +---------------------+--+
2 | Framework bundle       |
  +------------------------+--+
1 | Core module               |
  +---------------------------+
```

### 1. Core module

Basic module, implement all OOP models, tree structures
and public API. This module SHOULD care about collect, store
and give back prepared debug information from storage.

For example:

```php{19}
// this is pseudo code
$storage = new SqliteStorage();
$profiler = new HttpProfiler(version: 1);
$profiler->setStorage(IStorage: $storage);

// add info about current request
$profiler->setController(name: 'ArticlesController');

$query = new Query(
    db_type: 'postgres',
    query: 'SELECT * FROM articles LIMIT 1',
    duration: 4
);
$profiler->addQuery(query: $query);

$guid = $profiler->storeRequest();

// get collected information
$json = $profiler->fetch(guid: $guid);
```
```json
{
    "id": "ef95a542-25a3-4f71-a0e9-640c92f43813",
    "version": 1,
    "controller": "ArticlesController",
    "queries": [
        "db_type": "postgres",
        "query": "SELECT * FROM articles LIMIT 1",
        "duration": 4
    ]
}
```
```php{1}
$headers = $profiler->getHeaders(guid: $guid, profileUri: '/_profile/?id=');
```
```json
[
    "X-Http-Debug-Id": "ef95a542-25a3-4f71-a0e9-640c92f43813",
    "X-Http-Debug-Api": "/_profile/?id="
]
```

### 2. Framework bundle

Library based on core module for programming language.

For example "Symfony framework bundle" for "PHP", where

- Level 1 = PHP library "core module"
- Level 2 = Symfony framework bundle (depend on "core module")

This bundle should collect all information about request, and use
default available systems in framework for storing and serving profile
api.

Ideally this can work "out of the box", just install bundle and all done.

Optional params MAY be placed in framework config.

### 3. Backend application

If you develop application without framework, and someone already
write level 1 "core module" for your language, use it for all
"dirty work". If no "core" module exist, write it and publish on github
for another peoples )

## Terms

@todo move this block to another place

**Server**
:   Any web server which can handle incoming HTTP requests. For Client
    is testing web application backend.

**Client**
:   GUI/console application for making and debugging HTTP request to
    Server, for example:

- any browser with dev tools, like "chromium"
- api test tools, like "postman"
- console utilities, like "curl"
- etc..
