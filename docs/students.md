# Students Endpoint

Create and read student data.

-   [GET `/api/students`](#get-apistudents)
-   [POST `/api/students`](#post-apistudents)

## GET `/api/students`

Retrieve a JSON list of all students, students in one grade level, or a single
student. 

### Request with no query

A request of this method to this endpoint will return a complete json list of all students.

### Request with name query

A request of this method to this endpoint with a valid query of `firstName` and `lastName` will return the json object of a single student. 

| query param | description                           | example value | required |
|-------------|---------------------------------------|---------------|----------|
| `firstName` | the first name of an existing student | John          | yes      |
| `lastName`  | the last name of an existing student  | Doe           | yes      |

### Request with grade query

| query param | description                        | example value | required |
|-------------|------------------------------------|---------------|----------|
| `gradeLvl`  | a grade level (9, 10, 11, or 12) | 9             | yes      |





## POST `/api/students`
