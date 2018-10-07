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
Below are the endpoints and the operations associated with them.
---

###### CRUD User
---
| Route | HTTP | Description | Input | Output |
| ------ | ------ | ------ | ------ | ------ |
| ````/api/register```` | POST | Create new user via manual register | [name], [email], [password] | User Detail
| ````/api/login```` | POST | Login user via manual login | [email], [password] | User Detail
| ````/api/google-signin```` | POST | Create new user or login via google | [google account] | User Detail
| ````/api/update```` | PUT | Update a user info | [id] [updated_parameter] | User Detail

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