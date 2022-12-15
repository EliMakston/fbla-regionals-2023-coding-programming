module.exports.Student = class {
    // constructor
    // assumes:
    //   all the parameters are provided and not undefined
    //   firstName: string
    //   lastName: string 
    //   gradeLvl: number (integers 9, 10, 11, or 12)
    constructor(firstName, lastName, gradeLvl) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#gradeLvl = gradeLvl;
        this.#points = 0;
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

    // helpers
    // assumes:
    //   pts is a number (int) and is positive
    addPoints(pts) {
        this.#points += pts;
    }

}

module.exports.StudentsArr = class {
    
}

















// assumes:
//   all the parameters are provided and not undefined
//   firstName: string
//   lastName: string 
//   gradeLvl: number (integers 9, 10, 11, or 12)
// returns:
//   student object
module.exports.create = (firstName, lastName, gradeLvl) => {   
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

        // helper methods
        addPoints(pts) {
            this._points += pts;
        }
    }
};

// assumes:
//   arr is an arry of student objects
// returns:
//   an array holding the vital that can then be parsed into json
module.exports.arrToParsedJson = (arr) => {
    const newArr = [];
    arr.forEach(studentObj => {
        let newObj = {
            firstName: studentObj.getFirstName(),
            lastName: studentObj.getLastName(),
            gradeLvl: studentObj.getGradeLvl(),
            points: studentObj.getPoints()
        };
        newArr.push(newObj);
    })
    return newArr;
};

// assumes:
//   dataArr is a parsed json array that contains data for student objects
// returns: 
//   an array of student objects
module.exports.parsedJsonToArr = (dataArr) => {
    const newArr = [];
    dataArr.forEach(dataObj => {
        let newObj = this.create(dataObj.firstName, dataObj.lastName, dataObj.gradeLvl);
        newObj.addPoints(dataObj.points);
        newArr.push(newObj);
    });
    return newArr;
};
