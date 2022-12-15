const student = require('./students.js');
const json = require('./json.js');

module.exports.test = () => {
    const my_student = student.create("Mack", "Rusing", 11);

    const student1 = student.create("Charlie", "Spring", 10);
    const student2 = student.create("Nick", "Nelson", 11);
    const student3 = student.create("Tori", "Spring", 11);
    const student4 = student.create("Elle", "Argent", 10);
    const student5 = student.create("Tara", "Jones ", 10);

    student1.addPoints(10);
    student2.addPoints(10);
    student3.addPoints(1);
    student4.addPoints(7);
    student5.addPoints(5);

    let students = [
        student1,
        student2,
        student3,
        student4,
        student5,
    ];

    console.log(students);
    json.writeToJson(students);

    let students2 = json.readFromJson();
    console.log(students2);

    // console.log(my_student.getFirstName());
    // console.log(my_student.getLastName());
    // console.log(my_student.getGradeLvl());
    // console.log(my_student.getPoints());
}