document.getElementById('error-text').style.display = 'none';
document.getElementById('error-empty-string').style.display = 'none';

// **** Searching and Loading searched data ****

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('display-result').style.display = displayStyle;
    document.getElementById('single-food-details').innerHTML = '';
}
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clearing search field
    searchField.value = '';
    document.getElementById('error-text').style.display = 'none';
    document.getElementById('error-empty-string').style.display = 'none';


    if (searchText == '') {
        document.getElementById('error-empty-string').style.display = 'block';
    }
    else {
        toggleSpinner('block');
        toggleSearchResult('none');

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
            .catch(error => displayError(error)); // error handling
    }
}

// **** Error Handling ****

const displayError = error => {
    document.getElementById('error-text').style.display = 'block';
}
// searchFood();

// **** displaying searched foods ****
const displayFood = foods => {
    const searchResultsDiv = document.getElementById('search-results');
    searchResultsDiv.innerText = ''; // clearing the previous result

    foods.forEach(food => {
        // console.log(food);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = ` 
        <div onclick = "loadSingleFoodDetails('${food.idMeal}')" class="card h-100 p-3">
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                <p class="card-text">${food.strInstructions.slice(0, 250)}</p>
            </div>
        </div>
        `;
        searchResultsDiv.appendChild(div);
    });

    toggleSpinner('none');
    toggleSearchResult('block');

}

// **** Loading & Displaying data of single food details ****

const loadSingleFoodDetails = foodId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodDetails(data.meals[0]))
}
const displayFoodDetails = details => {
    const foodDetailDiv = document.getElementById('single-food-details');
    // console.log(details);

    foodDetailDiv.innerHTML = ''; // clearing previous single food details

    // displaying the clicked food's details
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card w-75 mx-auto m-3 p-3">
            <img src="${details.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${details.strMeal}</h5>
                <p class="card-text">${details.strInstructions.slice(0, 250)}</p>
            </div>
            <a href="${details.strYoutube}" class= "btn btn-primary w-50 mx-auto">Play Video</a>
        </div>
    `;
    foodDetailDiv.appendChild(div);
}