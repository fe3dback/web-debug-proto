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
    },

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

## Income Request

<event-definition type="income_request" :defined_in=null :payload='[

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
    },

]' />


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

## Access Check

:::warning
@todo
:::

## Query

:::warning
@todo
:::

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

## Template

:::warning
@todo
:::

## Response

:::warning
@todo
:::
