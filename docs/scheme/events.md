---
title: Events
lang: en-US
---

## Log

<event-definition type="log" :defined_in=null :payload='[

    {
        key: "message",
        type: "string",
        required: true,
        description: "full log text",
        example: "\"User X is logged in admin panel\""
    },

    {
        key: "context",
        type: "string",
        required: false,
        description: "additional log context, should be free-form json in string",
        example: "\"{\\\"user_id\\\": 12345}\""
    }

]' />

#### Server recommendations

- DO NOT add date-time to message prefix. For example "`[14:12:20] Hello world`".

#### Client rules

- Use different colors for different log levels, for example red for "errors", blue for "info", etc..
- Display log context in read-only text field
- Truncate context to max 4096 symbols

#### Client recommendations

- Highlight context field as JSON
- Hide context by default and show only after user click on log


#### importance map table (mapped level to int)

property `importance` can by `int` `[from 1 to 8]`, so you need to map `log levels` to event `importance`

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


## Query


<event-definition type="query" :payload='[

    {
        key: "target",
        type: "string",
        required: true,
        description: "query target, for example db, io, cache or service name (mysql, influxdb, redis, rabbitmq, etc..). Used in client for group all request to same service",
        example: [
            "\"mysql\"",
            "\"mongodb\""
        ]
    },

    {
        key: "query",
        type: "string",
        required: true,
        description: "request query string",
        example: [
            "\"SELECT * FROM articles WHERE ID = 2;\"",
            "\"{ status: \\\"A\\\", qty: { $lt: 30 } }\""
        ]
    },

    {
        key: "syntax",
        type: "string",
        required: false,
        description: "syntax for query highlight in client",
        example: [
            "\"sql\"",
            "\"json\""
        ],
        enum_values: ["sql", "json", "xml", "text"]
    }

]' />

#### Client rules
- Display total execution duration/count for all queries by each `target`. For example:
    - target `mysql` 7 requests, total 210 ms.
    - target `redis` 12 requests, total 64 ms.

#### Client recommendations

- Highlight `query` by file type defined in `syntax` field. If field `syntax` is not set, do not highlight query.
- hide full query under cut, if length of `query` field is >= 512 chars

## Request

<event-definition type="request" :defined_in=null :payload='[

    {
        key: "method",
        type: "method",
        required: false,
        description: "request HTTP method",
        example: "\"POST\""
    },

    {
        key: "uri",
        type: "uri",
        required: false,
        description: "full request uri",
        example: "\"/api/hello?foo=bar\""
    },

    {
        key: "headers",
        type: "param[]",
        required: false,
        description: "list of received request headers",
        example: "[{\"key\": \"accept\", \"value\": \"text/html\"}, {\"key\": \"cache-control\", \"value\": \"no-cache\"}]"
    },

    {
        key: "query",
        type: "param[]",
        required: false,
        description: "list of received request query (GET) params",
        example: "[{\"key\": \"foo\", \"value\": \"bar\"}]"
    },

    {
        key: "body",
        type: "param[]",
        required: false,
        description: "list of received request body (POST) params",
        example: "[{\"key\": \"foo\", \"value\": \"bar\"}]"
    },

    {
        key: "cookies",
        type: "param[]",
        required: false,
        description: "list of received request cookies",
        example: "[{\"key\": \"PHPSESS\", \"value\": \"l6q632qbzua97o3p2p71biefbkrijbil\"}, {\"key\": \"_ym_uid\", \"value\": \"15356948596\"}]"
    },

    {
        key: "session",
        type: "param[]",
        required: false,
        description: "loaded session params",
        example: "[{\"key\": \"userid\", \"value\": 21114}, {\"key\": \"views_count\", \"value\": 23}]"
    }

]' />

## Response

:::warning
@todo
:::

## Middleware

<event-definition type="middleware" :payload='[

    {
        key: "name",
        type: "string",
        required: true,
        description: "Middleware name",
        example: "\"\\\\Illuminate\\\\Routing\\\\Middleware\\\\ThrottleRequests\""
    }

]' />

