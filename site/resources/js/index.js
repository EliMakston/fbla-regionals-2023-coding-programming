// elements
const addStudentForm = document.querySelector("#addStudentForm");
const addEventForm = document.querySelector("#addEventForm");
const logEventForm = document.querySelector("#logEventForm");

const addStudentResult = document.querySelector("#addStudentResult");
const addEventResult = document.querySelector("#addEventResult");
const logEventResult = document.querySelector("#logEventResult");

const studentTable = document.querySelector("#studentTable");

// listeners
addStudentForm.addEventListener("submit", submitAddStudent);
addEventForm.addEventListener("submit", submitAddEvent);
logEventForm.addEventListener("submit", submitLogEvent);

// callback functions
async function submitAddStudent(event) {
    event.preventDefault();

    // collect submitted info
    const formData = Object.fromEntries(new FormData(event.target).entries());
    formData.gradeLvl = parseInt(formData.gradeLvl);

    // create a request to api
    const response = await fetch("/api/addStudent", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    // check for error
    if (!response.ok) {
        // provide feedback
        addStudentResult.innerHTML = "there was a conflict with your submission";
        
        // throw error
        throw new Error(response.status);
    }

    // provide feedback
    addStudentResult.innerHTML =
        formData.firstName +
        " " +
        formData.lastName +
        " (grade " +
        formData.gradeLvl +
        ") was added succesfully";
}
async function submitAddEvent(event) {
    event.preventDefault();

    // collect submitted info
    const formData = Object.fromEntries(new FormData(event.target).entries());
    formData.points = parseInt(formData.points);

    // create a request to api
    const response = await fetch("/api/addEvent", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    // check for error
    if (!response.ok) {
        // provide feedback
        addEventResult.innerHTML = "there was a conflict with your submission";
        
        // throw error
        throw new Error(response.status);
    }

    // provide feedback
    addEventResult.innerHTML =
        formData.name +
        " (" +
        formData.points +
        " points) was added succesfully";
}
async function submitLogEvent(event) {
    event.preventDefault();

    // collect submitted info
    const formData = Object.fromEntries(new FormData(event.target).entries());

    // create a request to api
    const response = await fetch("/api/logEvent", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    // check for error
    if (!response.ok) {
        // provide feedback
        logEventResult.innerHTML = "there was a conflict with your submission";

        // throw error
        throw new Error(response.status);
    }

    // provide feedback
    logEventResult.innerHTML =
        formData.studentFirstName +
        " " +
        formData.studentLastName +
        " succesfully completed " +
        formData.eventName;
}

// helper functions
// returns: 
//   a table element
async function createStudentTable() {

    // create a request to api
    const response = await fetch("/api/students", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // check for error
    if (!response.ok) {
        // throw error
        throw new Error(response.status);
    }

    // get students from response
    const students = await response.json();
    
    // sort into grades
    const grade9 = students.filter((studentObj) => {
        return studentObj.gradeLvl === 9;
    });
    grade9.sort((a, b) => {
        return b.points - a.points;
    });

    const grade10 = students.filter((studentObj) => {
        return studentObj.gradeLvl === 10;
    });
    grade10.sort((a, b) => {
        return b.points - a.points;
    });

    const grade11 = students.filter((studentObj) => {
        return studentObj.gradeLvl === 11;
    });
    grade11.sort((a, b) => {
        return b.points - a.points;
    });
    
    const grade12 = students.filter((studentObj) => {
        return studentObj.gradeLvl === 12;
    });
    grade12.sort((a, b) => {
        return b.points - a.points;
    });

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    
    const r1c1 = document.createElement("th");
    r1c1.innerText = "Last Name";
    const r1c2 = document.createElement("th");
    r1c2.innerText = "First Name";
    const r1c3 = document.createElement("th");
    r1c3.innerText = "Points";
    const r1c4 = document.createElement("th");
    r1c4.innerText = "Grade";

    headerRow.append(r1c1, r1c2, r1c3);
    table.append(headerRow);

    grade9.forEach((studentObj) => {
        const row = document.createElement("tr");
        const c1 = document.createElement("td");
        c1.innerText = studentObj.lastName;
        const c2 = document.createElement("td");
        c2.innerText = studentObj.firstName;
        const c3 = document.createElement("td");
        c3.innerText = studentObj.points;
        const c4 = document.createElement("td");
        c4.innerText = studentObj.gradeLvl;
        row.append(c1, c2, c3, c4);
        table.append(row);
    });
    grade10.forEach((studentObj) => {
        const row = document.createElement("tr");
        const c1 = document.createElement("td");
        c1.innerText = studentObj.lastName;
        const c2 = document.createElement("td");
        c2.innerText = studentObj.firstName;
        const c3 = document.createElement("td");
        c3.innerText = studentObj.points;
        const c4 = document.createElement("td");
        c4.innerText = studentObj.gradeLvl;
        row.append(c1, c2, c3, c4);
        table.append(row);
    });
    grade11.forEach((studentObj) => {
        const row = document.createElement("tr");
        const c1 = document.createElement("td");
        c1.innerText = studentObj.lastName;
        const c2 = document.createElement("td");
        c2.innerText = studentObj.firstName;
        const c3 = document.createElement("td");
        c3.innerText = studentObj.points;
        const c4 = document.createElement("td");
        c4.innerText = studentObj.gradeLvl;
        row.append(c1, c2, c3, c4);
        table.append(row);
    });
    grade12.forEach((studentObj) => {
        const row = document.createElement("tr");
        const c1 = document.createElement("td");
        c1.innerText = studentObj.lastName;
        const c2 = document.createElement("td");
        c2.innerText = studentObj.firstName;
        const c3 = document.createElement("td");
        c3.innerText = studentObj.points;
        const c4 = document.createElement("td");
        c4.innerText = studentObj.gradeLvl;
        row.append(c1, c2, c3, c4);
        table.append(row);
    });

    // return table;
    studentTable.replaceChildren(table);
}

createStudentTable();

// studentTable.replaceChildren(createStudentTable());
