const json = require("./json.js");
const { Student, StudentsArr } = require("./students.js");
const { Event, EventsArr } = require("./events.js");

// message strings
const notFound = "not found";

class Result {
    #isOk;
    #value;

    get isOk() {
        return this.#isOk;
    }
    get value() {
        return this.#value;
    }

    constructor(isOk, value) {
        this.#isOk = isOk;
        this.#value = value;
    }
}
class Ok extends Result {
    constructor(value) {
        super(true, value);
    }
}
class Err extends Result {
    constructor(messageStr) {
        super(false, { message: messageStr });
    }
}

module.exports.AdminControl = class {
    constructor() {
        console.log("admin control object created\n");
    }

    getStudents() {
        return new Ok(json.readStudentsArrObj().toData());
    }
    getStudentsByGrade(gradeLvl) {
        // cleanse parameters
        gradeLvl = validateGradeLvl(gradeLvl);

        // catch validation errs
        if (!gradeLvl.isOk) {
            return gradeLvl;
        }

        // unwrap sucessful value
        gradeLvl = gradeLvl.value;

        // filter to grade
        const studentsArrData = json.readStudentsArrObj().toData();
        const studentsInGrade = studentsArrData.filter((studentData) => {
            return studentData.gradeLvl === gradeLvl;
        });

        // return filtered list
        return new Ok(studentsInGrade);
    }
    getStudent(firstName, lastName) {
        // cleanse parameters
        firstName = validateFirstName(firstName);
        lastName = validateLastName(lastName);

        // catch validation errs
        if (!firstName.isOk) {
            return firstName;
        }
        if (!lastName.isOk) {
            return lastName;
        }

        // unwrap values
        firstName = firstName.value;
        lastName = lastName.value;

        // filter array
        const studentsArrData = json.readStudentsArrObj().toData();
        const foundStudentData = studentsArrData.find((studentData) => {
            return (
                studentData.firstName === firstName &&
                studentData.lastName === lastName
            );
        });

        // check for result
        if (typeof foundStudentData === "undefined") {
            return new Err(
                "not found: a student with this name does not exist yet"
            );
        }

        return new Ok(foundStudentData);
    }

    getEvents() {
        return new Ok(json.readEventsArrObj().toData());
    }
    getEvent(name) {
        // cleanse parameters
        name = validateName(name);

        // catch validation errs
        if (!name.isOk) {
            return name;
        }

        // unwrap result
        name = name.value;

        const eventsArrData = json.readEventsArrObj().toData();
        const foundEventData = eventsArrData.find((eventData) => {
            return eventData.name === name;
        });

        // check for result
        if (typeof foundEventData === "undefined") {
            return new Err(
                "not found: an event with this name does not exist yet"
            );
        }

        return new Ok(foundEventData);
    }

    addStudent(firstName, lastName, gradeLvl) {
        // cleanse params
        firstName = validateFirstName(firstName);
        lastName = validateLastName(lastName);
        gradeLvl = validateGradeLvl(gradeLvl);

        // catch validation errs
        if (!firstName.isOk) {
            return firstName;
        }
        if (!lastName.isOk) {
            return lastName;
        }
        if (!gradeLvl.isOk) {
            return gradeLvl;
        }

        // unwrap values
        firstName = firstName.value;
        lastName = lastName.value;
        gradeLvl = gradeLvl.value;

        // check for existing student
        const existing = this.getStudent(firstName, lastName);
        if (existing.isOk) {
            return new Err("conflict: a student with this name already exists");
        }

        // create student
        const newStudent = new Student(firstName, lastName, gradeLvl, 0);

        // read & write data
        const studentsArrObj = json.readStudentsArrObj();
        studentsArrObj.push(newStudent);
        json.writeStudentsArrObj(studentsArrObj);

        return new Ok({
            message: "student added sucessfully",
        });
    }
    addEvent(name, points) {
        // cleanse params
        name = validateName(name);
        points = validatePoints(points);

        // catch validation errs
        if (!name.isOk) {
            return name;
        }
        if (!points.isOk) {
            return points;
        }

        // unwrap values
        name = name.value;
        points = points.value;

        // check for existing event
        const existing = this.getEvent(name);
        if (existing.isOk) {
            return new Err("conflict: an event with this name already exists");
        }

        // create event
        const newEvent = new Event(name, points);

        // read & write data
        const eventsArrObj = json.readEventsArrObj();
        eventsArrObj.push(newEvent);
        json.writeEventsArrObj(eventsArrObj);

        return new Ok({
            message: "event added sucessfully",
        });
    }

    logActivity(studentFirstName, studentLastName, eventName) {
        // cleanse parameters
        studentFirstName = validateStudentFirstName(studentFirstName);
        studentLastName = validateStudentLastName(studentLastName);
        eventName = validateEventName(eventName);

        // catch validation errs
        if (!studentFirstName.isOk) {
            return studentFirstName;
        }
        if (!studentLastName.isOk) {
            return studentLastName;
        }
        if (!eventName.isOk) {
            return eventName;
        }

        // unwrap values
        studentFirstName = studentFirstName.value;
        studentLastName = studentLastName.value;
        eventName = eventName.value;

        // check for existing
        const existingStudent = this.getStudent(
            studentFirstName,
            studentLastName
        );
        const existingEvent = this.getEvent(eventName);

        if (!existingStudent.isOk) {
            return existingStudent;
        }
        if (!existingEvent.isOk) {
            return existingEvent;
        }

        // read student data
        const studentsArrObj = json.readStudentsArrObj();

        // get & modify student
        const student = studentsArrObj.list.find((studentData) => {
            return (
                studentData.firstName === studentFirstName &&
                studentData.lastName === studentLastName
            );
        });
        const eventPts = this.getEvent(eventName).value.points;
        student.addPoints(eventPts);
        json.writeStudentsArrObj(studentsArrObj);

        return new Ok({
            message: "activity logged sucessfully",
        });
    }
};

