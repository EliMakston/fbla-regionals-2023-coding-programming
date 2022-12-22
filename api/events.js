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
    toData() {
        const parsedJsonArr = [];
        this.list.forEach((eventObj) => {
            let jsonObj = {
                name: eventObj.name,
                points: eventObj.points,
            };
            parsedJsonArr.push(jsonObj);
        });
        return parsedJsonArr;
    }

    // static methods
    static fromData(parsedJsonArr) {
        const eventsArr = new this();
        parsedJsonArr.forEach((jsonObj) => {
            let eventObj = new module.exports.Event(
                jsonObj.name,
                jsonObj.points
            );
            eventsArr.push(eventObj);
        });
        return eventsArr;
    }
};
