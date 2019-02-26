---
title: Scheme
lang: en-US
---

## JSON

Scheme should be described in JSON

You can read more about JSON here:
[rfc7151 JSON](https://tools.ietf.org/html/rfc7159)

## Scheme definition

- `Scheme` = `id` + `version` + `Event[]`
- `id` = unique request id (uuid)
- `version` = scheme version (unsigned int)
- each `Event` is object
- each `Event` has `type`, `payload` and other not required [properties](#event-properties)
- `Event` `payload` object scheme depend on `Event` `type`
- `Event` `type` is enum, but can by any custom type. `client` will display `payload` as raw json if type is not known
- `Event` can contains nested `Scheme` with another `events`

:::tip example of minimal scheme markup
<<< @/examples/scheme_definition.json
:::

<note title="Note">

- Scheme is sort of logs (events) list with context (payload).
- Scheme can by recursive (Tree structure)
- Events in scheme will be sorted from oldest to newest

</note>

### Event properties
| name | type | required | description |
| ---- | ---- | -------- | ----------- |
| type | [Event types](#event-types) | Y | event type define object properties of `payload` |
| payload | object | Y | event details (context), available properties depend on `type` |
| tags | [tag[]](types.html#tag) | | tags used for filtering events in `client` |
| importance | [importance](types.html#importance) | | used for filtering in `client` |
| time | [ts_mili](types.html#ts-mili) | | event timestamp in ms |
| duration | [duration_mili](types.html#duration-mili) | | event duration in ms |
| success | [bool](types.html#bool) | | `false` in case of error / alarm. Will be highlighted in `client` |
| called_from | [location](types.html#location) | | code location, where this event is called from (ex. where template is rendered) |
| defined_in | [location](types.html#location) | | code location, where this event is called from (ex. where template is rendered) |
| nested | [`Scheme`](#scheme-definition) | | recursion to `Scheme`. Can contains other nested `Events` |

### Event types

This is known list of event types, but you can use any own types

| type | event description |
| --- | ----------- |
| [log](events.html#log) | application logs |
| [income_request](events.html#income-request) | request received event, payload contain all request props (method, uri, cookies, params, etc..) |
| [middleware](events.html#middleware) | middleware triggered event |
| [access_check](events.html#access-check) | checked permissions and auth during request |
| [query](events.html#query) | database, io, cache queries during request |
| [email](events.html#email) | sent email events |
| [template](events.html#template) | rendered templates |
| [response](events.html#template) | response event before output, payload contain response properties (status code, total duration, etc..) |

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
