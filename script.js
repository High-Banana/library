const myLibrary = [];
const tableContainer = document.querySelector(".table-container");
const bookTitle = document.getElementById("book_name");
const authorName = document.getElementById("author_name");
const totalPage = document.getElementById("pages");
const radioButton = document.getElementsByName("status");
const submitButton = document.querySelector(".submit-button");
let bookStatus;
let header = ["Name", "Author", "Page", "Status"];

function Book(author, title, pages, status) {
    this.author = author,
        this.title = title,
        this.pages = pages,
        this.status = status
}

function getRadioButtonValue() {
    for (let i = 0; i < radioButton.length; i++) {
        if (radioButton[i].checked) {
            bookStatus = radioButton[i].value;
        }
    }
}

function addBookToLibrary() {
    submitButton.addEventListener("click", (event) => {
        getRadioButtonValue();
        event.preventDefault();
        const book = new Book(authorName.value, bookTitle.value, totalPage.value, bookStatus);
        myLibrary.push(book);
        createTable();
    })
}
addBookToLibrary();

function createTable() {
    tableContainer.textContent = "";
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    header.forEach((element)=>{
        const tableHeader = document.createElement("th");
        const headerValue = document.createTextNode(element);
        tableHeader.appendChild(headerValue);
        headerRow.appendChild(tableHeader);
    })
    table.appendChild(headerRow);

    myLibrary.forEach((element)=>{
        let dataRow = document.createElement("tr");
        Object.values(element).forEach((data)=>{
            const tableData = document.createElement("td");
            const dataValue = document.createTextNode(data);
            tableData.appendChild(dataValue);
            dataRow.appendChild(tableData);
        })
        table.appendChild(dataRow);
    })

    tableContainer.appendChild(table);
}