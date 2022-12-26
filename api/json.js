const fs = require("fs");
const { StudentsArr } = require("./students.js");
const { EventsArr } = require("./events.js");

module.exports.readStudentsArrObj = () => {
    const rawData = fs.readFileSync(STUDENTS_DATA_FILE);
    const studentsArrData = JSON.parse(rawData);

    return StudentsArr.fromData(studentsArrData);
};
module.exports.readEventsArrObj = () => {
    const rawData = fs.readFileSync(EVENTS_DATA_FILE);
    const eventsArrData = JSON.parse(rawData);

    return EventsArr.fromData(eventsArrData);
};

module.exports.writeStudentsArrObj = (studentsArrObj) => {
    fs.writeFileSync(
        STUDENTS_DATA_FILE,
        JSON.stringify(studentsArrObj.toData())
    );
};
module.exports.writeEventsArrObj = (eventsArrObj) => {
    fs.writeFileSync(EVENTS_DATA_FILE, JSON.stringify(eventsArrObj.toData()));
};
