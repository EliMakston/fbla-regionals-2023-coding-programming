
// assumes:
//   all the parameters are provided and not undefined
//   firstName: string
//   lastName: string 
//   gradeLvl: number (integers 9, 10, 11, or 12)
// returns:
//   student object
function newStudent(firstName, lastName, gradeLvl) {   
    return {
        // private attributes
        _firstName: firstName,
        _lastName: lastName,
        _gradeLvl: gradeLvl,
        _points: 0,

        // getters
        getFirstName() {
            return this._firstName;
        },
        getLastName() {
            return this._lastName;
        },
        getGradeLvl() {
            return this._gradeLvl;
        },
        getPoints() {
            return this._points;
        },

        // setters
        addPoints(pts) {
            this._points += pts;
        }
    }
}

// assumes: 
//   filename parameter points to a valid json file s
// returns:
//   array of student objects
function readFromJSON(filename) {
}

function writeToJSON(filename) {

}



const my_student = newStudent("Mack", "Rusing", 11);

console.log(my_student.getFirstName());
console.log(my_student.getLastName());
console.log(my_student.getGradeLvl());
console.log(my_student.getPoints());
