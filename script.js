const myLibrary = [];
const tableContainer = document.querySelector(".table-container");
const bookTitle = document.getElementById("book_name");
const authorName = document.getElementById("author_name");
const totalPage = document.getElementById("pages");
const radioButton = document.getElementsByName("status");
const submitButton = document.querySelector(".submit-button");
let bookStatus;

function Book(author, title, pages, status){
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.status = status
}

function getRadioButtonValue(){
    for(let i=0;i<radioButton.length;i++){
        if(radioButton[i].checked){
            bookStatus = radioButton[i].value;
        }
    }
}

function addBookToLibrary(){
    submitButton.addEventListener("click", (event)=>{
        getRadioButtonValue();
        event.preventDefault();
        const book = new Book(authorName.value, bookTitle.value, totalPage.value, bookStatus);
        myLibrary.push(book);
    })
}
addBookToLibrary();

function createTable(){

}