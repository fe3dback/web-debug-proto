---
title: Modules
lang: en-US
---

::: warning
Web Application Debug protocol currently in draft.

All scheme, types, fields can be changed before release.

@todo remove warning
:::

## Install

Check in [implementations](/implementations/) page, for already existing
modules and libs.

@todo normal description here

## Implement

We recommend split implementation on 2 levels:

```
  +------------------------+
2 | Framework bundle / App |
  +------------------------+--+
1 | Core module               |
  +---------------------------+
```

### 1. Core module

- Basic **module**, implement all OOP models, tree structures
and code interfaces.

- **This module** *SHOULD* care about storing and retrieve information from storage by guid. can delegate storage functionality to common interface (database, cache, file system, etc..). Storage *CAN BE* configurable.

- **This module** *MUST NOT* collect any information about the request.

- By default, if no debug/profile information is provided, and `store()` method is called, only `scheme version` and request `guid` *SHOULD BE* saved to storage.

#### How to write core module

See [specification page](/docs/specifications/#server-side) for details.

#### Examples

```php
// this is pseudo code

$storage = new SQLiteStorage(..);
$profiler = new Profiler(version: 1);
$profiler->setStorage(IStorage: $storage);
$profiler->setProfileEndpoint(uri: '/_profile/');
$profiler->getGuid(); // ef95a542-25a3-4f71-a0e9-640c92f43813

// add some info about current request
$profiler->setUri(uri: $request->getUri());

// and for example for query
$query = new DbQuery(
    db_type: 'postgres',
    query: 'SELECT * FROM articles LIMIT 1',
    duration: 4
);
$profiler->addQuery(DbQuery: $query);

// save profile/debug info into sqlite table
$profiler->store();

// append headers to response
$response->addHeaders($profiler->getHeaders());

// getHeaders:
// [
//     "X-Http-Debug-Id": "ef95a542-25a3-4f71-a0e9-640c92f43813",
//     "X-Http-Debug-Api": "/_profile/"
// ]
```

And define specified profile route in your app:

```php
// this is pseudo code

// client will request "/_profile/ef95a542-25a3-4f71-a0e9-640c92f43813"

Route::get('/_profile/{guid}', function ($guid) {

    // disable debug on production services
    if ($this->isProduction()) {
        return $response->withCode(code: 403);
    }

    // find profile data by guid
    $data = $profiler->get(guid: $guid);

    if ($data) {
        $response->addHeader(key: 'Content-Type', value: 'application/json');
        $response->setBody(buffer: $data->exportToJson());
        return $response->withCode(code: 200);
    }

    // nothing found :(
    return $response->withCode(code: 404);
});
```

:::tip example
Profile response with debug information
:::

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

### 2. Framework bundle

Library based on level 1 **core module**.

:::tip example
"Symfony framework bundle" for "PHP", where:
- Level 1 = vendor PHP library "**core module**"
- Level 2 = Symfony framework bundle
:::

- **This bundle** *SHOULD* collect all debug/profile information during request
- **module** *MAY* use native framework debugger and profiler for data
- **module** *MAY* use framework router and storage
- **module** *MAY* use additional configuration

Ideally this should work "out of the box", just install bundle and all done.

### 2. Custom app

If no framework used for project, you'll have to write level 2
library/bundle.

Please refer to level 1 **core module** documentation for help.

[Check exist core module implementations](/implementations/) for your programming
language.
