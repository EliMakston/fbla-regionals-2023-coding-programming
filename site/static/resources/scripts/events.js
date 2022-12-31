// dom elements
const eventsTableDiv = document.querySelector("#events-table-div");

// replace the table with updated info
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
        location.href = "500.html";
        throw new Error(response.status);
    }

    // get events from response
    const events = await response.json();

    // create table
    const table = document.createElement("table");

    // creat header row
    const headerRow = document.createElement("tr");

    const hc1 = document.createElement("th");
    hc1.innerText = "Name";
    const hc2 = document.createElement("th");
    hc2.innerText = "Points";

    headerRow.append(hc1, hc2);
    table.append(headerRow);

    // create other rows
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
    eventsTableDiv.replaceChildren(table);
}

// run function
createElementsTable();
