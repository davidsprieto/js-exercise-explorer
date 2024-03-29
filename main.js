"use strict";

const X_RAPID_API_KEY = config.X_RapidAPI_Key;

// constant variables not to be reassigned values
const SEARCH_BTN = document.getElementById('search-btn');
const EXERCISE_LIST = document.getElementById('exercise');
const EXERCISE_DETAILS_CONTENT = document.querySelector('.exercise-details-content');
const EXERCISE_CLOSE_BTN = document.getElementById('exercise-close-btn');

// event listeners
SEARCH_BTN.addEventListener('click', getExercises);
EXERCISE_LIST.addEventListener('click', getExerciseDetails);
EXERCISE_CLOSE_BTN.addEventListener('click', () => {
    EXERCISE_DETAILS_CONTENT.parentElement.classList.remove('showExercise');
})

// options to be passed into the fetch requests
const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': X_RAPID_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

// all exercises are fetched and displayed when the page loads
fetch('https://exercisedb.p.rapidapi.com/exercises', OPTIONS)
    .then(response => response.json())
    .then(data => displayOnPage(data))
    .catch(err => handleError(err));

// function that performs the fetch request with the user's input and fetches the list of exercises by body part
function getExercises() {
    let searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${searchInput}`, OPTIONS)
        .then(response => response.json())
        .then(data => displayOnPage(data))
        .catch(err => handleError(err, searchInput));
}

// function that handles errors and performs a fetch request with the user's input and fetches the list of exercises by target muscle if the body part fetch request doesn't work
function handleError(err, searchInput) {
    // console.error(err);
    fetch(`https://exercisedb.p.rapidapi.com/exercises/target/${searchInput}`, OPTIONS)
        .then(response => response.json())
        .then(data => displayOnPage(data))
        .catch(err => {
            if (err) {
                EXERCISE_LIST.innerHTML = "Sorry, couldn't find what you were searching for!";
                EXERCISE_LIST.classList.add('notFound');
            }
        });
}

// function that loops through and displays the fetched data
function displayOnPage(data) {
    let html = "";
    if (data) {
        data.forEach(exercise => {
            html += `
                <div class="exercise-item" data-id="${exercise.id}">
                    <div class="exercise-img">
                        <img src="${exercise.gifUrl}" alt="exercise">
                    </div>
                    <div class="exercise-name">
                        <h3>${exercise.name}</h3>
                        <a href="#" class="exercise-btn">Details</a>
                    </div>
                </div>
            `;
        });
        EXERCISE_LIST.classList.remove('notFound');
    } else {
        html = "Sorry we didn't find that body part!";
        EXERCISE_LIST.classList.add('notFound');
    }
    EXERCISE_LIST.innerHTML = html;
}

// get details of the exercise
function getExerciseDetails(e) {
    e.preventDefault();
    if (e.target.classList.contains('exercise-btn')) {
        let exerciseItem = e.target.parentElement.parentElement;
        // console.log(exerciseItem);
        fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseItem.dataset.id}`, OPTIONS)
            .then(response => response.json())
            .then(data => exerciseModal(data));
    }
}

// modal
function exerciseModal(data) {
    // console.log(data);
    EXERCISE_DETAILS_CONTENT.innerHTML = `
       <h2>Target Muscle:</h2>
       <p class="exercise-title">${data.bodyPart}</p>
       <p class="exercise-category"></p>
       <div class="exercise-instructions">
           <h2>Equipment:</h2>
           <p>${data.equipment}</p>
       </div>
       <div class="exercise-exercise-img">
           <img src="${data.gifUrl}" alt="">
       </div>
       <div class="modal-bottom text-center">
           <p>Created By: David Prieto</p>
           <span><a target="_blank" href="https://github.com/davidsprieto"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
         <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
       </svg></a></span>
           <span><a target="_blank" href="https://www.linkedin.com/in/davidsprieto/"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
               <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
           </svg></a></span>
       </div>
    `;
    EXERCISE_DETAILS_CONTENT.parentElement.classList.add('showExercise');
}
