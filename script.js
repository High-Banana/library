const myLibrary = [];
const addNewBookButton = document.querySelector(".add-book-button");
const closeFormButton = document.querySelector(".close-form-button");
const fieldSet = document.querySelector("fieldset");
const buttonSection = document.querySelector(".button-section");
const bookTitleElement = document.getElementById("book_name");
const authorNameElement = document.getElementById("author_name");
const pageElement = document.getElementById("pages");
const bookStatusElement = document.getElementsByName("status");
const tableContainer = document.querySelector(".table-container");
const submitButton = document.querySelector(".submit-button");
let bookTitle;
let authorName;
let NumOfPage;
let bookStatus;
let libraryAction = "";
const header = ["Name", "Author", "No. of pages", "Status", "Action"];

function Book(title, author, pages, status, libraryAction) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.libraryAction = libraryAction
}

function addBookToLibrary() {
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        getBook();
        getRadioButtonValue();
        if(bookTitle === "" || authorName === "" || NumOfPage === "" || bookStatus === ""){
            alert("Please fill all the inputs");
            return;
        };
        const book = new Book(bookTitle, authorName, NumOfPage, bookStatus, libraryAction);
        myLibrary.unshift(book);
        console.log(myLibrary);
        displayBook();
    })
}
addBookToLibrary();

function getBook() {
    bookTitle = bookTitleElement.value;
    authorName = authorNameElement.value;
    NumOfPage = pageElement.value;
}

function getRadioButtonValue() {
    for (let i = 0; i < bookStatusElement.length; i++) {
        if (bookStatusElement[i].checked) {
            bookStatus = bookStatusElement[i].value;
        }
    }
}

function displayBook() {
    tableContainer.textContent = "";
    const table = document.createElement("table");
    table.classList.add("custom-table");
    const tableRow = document.createElement("tr");

    // Make table row and table header
    header.forEach((element) => {
        const tableHead = document.createElement("th");
        const headerValue = document.createTextNode(element);
        tableHead.appendChild(headerValue);
        tableRow.appendChild(tableHead);
    })
    table.appendChild(tableRow);

    // Make table row and table data
    myLibrary.forEach((element) => {
        const dataRow = document.createElement("tr");
        Object.values(element).forEach((data) => {
            const tableData = document.createElement("td");
            const dataValue = document.createTextNode(data);
            tableData.appendChild(dataValue);
            dataRow.appendChild(tableData);
        })
        table.appendChild(dataRow);
    })
    tableContainer.appendChild(table);
    addButtonInsideCell();
    manageLibrary();
}

function displayForm() {
    fieldSet.style.display = "block";
    closeFormButton.style.display = "block";
    addNewBookButton.style.display = "none";
}

function hideForm() {
    fieldSet.style.display = "none";
    closeFormButton.style.display = "none";
    addNewBookButton.style.display = "block";
}

function addButtonInsideCell() {
    const table = document.querySelector(".custom-table");
    let rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
        let cols = rows[i].cells;
        let lastCol = rows[i].cells[cols.length - 1];

        let removeButton = document.createElement("button");
        removeButton.classList.add("removeButton");

        let editButton = document.createElement("button");
        editButton.classList.add("editButton");

        removeButton.textContent = "Remove";
        editButton.textContent = "Edit Status";
        lastCol.classList.add("lastCol");
        lastCol.appendChild(editButton);
        lastCol.appendChild(removeButton);
    }
}

function removeData(event) {
    if (event.target.value = "removeButton") {
        let row = this.closest("tr");

        // Subtracted by 1 to make array's index match with row.index
        myLibrary.splice(row.rowIndex - 1, 1);
        row.remove();
    }
}

function editStatus(event) {
    const newInput = document.createElement("select");

    // Create select input with options
    const inputOptions = ["Select one", "Read", "Not read yet", "Still reading"];
    for (let i = 0; i < inputOptions.length; i++) {
        const option = document.createElement("option");
        option.value = inputOptions[i];
        option.text = inputOptions[i];
        newInput.appendChild(option);
    }

    // Edit the value of the cell
    if (event.target.value = "Edit Status") {
        let row = this.closest("tr");
        let cell = this.closest("tr").cells[3];
        cell.textContent = "";
        cell.appendChild(newInput);
        newInput.addEventListener("change", (event) => {
            cell.textContent = event.target.value;
            console.log(row.rowIndex - 1);
            myLibrary[row.rowIndex - 1].status = event.target.value;
            console.log(myLibrary);
        })
    }
}

function manageLibrary() {
    const removeButton = document.querySelectorAll(".removeButton");
    removeButton.forEach((button) => {
        button.addEventListener("click", removeData);
    })

    const editButton = document.querySelectorAll(".editButton");
    editButton.forEach((button) => {
        button.addEventListener("click", editStatus);
    })
}

window.addEventListener("load", hideForm);
addNewBookButton.addEventListener("click", displayForm);
closeFormButton.addEventListener("click", hideForm);