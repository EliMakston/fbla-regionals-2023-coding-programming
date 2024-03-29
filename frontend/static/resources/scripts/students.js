// update table info
const studentsTableDiv = document.querySelector("#students-table-div");
async function createStudentsTable() {
    // create requests to api
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
        location.href = "500.html";
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

    const hc1 = document.createElement("th");
    hc1.innerText = "First Name";
    const hc2 = document.createElement("th");
    hc2.innerText = "Last Name";
    const hc3 = document.createElement("th");
    hc3.innerText = "Points";
    const hc4 = document.createElement("th");
    hc4.innerText = "Grade";

    headerRow.append(hc1, hc2, hc3, hc4);
    table.append(headerRow);

    grade9.forEach((studentObj) => {
        const row = document.createElement("tr");
        row.setAttribute("class", "grade-9");

        const c1 = document.createElement("td");
        c1.innerText = studentObj.firstName;
        const c2 = document.createElement("td");
        c2.innerText = studentObj.lastName;
        const c3 = document.createElement("td");
        c3.innerText = studentObj.points;
        const c4 = document.createElement("td");
        c4.innerText = studentObj.gradeLvl;

        row.append(c1, c2, c3, c4);
        table.append(row);
    });
    grade10.forEach((studentObj) => {
        const row = document.createElement("tr");
        row.setAttribute("class", "grade-10");

        const c1 = document.createElement("td");
        c1.innerText = studentObj.firstName;
        const c2 = document.createElement("td");
        c2.innerText = studentObj.lastName;
        const c3 = document.createElement("td");
        c3.innerText = studentObj.points;
        const c4 = document.createElement("td");
        c4.innerText = studentObj.gradeLvl;

        row.append(c1, c2, c3, c4);
        table.append(row);
    });
    grade11.forEach((studentObj) => {
        const row = document.createElement("tr");
        row.setAttribute("class", "grade-11");

        const c1 = document.createElement("td");
        c1.innerText = studentObj.firstName;
        const c2 = document.createElement("td");
        c2.innerText = studentObj.lastName;
        const c3 = document.createElement("td");
        c3.innerText = studentObj.points;
        const c4 = document.createElement("td");
        c4.innerText = studentObj.gradeLvl;

        row.append(c1, c2, c3, c4);
        table.append(row);
    });
    grade12.forEach((studentObj) => {
        const row = document.createElement("tr");
        row.setAttribute("class", "grade-12");

        const c1 = document.createElement("td");
        c1.innerText = studentObj.firstName;
        const c2 = document.createElement("td");
        c2.innerText = studentObj.lastName;
        const c3 = document.createElement("td");
        c3.innerText = studentObj.points;
        const c4 = document.createElement("td");
        c4.innerText = studentObj.gradeLvl;

        row.append(c1, c2, c3, c4);
        table.append(row);
    });

    // update element
    studentsTableDiv.replaceChildren(table);
    await markPointLeader();
}

// pick winner
const pickWinnerButton = document.querySelector(".pick-winners");
pickWinnerButton.addEventListener("click", pickWinner);

async function pickWinner() {
    // separate rows
    const grade9Rows = studentsTableDiv.querySelectorAll("table .grade-9");
    const grade10Rows = studentsTableDiv.querySelectorAll("table .grade-10");
    const grade11Rows = studentsTableDiv.querySelectorAll("table .grade-11");
    const grade12Rows = studentsTableDiv.querySelectorAll("table .grade-12");

    // remove any previous winners
    grade9Rows.forEach((row) => {
        row.classList.remove("winner");
    });
    grade10Rows.forEach((row) => {
        row.classList.remove("winner");
    });
    grade11Rows.forEach((row) => {
        row.classList.remove("winner");
    });
    grade12Rows.forEach((row) => {
        row.classList.remove("winner");
    });

    // get winners
    const grade9Winner =
        grade9Rows[Math.floor(Math.random() * grade9Rows.length)];
    const grade10Winner =
        grade10Rows[Math.floor(Math.random() * grade10Rows.length)];
    const grade11Winner =
        grade11Rows[Math.floor(Math.random() * grade11Rows.length)];
    const grade12Winner =
        grade12Rows[Math.floor(Math.random() * grade12Rows.length)];

    grade9Winner.classList.add("winner");
    grade10Winner.classList.add("winner");
    grade11Winner.classList.add("winner");
    grade12Winner.classList.add("winner");
}

// find student with most points
async function markPointLeader() {
    const children = studentsTableDiv.firstChild.childNodes;
    let currentLeader;
    children.forEach((row) => {
        rowPoints = row.childNodes[2].innerText;

        if (rowPoints === "Points") {
            return;
        }

        if (
            !currentLeader ||
            parseInt(rowPoints) >
                parseInt(currentLeader.childNodes[2].innerText)
        ) {
            currentLeader = row;
        }
    });
    currentLeader.classList.add("point-leader");
}

// run function
createStudentsTable();
