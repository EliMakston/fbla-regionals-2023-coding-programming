const tests = require('./tests.js');
// const json = require('./json.js');
// const students = require('./students.js');

// global vars
global.DATA_FILE = "./data.json";

// run test function
if (process.argv[2] === "test") {
    tests.test();
    process.exit();
}
