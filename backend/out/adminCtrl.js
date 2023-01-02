"use strict";
const fs = require("fs");
const STUDENTS_DATA_FILE = "backend/data/students.json";
const EVENTS_DATA_FILE = "backend/data/events.json";
/**** Helper Functions ****/
// json
function readStudentsJson() {
    return JSON.parse(fs.readFileSync(STUDENTS_DATA_FILE));
}
function readEventsJson() {
    return JSON.parse(fs.readFileSync(EVENTS_DATA_FILE));
}
function writeStudentsJson(arr) {
    fs.writeFileSync(STUDENTS_DATA_FILE, JSON.stringify(arr));
}
function writeEventJson(arr) {
    fs.writeFileSync(EVENTS_DATA_FILE, JSON.stringify(arr));
}
// ok & err
function newOk(status, value) {
    return {
        ok: true,
        status: status,
        value: value,
    };
}
function newErr(status, value) {
    return {
        ok: false,
        status: status,
        value: value,
    };
}
// message obj
function newMessageObj(message) {
    return {
        message: message,
    };
}
/**** External Functionality ****/
module.exports.getYep = () => {
    return 22;
};
module.exports.getStudentsAll = () => {
    return newOk(200, readStudentsJson());
};
module.exports.getStudentsByGrade = (gradeLvl) => {
    const parsedGradeLvl = parseInt(gradeLvl);
    if (parsedGradeLvl !== 9 &&
        parsedGradeLvl !== 10 &&
        parsedGradeLvl !== 11 &&
        parsedGradeLvl !== 12) {
        return newErr(400, newMessageObj("gradeLvl must be of type 'number' and have the value 9, 10, 11, or 12"));
    }
    const studentsInGrade = readStudentsJson().filter((studentObj) => {
        return studentObj.gradeLvl === parsedGradeLvl;
    });
    return newOk(200, studentsInGrade);
};
module.exports.getStudentByName = (firstName, lastName) => {
    const foundStudent = readStudentsJson().find((studentObj) => {
        return (studentObj.firstName === firstName &&
            studentObj.lastName === lastName);
    });
    if (!foundStudent) {
        return newErr(404, newMessageObj("a student with this name does not exist yet"));
    }
    return newOk(200, foundStudent);
};
module.exports.getEventsAll = () => {
    return newOk(200, readEventsJson());
};
module.exports.getEventByName = (name) => {
    const foundEvent = readEventsJson().find((eventObj) => {
        return eventObj.name === name;
    });
    if (!foundEvent) {
        return newErr(404, newMessageObj("an event with this name does not exist yet"));
    }
    return newOk(200, foundEvent);
};
module.exports.addStudent = (firstName, lastName, gradeLvl) => {
    const parsedGradeLvl = parseInt(gradeLvl);
    if (module.exports.getStudentByName(firstName, lastName).ok) {
        return newErr(409, newMessageObj("a student with this name already exists"));
    }
    if (parsedGradeLvl !== 9 &&
        parsedGradeLvl !== 10 &&
        parsedGradeLvl !== 11 &&
        parsedGradeLvl !== 12) {
        return newErr(400, newMessageObj("gradeLvl must be of type 'number' and have the value 9, 10, 11, or 12"));
    }
    const studentsJson = readStudentsJson();
    studentsJson.push({
        firstName: firstName,
        lastName: lastName,
        gradeLvl: parsedGradeLvl,
        points: 0,
    });
    writeStudentsJson(studentsJson);
    return newOk(201, newMessageObj("new student created"));
};
module.exports.addEvent = (name, points) => {
    const parsedPoints = parseInt(points);
    if (typeof parsedPoints !== "number") {
        return newErr(400, newMessageObj("gradeLvl must be of type 'number' and have the value 9, 10, 11, or 12"));
    }
    if (module.exports.getEventByName(name).ok) {
        return newErr(409, newMessageObj("an event with this name already exists"));
    }
    const eventsJson = readEventsJson();
    eventsJson.push({
        name: name,
        points: parsedPoints,
    });
    return newOk(201, newMessageObj("new event created"));
};
module.exports.logActivity = (studentFirstName, studentLastName, eventName) => {
    if (!module.exports.getStudentByName(studentFirstName, studentLastName).ok) {
        return newErr(404, newMessageObj("a student with this name does not exist"));
    }
    let event = module.exports.getEventByName(eventName);
    if (!event.ok) {
        return newErr(404, newMessageObj("an event with this name does not exist"));
    }
    const studentsJson = readStudentsJson();
    const student = studentsJson.find((studentObj) => {
        return (studentObj.firstName === studentFirstName,
            studentObj.lastName === studentLastName);
    });
    student.points += event.value.points;
    writeStudentsJson(studentsJson);
    return newOk(200, newMessageObj("activity logged sucessfully"));
};
