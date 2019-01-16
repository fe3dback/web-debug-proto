---
title: Type "place"
lang: en-US
---

Allows you to specify the exact link to the position in the project code

Schema
======

| key | type | required | description |
| --- | ---- | :------: | ----------- |
| file | rel_path | Y | relative path to project root |
| line | int | N | line in file |
| pos | int | N | caret position in line (work only if "line" defined) |
| pos_end | int | N | caret end position in line (work only if "pos" defined) |

Example
=======

```json
{
   "file": "/src/renderer/main.js",
   "line": 123,
   "pos": 56
}
```
