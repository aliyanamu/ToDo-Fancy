#ToDo-Fancy API Documentation
[Hana Aliyah M](https://github.com/aliyanamu/ToDo-Fancy)

---
## Overview
This documentation covers the Todo List web API.

---
#### Media Type support
All server response bodies and request bodies MUST be valid JSON Media Type messages.

---
## URLs and Operations
---
Below are the URLs and the operations associated with them.
---

###### CRUD Todo
---
| Route | HTTP | Description | Input | Output |
| ------ | ------ | ------ | ------ | ------ |
| ````/api/todos/list```` | GET | Get all the tasks | none | Task List
| ````/api/todos/list```` | POST | Create a task (user only) | [id], [title], [desc], [date] | Task List
| ````/api/todos/:id```` | POST | Delete a task (user only) | [id] | none
| ````/api/todos/:id```` | PUT | Update a task with new info (user only) | [id] [updated_parameter] | Task List

---