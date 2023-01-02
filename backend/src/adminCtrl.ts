const fs = require("fs");

const STUDENTS_DATA_FILE = "backend/data/students.json";
const EVENTS_DATA_FILE = "backend/data/events.json";

/**** Types ****/

interface Student {
    firstName: string,
    lastName: string,
    gradeLvl: 9 | 10 | 11 | 12,
    points: number
}

interface sEvent {
    name: string,
    points: number
}

type Result<T, E> = { ok: true; status: number; value: T } | { ok: false; status: number; value: E };

interface MessageObj {
    message: string
}

/**** Helper Functions ****/

// json
function readStudentsJson(): Student[] {
    return JSON.parse(fs.readFileSync(STUDENTS_DATA_FILE));
}
function readEventsJson(): sEvent[] {
    return JSON.parse(fs.readFileSync(EVENTS_DATA_FILE));
}
function writeStudentsJson(arr: Student[]) {
    fs.writeFileSync(STUDENTS_DATA_FILE, JSON.stringify(arr));
}
function writeEventJson(arr: sEvent[]) {
    fs.writeFileSync(EVENTS_DATA_FILE, JSON.stringify(arr));
}

// ok & err
function newOk<T>(status: number, value: T): Result<T, any> {
    return {
        ok: true,
        status: status,
        value: value
    }
}
function newErr<E>(status: number, value: E): Result<any, E> {
    return {
        ok: false,
        status: status,
        value: value
    }
}

// message obj
function newMessageObj(message: string): MessageObj {
    return {
        message: message
    }
}

/**** External Functionality ****/

module.exports = {
    getStudentsAll, 
    getStudentsByGrade, 
    getStudentByName, 
    getEventsAll, 
    getEventByName, 
    addStudent, 
    addEvent, 
    logActivity
};

function getStudentsAll(): Result<Student[], MessageObj> {
    return newOk(200, readStudentsJson());
}
function getStudentsByGrade(gradeLvl: string): Result<Student[], MessageObj> {
    const parsedGradeLvl = parseInt(gradeLvl);

    if (
        parsedGradeLvl !== 9 &&
        parsedGradeLvl !== 10 &&
        parsedGradeLvl !== 11 &&
        parsedGradeLvl !== 12
    ) {
        return newErr(
            400,
            newMessageObj(
                "gradeLvl must be of type 'number' and have the value 9, 10, 11, or 12"
            )
        );
    }

    const studentsInGrade = readStudentsJson().filter((studentObj) => {
        return studentObj.gradeLvl === parsedGradeLvl;
    });

    return newOk(200, studentsInGrade);
}
function getStudentByName(firstName: string, lastName: string): Result<Student, MessageObj> {
    const foundStudent = readStudentsJson().find((studentObj) => {
        return (
            studentObj.firstName === firstName &&
            studentObj.lastName === lastName
        );
    });

    if (!foundStudent) {
        return newErr(
            404, 
            newMessageObj(
                "a student with this name does not exist yet"
            )
        );
    }

    return newOk(200, foundStudent);
}

function getEventsAll(): Result<sEvent[], MessageObj> {
    return newOk(200, readEventsJson());
}
function getEventByName(name: string): Result<sEvent, MessageObj> {
    const foundEvent = readEventsJson().find((eventObj) => {
        return eventObj.name === name;
    });

    if (!foundEvent) {
        return newErr(
            404,
            newMessageObj("an event with this name does not exist yet")
        );
    }

    return newOk(200, foundEvent);
}

function addStudent(firstName: string, lastName: string, gradeLvl: string): Result<MessageObj, MessageObj> {
    const parsedGradeLvl = parseInt(gradeLvl);
    
    if (getStudentByName(firstName, lastName).ok) {
        return newErr(
            409,
            newMessageObj(
                "a student with this name already exists"
            )
        );
    }

    if (
        parsedGradeLvl !== 9 &&
        parsedGradeLvl !== 10 &&
        parsedGradeLvl !== 11 &&
        parsedGradeLvl !== 12
    ) {
        return newErr(
            400,
            newMessageObj(
                "gradeLvl must be of type 'number' and have the value 9, 10, 11, or 12"
            )
        );
    }

    const studentsJson = readStudentsJson();
    studentsJson.push({
        firstName: firstName,
        lastName: lastName,
        gradeLvl: parsedGradeLvl,
        points: 0,
    });
    writeStudentsJson(studentsJson);

    return newOk(
        201,
        newMessageObj(
            "new student created"
        )
    );
}
function addEvent(name: string, points: string): Result<MessageObj, MessageObj> {
    const parsedPoints = parseInt(points);

    if (typeof parsedPoints !== "number") {
        return newErr(
            400,
            newMessageObj(
                "gradeLvl must be of type 'number' and have the value 9, 10, 11, or 12"
            )
        );
    }
    
    if (getEventByName(name).ok) {
        return newErr(
            409, 
            newMessageObj(
                "an event with this name already exists"
            )
        );
    }

    const eventsJson = readEventsJson();
    eventsJson.push({
        name: name,
        points: parsedPoints,
    });

    return newOk(
        201,
        newMessageObj(
            "new event created"
        )
    );
}

function logActivity(studentFirstName: string, studentLastName: string, eventName: string): Result<MessageObj, MessageObj> {
    if (!getStudentByName(studentFirstName, studentLastName).ok) {
        return newErr(
            404,
            newMessageObj("a student with this name does not exist")
        )
    }

    let event = getEventByName(eventName);
    if (!event.ok) {
        return newErr(
            404,
            newMessageObj("an event with this name does not exist")
        );
    }

    const studentsJson = readStudentsJson();
    const student = studentsJson.find((studentObj) => {
        return (
            studentObj.firstName === studentFirstName,
            studentObj.lastName === studentLastName
        )
    });

    student!.points += event.value.points;
    writeStudentsJson(studentsJson);

    return newOk(
        200,
        newMessageObj(
            "activity logged sucessfully"
        )
    );
}
