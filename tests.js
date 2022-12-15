const student = require('./students.js');
const json = require('./json.js');
const { Student, StudentsArr } = require('./students.js');
const { Event, EventsArr } = require('./events.js');

module.exports.test = () => {
    // create students & students array
    const student1 = new Student("Charlie", "Spring", 10);
    const student2 = new Student("Nick", "Nelson", 11);
    const student3 = new Student("Tori", "Spring", 11);
    const student4 = new Student("Elle", "Argent", 10);
    const student5 = new Student("Tara", "Jones ", 10);

    student1.addPoints(10);
    student2.addPoints(10);
    student3.addPoints(1);
    student4.addPoints(7);
    student5.addPoints(5);

    let students = new StudentsArr();
    students.push(student1);
    students.push(student2);
    students.push(student3);
    students.push(student4);
    students.push(student5);

    // create events
    const event1 = new Event("Rugby Home Game 1", 5);
    const event2 = new Event("Rugby Home Game 2", 5);
    const event3 = new Event("Band Concert", 10);
    const event4 = new Event("Movie Night", 5);
    const event5 = new Event("Homecoming Game", 15);

    let events = new EventsArr();
    events.push(event1);
    events.push(event2);
    events.push(event3);
    events.push(event4);
    events.push(event5);

    json.writeToJson(students, events);

    let [studentsFromJson, eventsFromJson] = json.readFromJson();

    // studentsFromJson.list.forEach((student, i) => {
    //     console.log("index " + i + ": {");
    //     console.log("  firstName: " + student.firstName + " | " + students.list[i].firstName);
    //     console.log("  lastName: " + student.lastName + " | " + students.list[i].lastName);
    //     console.log("  gradeLvl: " + student.gradeLvl + " | " + students.list[i].gradeLvl);
    //     console.log("  points: " + student.points + " | " + students.list[i].points);
    //     console.log("}");
    // });

    // eventsFromJson.list.forEach((event, i) => {
    //     console.log("index " + i + ": {");
    //     console.log("  name: " + event.name + " | " + events.list[i].name);
    //     console.log("  points: " + event.points + " | " + events.list[i].points);
    //     console.log("}");
    // });

}