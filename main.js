const searchBtn = document.getElementById('search-btn');

// event listeners
searchBtn.addEventListener('click', getExercises);

// options to be passed into fetch request
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '59ba742d48msh46feac59f2323b3p1be004jsn2f643a858b6e',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

// function that performs the fetch request
function getExercises() {
    let searchInput = document.getElementById('search-input').value.trim();
    console.log(searchInput);
    fetch(`https://exercisedb.p.rapidapi.com/exercises/%7B${searchInput}%7D`, options)
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