// validator functions
function validateGradeLvl(gradeLvl) {
    if (
        gradeLvl !== 9 &&
        gradeLvl !== 10 &&
        gradeLvl !== 11 &&
        gradeLvl !== 12
    ) {
        return new Err(
            "invalid query: gradeLvl must be of type 'number' and have a value of 9, 10, 11, or 12"
        );
    }

    return new Ok(gradeLvl);
}

function validateFirstName(firstName) {
    if (typeof firstName !== "string") {
        return new Err("invalid query: firstName must be of type 'string'");
    }

    return new Ok(firstName);
}

function validateLastName(lastName) {
    if (typeof lastName !== "string") {
        return new Err("invalid query: lastName must be of type 'string'");
    }

    return new Ok(lastName);
}

function validateName(name) {
    if (typeof name !== "string") {
        return new Err("invalid query: name must be of type 'string'");
    }

    return new Ok(name);
}

function validatePoints(points) {
    if (typeof points !== "number") {
        return new Err("invalid query: points must be of type 'number'");
    }
    if (points <= 0) {
        return new Err("invalid query: points must be a value greater than 0");
    }

    return new Ok(points);
}

function validateStudentFirstName(studentFirstName) {
    if (typeof studentFirstName !== "string") {
        return new Err(
            "invalid query: studentFirstName must be of type 'string'"
        );
    }

    return new Ok(studentFirstName);
}

function validateStudentLastName(studentLastName) {
    if (typeof studentLastName !== "string") {
        return new Err(
            "invalid query: studentLastName must be of type 'string'"
        );
    }

    return new Ok(studentLastName);
}

function validateEventName(eventName) {
    if (typeof eventName !== "string") {
        return new Err("invalid query: eventName must be of type 'string'");
    }

    return new Ok(eventName);
}
