// declare a varible
const searchInput = document.getElementById('search-input');
const searchError = document.getElementById('search-error');
const errorText = document.getElementById('error-message');
const bookContainer = document.getElementById('book-container');
const totalBook = document.getElementById('total-book');
const spinner = document.getElementById('spinner');

const getBoooks = () => { //fetch api 

    if(searchInput.value === ''){ // if search value emty then alert him

        errorText.innerHTML = `<h5 class="bg-danger text-white shadow-lg rounded p-2 text-center w-50 mx-auto">Please search the book what you want !</h5>`
        bookContainer.textContent = '';
        totalBook.style.display = 'none';
        errorText.style.display = 'block';
        searchError.style.display = 'none';
        spinner.style.display = 'none';
    }
    else{
        const searchValue = searchInput.value;
        fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
        .then(res => res.json())
        .then(data => displayBooks(data))    
        totalBook.style.display = 'none';//  total book quantity not show 
        errorText.style.display = 'none'; 
        spinner.style.display = 'block';
    }
}


const displayBooks = books => { // display books function

    const bookMatch = books.docs.filter(item => item.cover_i !== undefined && item.publisher !== undefined && item.publisher[0] !== undefined && item.first_publish_year !== undefined);

    totalBook.innerHTML = `<h4>Total book found: ${books.numFound}</h4>`//total match book
    

if(bookMatch.length === 0){ //search error

    bookContainer.textContent = ''; //delete previous item
    searchError.innerHTML = `Your search --<b> ${searchInput.value} </b>-- did not match any of our set books. Please enter a
    correct name.` 
    totalBook.style.display = 'none';
    searchError.classList.add('search-error');  //add css style
    errorText.style.display = 'none';   
    searchError.style.display = 'block';
    spinner.style.display = 'none'; //spinner
}

else{
    bookContainer.textContent = '';
    searchError.style.display = 'none';
    errorText.style.display = 'none';

    bookMatch.forEach(book => { //display match books

        spinner.style.display = 'none'; //spinner
        totalBook.style.display = 'block'; //total book quantity show

        const div= document.createElement('div'); //make a card
        div.classList.add('card');
        div.classList.add('shadow-lg')
        div.innerHTML = `
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" width="248px" height="323px" class="rounded-bottom">
                    <div class="p-2">
                            <h5>Book Name: ${book.title}</h5>
                            <h6 class="text-secondary">Author Name: ${book.author_name}</h6>
                            <h6 class="text-secondary">Publisher: ${book.publisher[0]}</h6>
                            <h6 class="text-secondary">First Publish: ${book.first_publish_year}</h6>
                    </div>`
        
        div.style.width = '250px';
        div.classList.add('card-style');
        bookContainer.classList.add('book-container');
        bookContainer.appendChild(div);
    })
}//search input emty
searchInput.value = '';
}
