---
title: Types
lang: en-US
---

## bool

JSON: boolean (true / false)

```json
true
```

## int

JSON: number (int)

```json
12345
```

## string

JSON: string

Any text in double quotes. All another
quotes SHOULD be escaped

```json
"Hello \"good\" world"
```

## object

JSON: object

```json
{
    // object properties
}
```

## html

extends [string](#string)

Valid html in json string

```json
"Hello <b>world</b>"
```

## uuid

extends [string](#string)

You can read more about UUID here:
[rfc4122 UUID](https://tools.ietf.org/html/rfc4122)

Recommended to use 4 version of UUID (random)

```json
"5b67d5ef-b9cc-4a3e-896d-93e5f4500e09"
```

## importance

extends [int](#int)

Importance is int from 1 to 8, used for filtering in client

All standart log levels should be mapped on `server` to int by this table:

| level | importance | description |
| --- | ----------------- | ----------- |
| debug | 1 | Detailed debug information |
| info | 2 | Interesting events. Examples: User logs in |
| notice | 3 |  Normal but significant events |
| warning | 4 | Exceptional occurrences that are not errors. Examples: Use of deprecated APIs, poor use of an API, undesirable things that are not necessarily wrong |
| error | 5 | Runtime errors that do not require immediate action but should typically be logged and monitored |
| critical | 6 | Critical conditions. Example: Application component unavailable, unexpected exception |
| alert | 7 | Action must be taken immediately. Example: Entire website down, database unavailable, etc. This should trigger the SMS alerts and wake you up |
| emergency | 8 | Emergency: system is unusable |


#### Client recommendations

- Use range widget for fast filtering by importance

Example of UI with filters:

```text

    Importance:

     1            4            8
    '--------------------------'
                         ^
```

## tag

extends [string](#string)

Tag is string, can be separated with colon `:`.

Used for filtering events in client.

#### Multipart filter
If tag contain one colon, then:
- **left** part is `filter name`
- **right** part is `filter value`

```json
"name:value"
```
```json
"scope:kernel"
```
```json
"db:mysql"
```
```json
"db:mongo"
```

#### Flag
All tags without colon is `flag` (true / false)

```json
"is_production"
```
```json
"need_refactoring"
```

#### Client rules

- Get all tags from all events and build filters
- If tag is `Multipart filter`, display it like `multiple select`
- If tag is `Flag`, display it like `checkbox`
- Filters should be sorted by alphabet (ascending order from a-z)

Example of UI with filters:

```text

    Event filters:
    .-----------..---------..--------.
    |   db ▲    || scope ▼ || name ▼ |  [x] is_production
    |-----------|'---------''--------'  [ ] need_refactoring
    | [v] mysql |
    | [ ] mongo |
    '-----------'
    .--------------------------------------------------------.
    |                           ..                           |
    '--------------------------------------------------------'
    .--------------------------------------------------------.
    |                           ..                           |
    '--------------------------------------------------------'
    .--------------------------------------------------------.
    |                           ..                           |
    '--------------------------------------------------------'

```

## ts_mili

extends [int](#int)

unixtime (GMT) with milliseconds

```json
1547058561177
```

## duration_mili

extends [int](#int)

time duration in milliseconds

```json
140
```

## byte

extends [int](#int)

size in bytes

```json
1024
```

::: tip example (1 MB)
1000000
:::

## method

extends [string](#string)

HTTP Method (uppercase)

- GET
- HEAD
- POST
- PUT
- PATCH
- DELETE
- OPTIONS
- ANY
- *or custom*

```json
"POST"
```

## uri

extends [string](#string)

Read more about uri in
[wiki](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)

Full:
```json
"https://example.com:443/api/hello?foo=bar"
```

Relative:
```json
"/api/hello?foo=bar"
```

## rel_path

extends [string](#string)

```json
"/src/renderer/main.js"
```

#### Server rules

- Should be relative to root project directory
- file path SHOULD start with "/"
- Directory separator SHOULD BE "/" on all operation systems

#### Client rules

- Replace "/" with directory separator for current operation system.
"/" - for unix based, and "\\" - for Windows.
- Client SHOULD contain "project root" setting. This "project root"
SHOULD be used only for file content loading (for code display purpose).
- All GUI sections should display only relative path as defined.

## location

Allows you to specify the exact link to the position in the project code

<type-definition payload='@type-location' />

#### Client rules

- Prepend defined project root path to "rel_path"
- Load file in Read-only mode and fetch +-3 lines from specified "line"
- If no "line" specified, you should display only path to file
- Do not display absolute path with project root, only relative.
- Highlight all "line", if no "pos" specified
- Highlight all "line" and add "cursor" if only "line" and "pos" specified
- If "pos" and "pos_end" specified, client application MUST highlight
range between pos <= i && i <= pos_end.

#### Client recommendations

- Add button "load more" above and below loaded lines.
- Use syntax highlighting based on file extension (without lint)


## param

<type-definition :payload='[

    {
        key: "key",
        type: "string",
        required: true,
        description: "param title/code/name",
        example: "\"title\""
    },

    {
        key: "value",
        type: "string",
        required: true,
        description: "param value",
        example: "\"hello world\""
    },

]' />

## acl_vote

ENUM extends [string](#string)

```json
"GRANT"
```

#### Enum values
| key | description |
| --- | ----------- |
| GRANT | access is allowed for this check (vote for grant access) |
| DENIED | access is not allowed for this check (vote for denied access) |


## >>>> Development line <<<<
:::danger
// ------------------------------------------------------

// @todo: In development below this line

// ------------------------------------------------------
:::

## user

:::danger
@todo will be removed
:::

```json
{
    "id": "12345",
    "name": "admin",
    "email": "admin@example.com",
    "groups": [
        {
            "id": "42",
            "title": "editors",
            "perms": [
                {
                    "key": "edit",
                    "value": "articles"
                }
            ]
        },
        {
            "id": "14",
            "title": "Content Editors"
        }
    ]
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| id | [string](#string) | Y | user id |
| name | [string](#string) || user name/code/title |
| email | [string](#string) || user email |
| groups | [user_group[]](#user-group) || list of user groups |


## user_group

:::danger
@todo will be removed
:::

```json
{
    "id": "42",
    "title": "editors",
    "perms": [
        {
            "key": "articles",
            "value": "view"
        },
        {
            "key": "articles",
            "value": "edit"
        }
    ],
     "props": [
         {
             "key": "custom_prop_name",
             "value": "hello_world"
         }
     ],
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| id | [string](#string) | Y | group id |
| title | [string](#string) || group name/code/title |
| perms | [param[]](#param) || list of perms |
| props | [param[]](#param) || any additional custom props |

## cache_query

:::danger
@todo will be removed
:::

```json
{
    "type": "HIT",
    "group": "articles",
    "key": "octocats-in-space",
    "storage": "redis",
    "duration": 89,
    "ttl": 60000,
    "size": 1594,
    "called_from": {
        "file": "/src/Http/ArticlesController.php",
        "line": 68
    },
    "tags": ["articles", "home_page", "author:32", "category:14,12"]
}
```

::: tip ttl example
60000 = current time + 60 sec.
:::

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| type | [cache_type](#cache-type) | Y | cache IO record type |
| key | [string](#string) | Y | cache key |
| group | [string](#string) || cache group |
| event_dt | [ts_mili](#ts-mili) || cache exact start time |
| storage | [string](#string) || storage label, useful if you use several storage at once |
| duration | [duration_mili](#duration-mili) || cache save/load time duration |
| ttl | [duration_mili](#duration-mili) || cache time to live, relative to current time |
| size | [byte](#byte) || cache body size in bytes |
| called_from | [location](#location) || code location where this cache is called |
| tags | [string[]](#string) || list of cache tags |

## cache_type

ENUM extends [string](#string)

```json
"HIT"
```

#### Enum values
| key | description |
| --- | ----------- |
| HIT | Cache exist, data loaded from cache |
| MISS | Cache is not exist |
| WRITE | Create/Update data in cache |
| DELETE | Deleting data from cache |

`Total reads = (HIT + MISS)`

`Total writes = (WRITE + DELETE)`

`Total IO = (reads + writes)`

::: tip Server Tip
If you want to restore cache after MISS, you should add to cache
two records MISS + WRITE
:::

#### Server Example

```php
// pseudocode

function fetch(key: $name): return: CachedData
{
    if (Cache::keyExist(key: $name)) {
        $profiler->cacheIO(type: 'HIT', key: $name);
        return Cache::load(key: $name);
    }

    $profiler->cacheIO(type: 'MISS', key: $name);

    // load from backend and put data to cache

    $data = $backendApi->load(key: $name);
    Cache::save(key: $name, data: $data);
    $profiler->cacheIO(type: 'WRITE', key: $name);
}
```
