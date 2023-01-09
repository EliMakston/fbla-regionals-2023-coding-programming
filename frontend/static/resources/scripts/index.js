// elements
const addStudentForm = document.querySelector("#addStudentForm");
const addEventForm = document.querySelector("#addEventForm");
const logEventForm = document.querySelector("#logEventForm");

const addStudentResult = document.querySelector("#addStudentResult");
const addEventResult = document.querySelector("#addEventResult");
const logEventResult = document.querySelector("#logEventResult");

const studentsTable = document.querySelector("#studentsTable");
const eventsTable = document.querySelector("#eventsTable");

// listeners
addStudentForm.addEventListener("submit", submitAddStudent);
addEventForm.addEventListener("submit", submitAddEvent);
logEventForm.addEventListener("submit", submitLogEvent);

// current data
let currentStudents;
// let current9Students;
// let current10Students;
// let current11Students;
// let current12students;

let currentEvents;

// callback functions
async function submitAddStudent(event) {
    event.preventDefault();

    // collect submitted info
    const formData = Object.fromEntries(new FormData(event.target).entries());
    formData.gradeLvl = parseInt(formData.gradeLvl);

    // create a request to api
    const response = await fetch("/api/students", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    // check for error
    if (!response.ok) {
        // provide feedback
        addStudentResult.innerText = "a student with this name already exists";

        // throw error
        throw new Error(response.status);
    }

    // provide feedback
    addStudentResult.innerText =
        formData.firstName +
        " " +
        formData.lastName +
        " (grade " +
        formData.gradeLvl +
        ") was added succesfully";

    // update page
    updatePage();
}
async function submitAddEvent(event) {
    event.preventDefault();

    // collect submitted info
    const formData = Object.fromEntries(new FormData(event.target).entries());
    formData.points = parseInt(formData.points);

    // create a request to api
    const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    // check for error
    if (!response.ok) {
        // provide feedback
        addEventResult.innerText = "an event with this name already exists";

        // throw error
        throw new Error(response.status);
    }

    // provide feedback
    addEventResult.innerText =
        formData.name +
        " (" +
        formData.points +
        " points) was added succesfully";

    // update page
    updatePage();
}
async function submitLogEvent(event) {
    event.preventDefault();

    // collect submitted info
    const formData = Object.fromEntries(new FormData(event.target).entries());

    let studentIndex = formData["student-dropdown"];
    let eventIndex = formData["event-dropdown"];

    const reqObj = {
        studentFirstName: currentStudents[studentIndex].firstName,
        studentLastName: currentStudents[studentIndex].lastName,
        eventName: currentEvents[eventIndex].name,
    };

    // create a request to api
    const response = await fetch("/api/logActivity", {
        method: "POST",
        body: JSON.stringify(reqObj),
        headers: {
            "Content-Type": "application/json",
        },
    });

    // check for error
    if (!response.ok) {
        // provide feedback
        logEventResult.innerText = "there was a conflict with your submission";

        // throw error
        throw new Error(response.status);
    }

    // provide feedback
    logEventResult.innerText =
        reqObj.studentFirstName +
        " " +
        reqObj.studentLastName +
        " succesfully completed " +
        reqObj.eventName;

    // update page
    updatePage();
}

// helper functions
// returns:
//   a table element
async function createStudentsTable() {
    // create a request to api
    const urlBase = "/api/students?";
    const url9 = urlBase + new URLSearchParams({ gradeLvl: 9 });
    const url10 = urlBase + new URLSearchParams({ gradeLvl: 10 });
    const url11 = urlBase + new URLSearchParams({ gradeLvl: 11 });
    const url12 = urlBase + new URLSearchParams({ gradeLvl: 12 });

    const response9 = await fetch(url9, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const response10 = await fetch(url10, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const response11 = await fetch(url11, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const response12 = await fetch(url12, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // check for error
    if (!response9.ok || !response10.ok || !response11.ok || !response12.ok) {
        // throw error
        throw new Error("problem w/ get req");
    }

    // get students from response
    const grade9 = await response9.json();
    grade9.sort((a, b) => {
        return b.points - a.points;
    });
    const grade10 = await response10.json();
    grade10.sort((a, b) => {
        return b.points - a.points;
    });
    const grade11 = await response11.json();
    grade11.sort((a, b) => {
        return b.points - a.points;
    });
    const grade12 = await response12.json();
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

    headerRow.append(r1c1, r1c2, r1c3, r1c4);
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
    studentsTable.replaceChildren(table);
}

async function createElementsTable() {
    // create a request to api
    const response = await fetch("/api/events", {
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
    const events = await response.json();

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const r1c1 = document.createElement("th");
    r1c1.innerText = "Name";
    const r1c2 = document.createElement("th");
    r1c2.innerText = "Points";

    headerRow.append(r1c1, r1c2);
    table.append(headerRow);

    events.forEach((eventObj) => {
        const row = document.createElement("tr");
        const c1 = document.createElement("td");
        c1.innerText = eventObj.name;
        const c2 = document.createElement("td");
        c2.innerText = eventObj.points;
        row.append(c1, c2);
        table.append(row);
    });

    // return table;
    eventsTable.replaceChildren(table);
}

const studentDropdown = document.querySelector("#student-dropdown");
const eventDropdown = document.querySelector("#event-dropdown");

async function createDropdowns() {
    // student dropdown
    while (studentDropdown.firstChild) {
        studentDropdown.removeChild(studentDropdown.firstChild);
    }

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
    currentStudents = students;

    students.forEach((studentObj, i) => {
        const newOption = document.createElement("option");
        newOption.setAttribute("value", i);
        newOption.innerText = studentObj.firstName + " " + studentObj.lastName;
        studentDropdown.append(newOption);
    });

    ///////////
    while (eventDropdown.firstChild) {
        eventDropdown.removeChild(eventDropdown.firstChild);
    }

    // create a request to api
    const response2 = await fetch("/api/events", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // check for error
    if (!response2.ok) {
        // throw error
        throw new Error(response2.status);
    }

    // get students from response
    const events = await response2.json();
    currentEvents = events;

    events.forEach((eventObj, i) => {
        const newOption = document.createElement("option");
        newOption.setAttribute("value", i);
        newOption.innerText = eventObj.name;
        eventDropdown.append(newOption);
    });
}

// page updater
//   should be run every time a form is successfully submited / on page load
async function updatePage() {
    // createStudentsTable();
    // createElementsTable();
    createDropdowns();
}

updatePage();

// studentTable.replaceChildren(createStudentTable());
