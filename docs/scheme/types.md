---
title: Types
lang: en-US
---

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

```json
{
   "file": "/src/renderer/main.js",
   "line": 123,
   "pos": 56
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| file | [rel_path](#rel-path) | Y | relative path to project root |
| line | [int](#int) || line in file |
| pos | [int](#int) || cursor position in line (work only if "line" defined) |
| pos_end | [int](#int) || cursor end position in line (work only if "pos" defined) |

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

```json
{
    "key": "title",
    "value": "hello world"
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| key | [string](#string) | Y | param title/code/name |
| value | [string](#string) | Y | param value |


## user

```json
{
    "id": "12345",
    "name": "admin",
    "email": "admin@example.com"
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

## db_query

```json
{
    "db_type": "mysql",
    "query": "SELECT * FROM articles WHERE ID = ?id",
    "parsed": "SELECT * FROM articles WHERE ID = 1;",
    "duration": 15,
    "bindings": [
        {
            "key": "id",
            "value": "2"
        }
    ],
    "called_from": {
        "file": "/src/renderer/main.js",
        "line": 123
    },
    "props": [
        {
            "key": "model",
            "value": "\App\Database\Models\Article.php"
        },
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
| query | [string](#string) | Y | query as defined in code |
| parsed | [string](#string) || parsed query |
| event_dt | [ts_mili](#ts-mili) || query exact start time |
| db_type | [string](#string) || database type (mysql, postgres, etc..), useful only if application use many databased at once |
| duration | [duration_mili](#duration-mili) || db request duration in milliseconds |
| bindings | [param[]](#param) || ORM binding |
| called_from | [location](#location) || code location where this query is called |
| props | [param[]](#param) || any additional custom props |

#### Server recommendations

- If you want syntax highlighting, define "db_type" as one of:
    - mysql
    - postgres

#### Client recommendations

- Try to highlight sql code in mysql dialect from "db_type":
    - mysql
    - postgres

## cache_query

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

## log

```json
{
    "level": "warning",
    "message": "User X is logged in admin panel",
    "group": "php:app_03",
    "context": "{\"user_id\": 12345}",
    "called_from": {
        "file": "/src/Http/ArticlesController.php",
        "line": 68
    },
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| level | [log_level](#log-level) | Y | log level |
| message | [string](#string) | Y | full log text |
| group | [string](#string) || group title, for example server name, instance id, user ip, component, etc..  |
| context | [string](#string) || additional log context, should be free-form json in string |
| event_dt | [ts_mili](#ts-mili) || exact log time |
| called_from | [location](#location) || code location where this logged |

#### Server recommendations

- DO NOT add date-time to message prefix. For example "`[14:12:20] Hello world`".

#### Client rules

- Use different colors for different log levels, for example red for "errors", blue for "info", etc..
- Display log context in read-only text field

#### Client recommendations

- Highlight context field as JSON
- Hide context by default and show only after user click on log
- Show context string length near log, if length > 0
- Hide log event_dt by default

## log_level

ENUM extends [string](#string)

```json
"warning"
```

#### Enum values
| key | description |
| --- | ----------- |
| debug | Detailed debug information |
| info | Interesting events. Examples: User logs in |
| notice | Normal but significant events |
| warning | Exceptional occurrences that are not errors. Examples: Use of deprecated APIs, poor use of an API, undesirable things that are not necessarily wrong |
| error | Runtime errors that do not require immediate action but should typically be logged and monitored |
| critical | Critical conditions. Example: Application component unavailable, unexpected exception |
| alert | Action must be taken immediately. Example: Entire website down, database unavailable, etc. This should trigger the SMS alerts and wake you up |
| emergency | Emergency: system is unusable |

[read more in rfc5424](https://tools.ietf.org/html/rfc5424)

## email

```json
{
    "subject": "Welcome to our forum",
    "body": "<h1>Hello John</h1> <p>Now you are member of our great C++ community!</p>",
    "from": "welcome@example.com",
    "to": "john_doe@example.com",
    "reply_to": "contact@forum.example.com"
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| subject | [string](#string) | Y | mail subject (title) |
| body | [html](#html) | Y | email content (html or plain text) |
| from | [string](#string) | Y | sender email address |
| to | [string[]](#string) | Y | to email addresses |
| cc | [string[]](#string) || [CC](https://en.wikipedia.org/wiki/Carbon_copy) addresses |
| bcc | [string[]](#string) || [BCC](https://en.wikipedia.org/wiki/Blind_carbon_copy) addresses |
| reply_to | [string](#string) || reply-to target email address |
| attachments | [string[]](#string) || list of attachment file names (without actual content) |
| event_dt | [ts_mili](#ts-mili) || mail sending start time |
| called_from | [location](#location) || where email is sent from |

#### Client recommendations

- Use editor with html syntax highlight for body
- If possible add preview mode for body with rendered html

## route

```json
{
    "name": "admin_articles_edit",
    "resource": "App\Http\Admin\ArticlesController@edit",
    "name_space": "/admin",
    "url_template": "/articles/edit/{{id}}",
    "allowed_methods": ["GET", "PATCH", "DELETE"],
    "type": "controller",
    "resource_loc": {
        "file": "/src/App/Http/Admin/ArticlesController.php",
        "line": 120
    },
    "defined_in": {
        "file": "/resources/routes/admin/articles.yaml",
        "line": 86
    }
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| url_template | [string](#string) | Y | Url template with placeholders |
| name | [string](#string) || Unique route name (id) |
| resource | [string](#string) || route target, this can be controller, action or view name |
| resource_loc | [location](#location) || where is target resource located |
| name_space | [string](#string) || Namespace or group, usually this is prefix |
| allowed_methods | [method[]](#method) || list of allowed request methods for this route |
| type | [string](#string) || helpful if you have many route types (api based, controllers, callbacks, views, etc..) |
| defined_in | [location](#location) || where is this route defined |

## middleware

```json
{
    "name": "\Illuminate\Routing\Middleware\ThrottleRequests",
    "group": "System",
    "duration": 16,
    "defined_in": {
        "file": "/vendor/illuminate/src/Routing/Middleware/ThrottleRequests.php"
    },
    "called_from": {
        "file": "/app/Http/Kernel.php",
        "line": 75
    },
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| name | [string](#string) | Y | Middleware name |
| group | [string](#string) || Helpful if you have lot of middleware (validation, auth, fetch, etc..) |
| duration | [duration_mili](#duration-mili) || middleware execute duration |
| defined_in | [location](#location) || where is this middleware defined |
| called_from | [location](#location) || where was middleware called |

## template

```json
{
    "name": "alert-telegram-prod",
    "render_time": 2,
    "params": [
        {
            "key": "title",
            "value": "Oh, something is wrong!"
        },
        {
            "key": "level",
            "value": "warning"
        }
    ],
    "defined_in": {
        "file": "/resources/templates/alerts/alert-telegram-prod.twig"
    },
    "called_from": {
        "file": "/app/Libs/Telegram/APIWrapper.php",
        "line": 142
    },
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| name | [string](#string) | Y | Template name |
| render_time | [duration_mili](#duration-mili) || template render duration |
| params | [param[]](#param) || params given to template |
| defined_in | [location](#location) || where is this template file stored |
| called_from | [location](#location) || where was template called |

## event

```json
{
    "name": "ConsoleHandler::onCommand",
    "group": "kernel",
    "duration": 3,
    "defined_in": {
        "file": "/vendor/Symfony/Bridge/src/Monolog/Handler/ConsoleHandler.php"
    },
    "called_from": {
        "file": "/app/Http/Kernel.php",
        "line": 75
    },
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| name | [string](#string) | Y | Called event name (listener class, id, etc..) |
| group | [string](#string) || Helpful if you want split event by logic groups (kernel, loader, app, etc..) |
| duration | [duration_mili](#duration-mili) || Event execute duration |
| defined_in | [location](#location) || where is this event defined |
| called_from | [location](#location) || where was event called |

## access_check

```json
{
    "request": "authrorizedUser",
    "control": "post:42",
    "action": "view",
    "vote": "GRANT",
    "group": "ui",
    "checked_in": {
        "file": "/src/Controller/PostController.php",
        "line": 15
    }
}
```

#### Model definition
| key | type | required | description |
| --- | ---- | :------: | ----------- |
| request | [string](#string) | Y | Access Request Object (username, api token, etc..) |
| control | [string](#string) || Access Control Object (article, admin panel, secure page, etc..) |
| action | [string](#string) || Access eXtension Object (read, edit, delete, etc..) |
| vote | [acl_vote](#acl-vote) | Y | ACL Resolution (allow, denied) |
| group | [string](#string) || Helpful if you want split access checks by logic groups (db, ui, user, api, etc..) |
| checked_in | [location](#location) || where this access is checked |

Abstract ACL check.

:::tip example (voters)
If you use voters, define each vote as acl, for example:
```php
$this->denyAccessUnlessGranted('view', $post);
```
```json
{
    "request": "authrorizedUser",
    "control": "post:42",
    "action": "view",
    "vote": "GRANT"
}
```
:::

:::tip classic ACL tables
```text{4}
Root
|- Staff            ( ALLOW [View Own - Projects], ALLOW [Add - Projects], ALLOW [Edit Own - Projects] )
|  |- Facilitators  ( DENY  [Add - Projects] )
|  |- Managers      ( ALLOW [Edit - Projects] )
|  '- Executives    ( ALLOW [Edit - Projects], ALLOW [Delete - Projects] )
```

```json
{
    "request": "Managers",
    "control": "Projects",
    "action": "Edit",
    "vote": "ALLOW"
}
```
:::

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
