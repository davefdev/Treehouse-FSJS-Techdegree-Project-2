/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

console.log(data);

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Global Variables
const page = document.querySelector('.page');
const itemsPerPage = 9;
const studentListUl = document.querySelector('.student-list');
const studentItemLi = studentListUl.children;
const pagBtnUL = document.createElement('ul');
const pagDiv = document.createElement('div');
pagDiv.className = 'pagination';

console.log(studentListUl);
console.log(studentItemLi);

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {   
   //Create first and last student variables with math calculation
   let firstIndex = (page * itemsPerPage) - itemsPerPage;
   let lastIndex = page * itemsPerPage; 
   //Set student list UL to empty string to remove students prev displayed
   studentListUl.innerHTML = '';

   //For loop to go through each student entry once
   for (let i = 0; i < list.length; i++) {
      //Conditional statement to check if current position should be displayed
      if (i >= firstIndex && i < lastIndex) {
         //If so then make student list Ul's innerHTML property display the student at that index position
         studentListUl.insertAdjacentHTML('beforeend',
         //Template literal of DOM elements for the student, using bracket notation to access object, dot notation for properties
         `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">  
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
         </li>`);
      }
   }
}

//test showPage function is working
showPage(data, 1);


/*const showPage = (list, page) => {   
   //Create first and last student variables with math calculation
   let firstIndex = (page * itemsPerPage) - itemsPerPage;
   let lastIndex = page * itemsPerPage; 
   //Set student list UL to empty string to remove students prev displayed
   studentListUl.innerHTML = '';

   //For loop to go through each student entry once
   for (let i = 0; i < list.length; i++) {
      //Conditional statement to check if current position should be displayed
      if (i >= firstIndex && i < lastIndex) {
         //make the students display value appear on the page
         list[i].style.display = 'block';
      } else {
         //or it does not if not meet condition
         list[i].style.display = 'none';
      }
   }
}
*/


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = list => {
   //Var to store no of pag buttons, using Math.ceil and list par length divided by no of items per page
   const numOfBtns= Math.ceil(list.length/itemsPerPage);
   //var to add the pag buttons to
   const linkList = document.querySelector('.link-list');
   //remove any prev buttons
   linkList.innerHTML = ''; 

   //for loop to go through each pag button
   for (let i = 1; i <= numOfBtns; i++) {
      //method to add template literal of DOM elements for button, after last child of linkList
      linkList.insertAdjacentHTML('beforeend',
         `<li>
            <button type="button">${i}</button>
         </li>`
      );   
   }

   //select first button element and set it's class to active
   const button = document.querySelector('button');
   button.className = 'active';

   //create an event listener on the page buttons 
   linkList.addEventListener('click', (e) => {
        //check to ensure the element clicked is a button using if statement
        if (e.target.tagName === 'BUTTON') {
         //remove active class from prev button
         let prevButton = document.querySelector('.active');
         prevButton.className = '';
         //add active class to clicked button
         e.target.className.add('active');

         let btnNum = e.target.textContent;
         //call showPage func with arguments
         showPage(list, btnNum);
      }
   });
}


//*****Extra credits attempt****** 
//Search form
//Create and append search bar with button
const appendSearchForm = () => {
  //declare variables for search bar
   const pageHeader = document.getElementsByClassName('page-header');
   const searchDiv = document.createElement('div');
   const searchInput = document.createElement('input');
   const searchBtn = document.createElement('button');
  //setup variables properties/values
   searchDiv.className = 'student-search';
   searchInput.setAttribute('placeholder','Search students here');
   searchBtn.textContent = 'search';
  
   //append search bar and button to DOM
   pageHeader[0].appendChild(searchDiv);
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchBtn);
}
  
//Search form function 
const searchStudents = list => {

   //put results in a new array
   let results = [];

   //make the student's name and search input upper case
   const firstName = list[i].name.first.toUpperCase();
   const lastName = list[i].name.last.toUpperCase();
   const inputText = searchInput.value.toUpperCase();

   //for loop to run through student array
   for (let i = 0; i < list.length; i++) {

      //If no results found, display No results message.
      if (results.length === 0 || !inputText) {
         //make new h2 element to put message
         const noResults = document.createElement('h2');
         //access textContent to display message
         noResults.textContent = `No results found for ${searchInput.value}`;
         //add a class value 
         noResults.classList.add('no-results');
         //append the message to page element
         document.getElementsByClassName('page')[0].appendChild(noResults);
         //add the buttons
         addPagination(results);
      } else {
       
       //if statement and includes method to check input value matches student names
        if (firstName.includes(inputText) || lastName.includes(inputText)) {
           //adds matches to end of results array
           results.push(list[i]);
        }
         //run the showPage function with results array passed in and buttons
           showPage(results, 1);
           addPagination(results);
        }
     }

   //Event listener for typing in search box, run search function (does not work with preventdefault)
   searchInput.addEventListener('keyup', () => {
      searchStudents(data);
   });

   //Event listener for clicking on button, run search function
   searchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      searchStudents(data);
   });
}

//Call all functions
//appendSearchForm();
showPage(data, 1);
addPagination(data);











