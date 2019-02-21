---
title: Events
lang: en-US
---

## Log

<event-definition type="log" :time=1547058563454 :defined_in=null :payload='[

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

:::warning
@todo
:::

## Middleware

:::warning
@todo
:::

## Access Check

:::warning
@todo
:::

## Query

:::warning
@todo
:::

## Email

:::warning
@todo
:::

## Template

:::warning
@todo
:::

## Response

:::warning
@todo
:::