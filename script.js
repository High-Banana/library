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
const header = ["Name", "Author", "No. of pages", "Status"];

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

function addBookToLibrary() {
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        getBook();
        const book = new Book(bookTitle, authorName, NumOfPage, bookStatus);
        myLibrary.unshift(book);
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

window.addEventListener("load", hideForm);
addNewBookButton.addEventListener("click", displayForm);
closeFormButton.addEventListener("click", hideForm);