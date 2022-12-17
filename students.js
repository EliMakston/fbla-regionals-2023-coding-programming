module.exports.Student = class {
    // private fields
    #firstName;
    #lastName;
    #gradeLvl;
    #points;
    
    // constructor
    // assumes:
    //   all the parameters are provided and not undefined
    //   firstName: string
    //   lastName: string 
    //   gradeLvl: number (integers 9, 10, 11, or 12)
    constructor(firstName, lastName, gradeLvl, points) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#gradeLvl = gradeLvl;
        this.#points = points;
    }

    // getters
    get firstName() {
        return this.#firstName;
    }
    get lastName() {
        return this.#lastName;
    }
    get gradeLvl() {
        return this.#gradeLvl;
    }
    get points() {
        return this.#points;
    }

    // modifiers
    // assumes:
    //   pts is a number (int) and is positive
    addPoints(pts) {
        this.#points += pts;
    }
}

module.exports.StudentsArr = class {
    // private fields
    #list;
    
    // constructor
    constructor() {
        this.#list = [];
    }

    // getters
    get list() {
        return this.#list;
    }

    // modifier methods
    push(student) {
        this.#list.push(student);
    }

    // helper methods
    toParsedJson() {
        const parsedJsonArr = [];
        this.list.forEach(studentObj => {
            let jsonObj = {
                firstName: studentObj.firstName,
                lastName: studentObj.lastName,
                gradeLvl: studentObj.gradeLvl,
                points: studentObj.points
            };
            parsedJsonArr.push(jsonObj);
        });
        return parsedJsonArr;
    }

    // special static 
    static fromParsedJson(parsedJsonArr) {
        const studentsArr = new this();
        parsedJsonArr.forEach(jsonObj => {
            let student = new module.exports.Student(jsonObj.firstName, jsonObj.lastName, jsonObj.gradeLvl, jsonObj.points);
            studentsArr.push(student);
        });
        return studentsArr;
    }
}
