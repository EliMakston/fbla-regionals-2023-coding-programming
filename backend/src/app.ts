/*
- not alerting on duplicate event POST req

- return created obj in successful post reqs? 
- standardize messages or create better message system
- take in all params as strings and parse and sort out errors here
- create global vars
- figure out res and req types
*/

// modules
const express = require("express");

const adminCtrl = require("./adminCtrl");

const PORT = 3000;

// create app obj
const app = express();

// middleware
app.use("/app", express.static("frontend/static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// students endpoint
app.get("/api/students", (req: any, res: any) => {
    console.log("recieved GET request to /api/students");

    const queryKeys = Object.keys(req.query);
    let gradeLvl = req.query["gradeLvl"];
    let firstName = req.query["firstName"];
    let lastName = req.query["lastName"];

    if (queryKeys.length === 0) {
        const result = adminCtrl.getStudentsAll();
        return res.status(result.status).send(result.value);
    }

    if (queryKeys.length === 1 && gradeLvl) {
        const result = adminCtrl.getStudentsByGrade(gradeLvl);
        return res.status(result.status).send(result.value);
    }

    if (queryKeys.length === 2 && firstName && lastName) {
        const result = adminCtrl.getStudentByName(firstName, lastName);
        return res.status(result.status).send(result.value);
    }

    return res.status(400).send({
        message: "invalid query: check docs for help"
    });
})
app.post("/api/students", (req: any, res: any) => {
    console.log("recieved POST request to /api/students");
    const result = adminCtrl.addStudent(
        req.body.firstName,
        req.body.lastName,
        req.body.gradeLvl
    );
    return res.status(result.status).send(result.value);
});

// events endpoint
app.get("/api/events", (req: any, res: any) => {
    console.log("recieved GET request to /api/events");

    const queryKeys = Object.keys(req.query);
    const name = req.query["name"];

    if (queryKeys.length === 0) {
        const result = adminCtrl.getEventsAll();
        return res.status(result.status).send(result.value);
    }

    if (queryKeys.length === 1 && name) {
        const result = adminCtrl.getEventByName(name);
        return res.status(result.status).send(result.value);
    }

    return res.status(400).send({
        message: "invalid query: check docs for help",
    });
});
app.post("/api/events", (req: any, res: any) => {
    console.log("recieved POST request to /api/events");
    const result = adminCtrl.addEvent(req.body.name, req.body.points);
    return res.status(result.status).send(result.value);
});

// logActivity endpoint
app.post("/api/logActivity", (req: any, res: any) => {
    console.log("recieved POST request to /api/logActivity");
    const result = adminCtrl.logActivity(
        req.body.studentFirstName,
        req.body.studentLastName,
        req.body.eventName
    );
    return res.status(result.status).send(result.value);
});

// listen for requests
app.listen(PORT, () => {
    console.log(
        "server running... \n" +
            `  api   http://localhost:${PORT}/api/ \n` +
            `  site  http://localhost:${PORT}/app/ \n`
    );
});