## Template

<event-definition type="template" :payload='[

    {
        key: "name",
        type: "string",
        required: true,
        description: "executed/rendered template name",
        example: "\"/resources/templates/header.twig\""
    }

]' />

## Email

<event-definition type="email" :payload='[

    {
        key: "subject",
        type: "string",
        required: true,
        description: "mail subject (title)",
        example: "\"Welcome to our forum\""
    },

    {
        key: "body",
        type: "html",
        required: true,
        description: "email content (html or plain text)",
        example: "\"&lt;h1&gt;Hello John&lt;/h1&gt; &lt;p&gt;Now you are member of our great C++ community!&lt;/p&gt;\""
    },

    {
        key: "from",
        type: "string",
        required: true,
        description: "sender email address",
        example: "\"no-reply@example.com\""
    },

    {
        key: "to",
        type: "string[]",
        required: true,
        description: "to email addresses",
        example: "[\"john_doe@example.com\", \"admin@example.com\"]"
    },

    {
        key: "cc",
        type: "string[]",
        required: false,
        description: "CC addresses",
        example: "[\"john_doe@example.com\", \"admin@example.com\"]"
    },

    {
        key: "bcc",
        type: "string[]",
        required: false,
        description: "BCC addresses",
        example: "[\"john_doe@example.com\", \"admin@example.com\"]"
    },

    {
        key: "reply_to",
        type: "string",
        required: false,
        description: "reply-to target email address",
        example: "\"contact@forum.example.com\""
    },

    {
        key: "attachments",
        type: "string[]",
        required: false,
        description: "list of attachment file names (without actual content)",
        example: "[\"payment-info.pdf\"]"
    }

]' />

#### Client recommendations

- Use editor with html syntax highlight for body
- If possible add preview mode for body with rendered html

## Event

<event-definition type="event" :payload='[

    {
        key: "name",
        type: "string",
        required: true,
        description: "Called event name (listener class, id, etc..)",
        example: "\"ConsoleHandler::onCommand\""
    },

    {
        key: "group",
        type: "string",
        required: false,
        description: "Helpful if you want split event by logic groups (kernel, loader, app, etc..)",
        example: "\"kernel\""
    }

]' />

## Access Check

Access checking based on ACO (Access control objects) or ACL (access control list).

<event-definition type="access_check" :payload='[

    {
        key: "access",
        type: "acl_vote",
        required: true,
        description: "result of checking permission (GRANT/DENIED)",
        example: "\"GRANT\""
    },
    
    {
        key: "control",
        type: "string",
        required: false,
        description: "name of object with restricted access",
        example: "\"Engines\""
    },
    
    {
        key: "object",
        type: "string",
        required: false,
        description: "name of requester object (who want get restricted access)",
        example: "\"R2-D2\""
    },
    
    {
        key: "action",
        type: "string",
        required: false,
        description: "name of required action",
        example: "\"publish\""
    },

]' />

#### For example:

Who/Where | Cockpit | Lounge | Guns | Engines
--------- | ------- | ------ | ---- | -------
Han | Y | Y | Y | Y
Chewie | Y | Y | Y | 
Obi-wan |  | Y |  | 
Luke | | Y | | 
R2-D2 | | | | Y
C3PO | | Y | | 

can `R2-D2` access to `Cockpit`?
```json
{
  "access": "DENIED",
  "control": "Cockpit",
  "object": "R2-D2"
}
```

can `R2-D2` access to `Lounge`?
```json
{
  "access": "GRANT",
  "control": "Engines",
  "object": "R2-D2"
}
```

can `user admin` access to `publish` object `article helloWorld`?
```json
{
  "access": "GRANT",
  "control": "article:helloWorld",
  "object": "user:admin",
  "action": "publish"
}
```

#### How to use this with votes system

You can add votes mapped by access (GRANT = vote up, DENIED = vote down),

Final result of voting can be added with higher importance