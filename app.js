const tests = require("./api/tests.js");
const express = require("express");
const { AdminControl } = require("./api/adminControl.js");
// const json = require('./json.js');
// const students = require('./students.js');

// global vars
global.DATA_FILE = "./data/data.json";

// web application
const app = express();

// middleware
app.use(express.static("site"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// control object
const adminCtrl = new AdminControl();

// post reqs
app.post("/api/addStudent", (req, res) => {
    const { firstName, lastName, gradeLvl } = req.body;

    // try to add a new student
    const result = adminCtrl.addStudent(firstName, lastName, gradeLvl);

    // return an error if student addition fails
    if (result === false) {
        return res.status(409).send({ message: "problem with input" });
    }

    // return successfully
    return res.status(200).send({
        message: "student added",
    });
});
app.post("/api/addEvent", (req, res) => {
    const { name, points } = req.body;

    // try to add event
    const result = adminCtrl.addEvent(name, points);

    // return error if addition fails
    if (result === false) {
        return res.status(409).send({ message: "problem with input" });
    }

    // return successfully
    return res.status(200).send({
        message: "event added",
    });
});
app.post("/api/logEvent", (req, res) => {
    const { studentFirstName, studentLastName, eventName } = req.body;

    // try to log event
    const result = adminCtrl.logEvent(studentFirstName, studentLastName, eventName);

    // return error if log fails
    if (result === false) {
        return res.status(409).send({ message: "problem with input" });
    }

    // return successfully
    return res.status(200).send({
        message: "event logged"
    });
});

// get reqs
app.get("/api/students", (req, res) => {
    res.status(200).send(adminCtrl.studentsArr.toParsedJson());
});
app.get("/api/events", (req, res) => {
    res.status(200).send(adminCtrl.eventsArr.toParsedJson());
});

// run server
app.listen(3000, () => {
    console.log("listening on port 3000");
});

// run test function
if (process.argv[2] === "test") {
    tests.test();
    process.exit();
}
