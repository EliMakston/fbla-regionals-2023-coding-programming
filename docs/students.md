# `/api/students` endpoint

Create and read student data.

-   [GET `/api/students`]()
-   [POST `/api/students`]()

## GET `/api/students`

Retrieve a JSON list of all students, students in one grade level, or a single
student.

### Parameters

| query param | description                                                   | type   | example value | required |
| ----------- | ------------------------------------------------------------- | ------ | ------------- | -------- |
| `firstName` | select user by name (must be combined with `lastName` param)  | string | `John`        | no       |
| `lastName`  | select user by name (must be combined with `firstName` param) | string | `Doe`         | no       |
| `gradeLvl`  | select users by grade level                                   | number | `11`          | no       |

## POST `/api/students`
