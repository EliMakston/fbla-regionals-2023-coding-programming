const fs = require('fs');
const student = require('./students.js');

// assumes: 
//   json file is valid
// returns:
//   [array of student objects, array of event objects]
// warnings:
//   is syncronous
module.exports.readFromJson = () => {
    // get data from file
    let rawData = fs.readFileSync(DATA_FILE);
    let parsedData = JSON.parse(rawData);
    
    // create & return students arr
    return [student.parsedJsonToArr(parsedData.students), parsedData.events];
};

// assumes: 
//   json file is valid
//   arr is an array with student objects
// warnings:
//   is syncronous
//   overwrites all existing data
module.exports.writeToJson = (studentsArr, eventsArr) => {
    // parse arr as json
    let parsedData = {
        students: student.arrToParsedJson(studentsArr),
        events: eventsArr
    };
    let rawData = JSON.stringify(parsedData);

    // write to file
    fs.writeFileSync(DATA_FILE, rawData);
};
