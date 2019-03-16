---
title: Scheme
lang: en-US
---

## JSON

Scheme should be described in JSON

You can read more about JSON here:
[rfc7151 JSON](https://tools.ietf.org/html/rfc7159)

## Scheme definition

<type-definition title_payload="" title_preview="" :payload='[

    {
        key: "id",
        type: "uuid",
        required: true,
        description: "unique request id (uuid)",
        example: "\"ef95a542-25a3-4f71-a0e9-640c92f43813\""
    },

    {
        key: "version",
        type: "int",
        required: true,
        description: "scheme version",
        example: "1"
    },

    {
        key: "events",
        type: "Event[]",
        required: true,
        description: "debug/profile information about request",
        example: "[]",
        url: "/docs/scheme/#event-definition"
    },

]' />

<note title="Note">

- Scheme is sort of logs (events) list with context (payload).
- Scheme can by recursive (Tree structure)
- Events in scheme will be sorted from oldest to newest

</note>

### Event definition

<type-definition title_payload="" :payload='[

    {
        key: "type",
        type: "event_type",
        required: true,
        description: "event type define object properties of `payload`",
        example: "\"log\"",
        url: "/docs/scheme/#event-type-definition"
    },

    {
        key: "payload",
        type: "object",
        required: true,
        description: "event details (context). Available properties depend on event type",
        example: "{}"
    },

    {
        key: "tags",
        type: "tag[]",
        required: false,
        description: "used for filtering in client",
        example: "[\"db:mysql\",\"server:php_03\",\"is_production\"]"
    },

    {
        key: "importance",
        type: "importance",
        required: false,
        description: "used for filtering in client",
        example: "4"
    },

    {
        key: "time",
        type: "ts_mili",
        required: false,
        description: "event timestamp in ms",
        example: "1547058563454"
    },

    {
        key: "duration",
        type: "duration_mili",
        required: false,
        description: "event duration in ms",
        example: "15"
    },

    {
        key: "success",
        type: "bool",
        required: false,
        description: "false in case of error / alarm. Will be highlighted in client",
        example: "true"
    },

    {
        key: "called_from",
        type: "location",
        required: false,
        description: "code location, where this event is called from (ex. controller where template is being rendered)",
        example: "<@type-location"
    },

    {
        key: "defined_in",
        type: "location",
        required: false,
        description: "where code defined in (ex. path to template file)",
        example: "<@type-location"
    },

    {
        key: "nested",
        type: "Event[]",
        required: false,
        description: "contains other nested Events",
        example: "[]",
        url: "/docs/scheme/#event-definition"
    },

]' />

### Event-Type definition

This is known list of event types, but you can use any own types

| type | event description |
| --- | ----------- |
| [log](events.html#log) | application logs |
| [query](events.html#query) | database queries during request |
| [request](events.html#request) | request received event, payload contain all request props (method, uri, cookies, params, etc..) |
| [response](events.html#template) | response event before output, payload contain response properties (status code, total duration, etc..) |
| [middleware](events.html#middleware) | middleware triggered event |
| [template](events.html#template) | rendered templates |
| [email](events.html#email) | sent email events |
| [event](events.html#event) | executed code events or hooks |
| [access_check](events.html#access-check) | checked permissions and auth during request |

### Example of scheme tree

:::warning
@todo redraw this
:::

```text

                                    .---------------------------.
                 .---------------.  |          payload          |
                 |     Event     |  |---------------------------|
                 |---------------|  | event details (context),  |
  .-----------.  | * type        |  | available properties      |
  |  Scheme   |  | * payload     |  | depend on type            |
  |-----------|  | - tags        |  '---------------------------'
  | [ Event ] |  | - time        |                ^
  | [ Event ] |->| - duration    |----------------------------.
  | [ .. ]    |  | - importance  |         v                  |
  | [ Event ] |  | - success     |  .------------.            |
  '-----------'  | - called_from |  |    type    |            |
        ^        | - defined_in  |  |------------|            |
        #        | - nested      |  | log        |            |
        #        '---------------'  | query      |            |
        #                           | email      |            v
        #                           | template   |     .------------.
        #                           | middleware |     |   nested   |
        #                           | ..         |     |------------|
        #                           | CUSTOM     |     | *recursion |
        #                           '------------'     '------------'
        #                                                     #
        <######################################################

```

### Example of scheme

<<< @/examples/scheme_v1.json

## todo (refactor this)

:::warning
this is old stuff, please ignore all below
:::


| key | type | required | description |
| --- | ---- | -------- | ----------- |
| route | [route](types.html#route) || matched route controller |
| memory_peak | [byte](types.html#byte) || max/peak memory usage (in bytes) during request |
| user | [user](types.html#user) || current auth user |
| acl | [access_check[]](types.html#access-check) || checked permissions and auth during request |
| db_queries | [db_query[]](types.html#db-query) || database queries during request |
| cache_queries | [cache_query[]](types.html#cache-query) || cache queries during request |
| templates | [template[]](types.html#template) || rendered templates |
| events | [event[]](types.html#event) || triggered events |
| response_at | [ts_mili](types.html#ts-mili) || response generated at |
| response_code | [int](types.html#int) || response HTTP code |


#### Future fields proposal for next version

| key | type | required | description |
| --- | ---- | -------- | ----------- |
| timeline | @todo || profile date for waterfall, all executed code methods with duration |
| async_requests | @todo || not blocking HTTP request (also support debug) |
| sub_requests | @todo || nested, blocking HTTP request (also support debug) |
| custom | @todo || custom tables, view, widgets.. |
