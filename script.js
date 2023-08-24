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
        // if(bookTitle === "" || authorName === "" || NumOfPage === "" || bookStatus === "") return;
        const book = new Book(bookTitle, authorName, NumOfPage, bookStatus, libraryAction);
        myLibrary.unshift(book);
        displayBook();
        addButtonInsideCell();
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
    for(let i = 1; i < rows.length; i++){
        let cols = rows[i].cells;
        let lastCol = rows[i].cells[cols.length-1];
        let button = document.createElement("button");
        button.textContent = "Remove";
        lastCol.appendChild(button);
    }
}
window.addEventListener("load", hideForm);
addNewBookButton.addEventListener("click", displayForm);
closeFormButton.addEventListener("click", hideForm);