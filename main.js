const searchBtn = document.getElementById('search-btn');

// event listeners
searchBtn.addEventListener('click', getExercises);

// options to be passed into fetch request
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

// function that performs the fetch request
function getExercises() {
    let searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    console.log(searchInput);
    fetch(`https://exercisedb.p.rapidapi.com/exercises/target/${searchInput}`, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}

// function displayOnPage(data) {
//
//     let html = "";
//     for (let i = 0; i <= data.length; i++) {
//         html += `<div class="exercise-item" data-id="${data[]}">`
//
//         }
//
// }