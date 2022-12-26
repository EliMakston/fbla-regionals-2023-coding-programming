const tests = require("./api/tests.js");
const { AdminControl, Result, Ok, Err } = require("./api/adminControl.js");

const express = require("express");

// global vars
global.STUDENTS_DATA_FILE = "./api/data/students.json";
global.EVENTS_DATA_FILE = "./api/data/events.json";

// web application
const app = express();

// middleware
app.use(express.static("site/static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// control object
const adminCtrl = new AdminControl();

// students endpoints
app.get("/api/students", (req, res) => {
    console.log("recieved GET request to /api/students...");

    const queryKeys = Object.keys(req.query);

    // get query
    let gradeLvl = parseInt(req.query["gradeLvl"]);
    let firstName = req.query["firstName"];
    let lastName = req.query["lastName"];

    // return all
    if (queryKeys.length === 0) {
        console.log("  no query provided");

        const result = adminCtrl.getStudents();

        console.log("  200 OK \n");
        return res.status(200).send(result.value);
    }

    // return by gradeLvl
    if (queryKeys.length === 1 && queryKeys.indexOf("gradeLvl") !== -1) {
        console.log("  querying for 'gradeLvl = " + gradeLvl + "'");

        const result = adminCtrl.getStudentsByGrade(gradeLvl);

        if (!result.isOk) {
            console.log("  400 Bad Request \n");
            return res.status(400).send(result.value);
        }

        console.log("  200 OK \n");
        return res.status(200).send(result.value);
    }

    // return by name
    if (
        queryKeys.length === 2 &&
        queryKeys.indexOf("firstName") !== -1 &&
        queryKeys.indexOf("lastName") !== -1
    ) {
        console.log("  querying for 'firstName = " + firstName + "'");
        console.log("  querying for 'lastName = " + lastName + "'");

        const result = adminCtrl.getStudent(firstName, lastName);

        if (!result.isOk) {
            if (
                result.value.message ===
                "not found: a student with this name does not exist yet"
            ) {
                console.log("  404 Not Found \n");
                return res.status(404).send(result.value);
            }

            console.log("  400 Bad Request \n");
            return res.status(400).send(result.value);
        }

        console.log("  200 OK\n");
        return res.status(200).send(result.value);
    }

    // bad request
    console.log("  400 Bad Request\n");
    return res.status(400).send({
        message: "invalid query: check docs for help",
    });
});
app.post("/api/students", (req, res) => {
    console.log("recieved POST request to /api/students...");

    const result = adminCtrl.addStudent(
        req.body.firstName,
        req.body.lastName,
        req.body.gradeLvl
    );

    if (!result.isOk) {
        if (
            result.value.message ===
            "conflict: a student with this name already exists"
        ) {
            console.log("  409 Conflict\n");
            return res.status(409).send(result.value);
        }

        console.log("  400 Bad Request\n");
        return res.status(400).send(result.value);
    }

    console.log("  201 Created\n");
    return res.status(201).send(result.value);
});

// events endpoints
app.get("/api/events", (req, res) => {
    console.log("recieved GET request to /api/events...");

    const queryKeys = Object.keys(req.query);

    // get query
    const name = req.query["name"];

    // return all
    if (queryKeys.length === 0) {
        console.log("  no query provided");

        const result = adminCtrl.getEvents();

        console.log("  200 OK\n");
        return res.status(200).send(result.value);
    }

    // return by name
    if (queryKeys.length === 1 && queryKeys.indexOf("name") !== -1) {
        console.log("  querying for 'name = " + name + "'");

        const result = adminCtrl.getEvent(name);

        if (!result.isOk) {
            if (
                result.value.message ===
                "not found: an event with this name does not exist yet"
            ) {
                console.log("  404 Not Found\n");
                return res.status(404).send(result.value);
            }
            console.log("  400 Bad Request\n");
            return res.status(400).send(result.value);
        }

        console.log("  200 OK\n");
        return res.status(200).send(result.value);
    }

    // bad request
    console.log("  400 Bad Request\n");
    return res.status(400).send({
        message: "invalid query: check docs for help",
    });
});
app.post("/api/events", (req, res) => {
    console.log("recieved POST request to /api/events...");

    const result = adminCtrl.addEvent(req.body.name, req.body.points);

    if (!result.isOk) {
        if (
            result.value.message ===
            "conflict: an event with this name already exists"
        ) {
            console.log("  409 Conflict\n");
            return res.status(409).send(result.value);
        }

        console.log("  400 Bad Request\n");
        return res.status(400).send(result.value);
    }

    console.log("  201 Created\n");
    return res.status(201).send(result.value);
});

// logActivity endpoint
app.post("/api/logActivity", (req, res) => {
    console.log("recieved POST request to /api/logActivity...");

    const result = adminCtrl.logActivity(
        req.body.studentFirstName,
        req.body.studentLastName,
        req.body.eventName
    );

    if (!result.isOk) {
        if (
            result.value.message ===
                "not found: a student with this name does not exist yet" ||
            result.value.message ===
                "not found: an event with this name does not exist yet"
        ) {
            console.log("  404 Not Found\n");
            return res.status(404).send(result.value);
        }

        console.log("  400 Bad Request\n");
        return res.status(400).send(result.value);
    }

    console.log("  200 OK\n");
    return res.status(200).send(result.value);
});

// run server
app.listen(3000, () => {
    console.log(
        "server running... \n" +
            "  api   http://localhost:3000/api/ \n" +
            "  site  http://localhost:3000/ \n"
    );
});

// run test function
if (process.argv[2] === "test") {
    tests.test();
    process.exit();
}
