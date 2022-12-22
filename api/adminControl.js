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
        console.log("admin control object created");
    }

    getStudents() {
        return new Ok(json.readStudentsArrObj().toData());
    }
    getStudentsByGrade(gradeLvl) {
        // validate gradeLvl
        if (gradeLvl !== 9 && gradeLvl !== 10 && gradeLvl !== 11 && gradeLvl !== 12) {
            return new Err("invalid query: gradeLvl must be the numbers 9, 10, 11, or 12");
        }
        
        const studentsArrData = json.readStudentsArrObj().toData();
        const studentsInGrade = studentsArrData.filter((studentData) => {
            return studentData.gradeLvl === gradeLvl;
        });

        return new Ok(studentsInGrade);
    }
    getStudent(firstName, LastName) {
        
    }

    getEvents() {}
    getEvent(name) {}

    addStudent(firstName, lastName, gradeLvl) {}
    addEvent(name, points) {}

    logEvent(studentFirstName, studentLastName, eventName) {}

    // accessor methods
    // returns:
    //   a student object with matching first & last name or undefined
    getStudent(firstName, lastName) {
        return this.#studentsArr.list.find((studentObj) => {
            return (
                studentObj.firstName === firstName &&
                studentObj.lastName === lastName
            );
        });
    }
    // returns:
    //   an event object with matching name or undefined
    getEvent(name) {
        return this.#eventsArr.list.find((eventObj) => {
            return eventObj.name === name;
        });
    }
    generateReport() {}

    // modifier methods
    // returns:
    //   true if the student was added successfully, and false if there is an issue with the input
    addStudent(firstName, lastName, gradeLvl) {
        // check for existing student
        if (this.getStudent(firstName, lastName) !== undefined) {
            return false;
        }

        // check for valid grade level
        if (
            gradeLvl !== 9 &&
            gradeLvl !== 10 &&
            gradeLvl !== 11 &&
            gradeLvl !== 12
        ) {
            return false;
        }

        // create and add student
        const newStudent = new Student(firstName, lastName, gradeLvl, 0);
        this.#studentsArr.push(newStudent);

        // save file
        this.saveToJson();

        return true;
    }
    // returns:
    //   true if the event was added successfully, and false if there is an issue with the input
    addEvent(name, points) {
        // check for existing event
        if (this.getEvent(name) !== undefined) {
            return false;
        }

        // check for valid point value
        if (points < 0 || typeof points !== "number") {
            return false;
        }

        // create and add event
        const newEvent = new Event(name, points);
        this.#eventsArr.push(newEvent);

        // save file
        this.saveToJson();

        return true;
    }
    // returns:
    //   true if the points were logged successfully, and false if there is an issue with the input
    logEvent(studentFirstName, studentLastName, eventName) {
        const student = this.getStudent(studentFirstName, studentLastName);
        const event = this.getEvent(eventName);
        if (student === undefined || event === undefined) {
            return false;
        }

        // add points
        student.addPoints(event.points);

        // save file
        this.saveToJson();

        return true;
    }

    // development helpers
    printStudents() {
        console.log("[");
        this.#studentsArr.list.forEach((studentObj) => {
            console.log("  {");
            console.log("    firstName: " + studentObj.firstName);
            console.log("    lastName: " + studentObj.lastName);
            console.log("    gradeLvl: " + studentObj.gradeLvl);
            console.log("    points: " + studentObj.points);
            console.log("  },");
        });
        console.log("]");
    }
    printEvents() {
        console.log("[");
        this.#eventsArr.list.forEach((eventObj) => {
            console.log("  {");
            console.log("    name: " + eventObj.name);
            console.log("    points: " + eventObj.points);
            console.log("  },");
        });
        console.log("]");
    }

    // helper functions
    saveToJson() {
        json.writeToJson(this.#studentsArr, this.#eventsArr);
    }
};
