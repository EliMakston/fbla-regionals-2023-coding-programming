# SHS Activity Tracker API

## Endpoints Overview

|                  | GET | POST | PUT | PATCH | DELETE |
| ---------------- | --- | ---- | --- | ----- | ------ |
| /api/students    | ✓   | ✓    | ✗   | ✗     | ✗      |
| /api/events      | ✓   | ✓    | ✗   | ✗     | ✗      |
| /api/logActivity | ✗   | ✓    | ✗   | ✗     | ✗      |

## Full Documentation

-   [`/api/students`](./students.md)
    -   POST: add student to list
    -   GET: retieve a list of students or a single student
-   [`/api/events`](./events.md)
    -   POST: add event to list
    -   GET: retireve a list of events or a single event
-   [`/api/logActivity`](./logActivity.md)
    -   POST: log an activity for a specific student
