// const student = require('./students.js');
// const json = require('./json.js');
// const { Student, StudentsArr } = require('./students.js');
// const { Event, EventsArr } = require('./events.js');
const { AdminControl } = require("./adminControl.js");

module.exports.test = () => {
    // create an instance of admin control
    const adminCtrl = new AdminControl();
    adminCtrl.printStudents();
    adminCtrl.printEvents();
    console.log(adminCtrl.logEvent("Charlie", "Spring", "Rugby Home Game 1"));
    adminCtrl.printStudents();
};
