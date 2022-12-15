module.exports.Event = class {
    // private fields
    #name;
    #points;

    // constructor
    // assumes:
    //   name is a string
    //   points is a positve integer (number)
    constructor(name, points) {
        this.#name = name;
        this.#points = points;
    }

    // getters
    get name() {
        return this.#name;
    }
    get points() {
        return this.#points;
    }
};

module.exports.EventsArr = class {
    // private fields
    #list;

    // constructor
    constructor() {
        this.#list = [];
    }

    // getter
    get list() {
        return this.#list;
    }

    // modifier methods
    push(event) {
        this.#list.push(event);
    }

    // helper methods
    toParsedJson() {
        const parsedJsonArr = [];
        this.#list.forEach(eventObj => {
            let newObj = {
                name: eventObj.name,
                points: eventObj.points
            };
            parsedJsonArr.push(newObj);
        });
        return parsedJsonArr;
    }

    // static methods
    static fromParsedJson(parsedJsonArr) {
        const newArr = new this();
        parsedJsonArr.forEach(jsonObj => {
            let newEvent = new module.exports.Event(jsonObj.name, jsonObj.points);
            newArr.push(newEvent);
        });
        return newArr;
    }
}