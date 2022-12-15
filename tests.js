const student = require('./students.js');
const json = require('./json.js');
const { Student, StudentsArr } = require('./students.js');

module.exports.test = () => {
    // const student1 = new Student("Charlie", "Spring", 10);
    // const student2 = new Student("Nick", "Nelson", 11);
    // const student3 = new Student("Tori", "Spring", 11);
    // const student4 = new Student("Elle", "Argent", 10);
    // const student5 = new Student("Tara", "Jones ", 10);

    // student1.addPoints(10);
    // student2.addPoints(10);
    // student3.addPoints(1);
    // student4.addPoints(7);
    // student5.addPoints(5);

    // let students = new StudentsArr();
    // students.push(student1);
    // students.push(student2);
    // students.push(student3);
    // students.push(student4);
    // students.push(student5);

    // students.list.forEach(student => {
    //     console.log("{");
    //     console.log("  " + student.firstName);
    //     console.log("  " + student.lastName);
    //     console.log("  " + student.gradeLvl);
    //     console.log("  " + student.points);
    //     console.log("}");
    // });

    // json.writeToJson(students, {});

    let students2 = StudentsArr.fromParsedJson(json.readFromJson()[0]);

    students2.list.forEach(student => {
        console.log("{");
        console.log("  " + student.firstName);
        console.log("  " + student.lastName);
        console.log("  " + student.gradeLvl);
        console.log("  " + student.points);
        console.log("}");
    });


}