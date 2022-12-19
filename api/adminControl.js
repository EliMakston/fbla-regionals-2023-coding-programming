const json = require("./json.js");
const { Student, StudentsArr } = require("./students.js");
const { Event, EventsArr } = require("./events.js");

module.exports.AdminControl = class {
    // private fields
    #studentsArr;
    #eventsArr;

    // constructor
    // assumes:
    //   json file & its data exists and is valid (dont mess w the json file!)
    constructor() {
        [this.#studentsArr, this.#eventsArr] = json.readFromJson();
    }

    // basic getter methods (maybe remove after development)
    get studentsArr() {
        return this.#studentsArr;
    }
    get eventsArr() {
        return this.#eventsArr;
    }

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
