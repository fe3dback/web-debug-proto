---
title: Scheme Types
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

## model

JSON: object

Complex object with strong typed
structure.

```json
{
    "propName": "propValue",
    "someInt": 1234,
    "someString": "Hello world"
}
```

## guid

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
- *or custom*

```json
"POST"
```

## uri

extends [string](#string)

Read more about uri in
[wiki](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)

```json
"https://example.com:443/api/hello?foo=bar"
```

## rel_path

extends [string](#string)

```json
"/src/renderer/main.js"
```

#### Model rules (for server)

- Should be relative to root project directory
- file path SHOULD start with "/"
- Directory separator SHOULD BE "/" on all operation systems

#### Model rules (for client)

- Replace "/" with directory separator for current operation system.
"/" - for unix based, and "\\" - for Windows.
- Client SHOULD contain "project root" setting. This "project root"
SHOULD be used only for file content loading (for code display purpose).
- All GUI sections should display only relative path as defined.

## place

extends [model](#model)

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
| line | [int](#int) | N | line in file |
| pos | [int](#int) | N | cursor position in line (work only if "line" defined) |
| pos_end | [int](#int) | N | cursor end position in line (work only if "pos" defined) |

#### Model rules (for server)

- Always use "/" as directory separator in all operation systems

#### Model rules (for client)

- Replace "/" with default separator for current operation system.
"/" - for unix based, and "\\" - for Windows.
- Prepend defined project root path to "rel_path"
- Load file in Read-only mode and fetch +-3 lines from specified "line"
- If no "line" specified, you should display only path to file
- Do not display absolute path with project root, only relative.
- Highlight all "line", if no "pos" specified
- Highlight all "line" and add "cursor" if only "line" and "pos" specified
- If "pos" and "pos_end" specified, client application MUST highlight
range between pos <= i && i <= pos_end.

#### Model recommendations (for client)

- Add button "load more" above and below loaded lines.
- Use syntax highlighting based on file extension (without lint)

## param

extends [model](#model)

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

extends [model](#model)

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
| name | [string](#string) | N | user name/code/title |
| email | [string](#string) | N | user email |
| groups | [user_group[]](#user-group) | N | list of user groups |


## user_group

extends [model](#model)

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
| title | [string](#string) | N | group name/code/title |
| perms | [param[]](#param) | N | list of perms |
| props | [param[]](#param) | N | any additional custom props |


## db_query

extends [model](#model)

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
| db_type | [string](#string) || database type (mysql, postgres, etc..), useful only if application use many databased at once |
| duration | [duration_mili](#duration-mili) || db request duration in milliseconds |
| bindings | [param[]](#param) || ORM binding |
| called_from | [place](#place) || code place where this query is called |
| props | [param[]](#param) || any additional custom props |

#### Model recommendations (for server)

- If you want syntax highlighting, define "db_type" as one of:
    - mysql
    - postgres

#### Model recommendations (for client)

- Try to highlight sql code in mysql dialect from "db_type":
    - mysql
    - postgres
