const SEARCH_BTN = document.getElementById('search-btn');
const EXERCISE_LIST = document.getElementById('exercise');

// event listeners
SEARCH_BTN.addEventListener('click', getExercises);

// options to be passed into fetch request
const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

// function that performs the fetch request
function getExercises() {
    let searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    fetch(`https://exercisedb.p.rapidapi.com/exercises/target/${searchInput}`, OPTIONS)
        .then(response => response.json())
        .then(data => displayOnPage(data))
        .catch(err => console.error(err));
}

// function that loops through and displays the fetched data
function displayOnPage(data) {
    console.log(data[0].id);
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
                        <a href="#" class="exercise-btn"></a>
                    </div>
                </div>
            `;
        });
        EXERCISE_LIST.classList.remove('notFound');
    } else {
        html = "Sorry we didn't find that muscle!";
        EXERCISE_LIST.classList.add('notFound');
    }
    EXERCISE_LIST.innerHTML = html;
}