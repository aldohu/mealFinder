const search = document.querySelector('.searchBtn');
const input = document.querySelector('#input');
const random = document.querySelector('#random');

const meals = document.querySelector('.meals');
const updateDOM = (data) => {
	meals.innerHTML = '';
	if (data.meals === null) {
		meals.innerHTML = `<h3>No results found</h3>`;
		return;
	}
	const mealsSearch = document.createElement('div');
	mealsSearch.classList.add('mealsSearch');
	data.meals.forEach((element) => {
		mealsSearch.innerHTML += `<div class="meal"><img class="image" src="${element.strMealThumb}" alt="${element.strMeal}" />
        <div class="mealSearch-info" data-mealID="${element.idMeal}">
            <h3>${element.strMeal}</h3>
            </div>
            </div>`;
	});
	meals.appendChild(mealsSearch);
};
const fetchAPI = async (url) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log('Error:', error);
	}
};

search.addEventListener('click', async (e) => {
	e.preventDefault();
	const query = input.value;

	url = `http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
	const data = await fetchAPI(url);
	updateDOM(data);
});
random.addEventListener('click', async (e) => {
	e.preventDefault();
	url = `http://www.themealdb.com/api/json/v1/1/random.php`;
	const data = await fetchAPI(url);

	meals.innerHTML = '';
	meals.innerHTML += `<div class="meal"><h3>${data.meals[0].strMeal}</h3>
    <img class="randomImg" src="${data.meals[0].strMealThumb}" alt="${
		data.meals[0].strMeal
	}" />
    <div class="meal-info" data-mealID="${data.meals[0].idMeal}">
    <p>${data.meals[0].strArea}</p>
    <p>${data.meals[0].strCategory}</p>
    </div>
    <div class="main">
    <p>${data.meals[0].strInstructions}</p>
    <h2>Ingridients</h2>
    <ul>
    ${generateIngredientsList(data.meals[0])}
    </ul>
    </div>
    </div>
    <div class="meal-info" data-mealID="${data.meals[0].idMeal}">
        
        </div>
        </div>`;
});
function generateIngredientsList(meal) {
	let ingredientsList = '';
	for (let i = 1; i <= 20; i++) {
		const ingredient = meal[`strIngredient${i}`];
		const measurement = meal[`strMeasure${i}`];
		if (ingredient) {
			ingredientsList += `<li>${measurement} ${ingredient}</li>`;
		}
	}
	return ingredientsList;
}
meals.addEventListener('mouseover', (e) => {
	const target = e.target;
	if (e.target.classList.contains('image')) {
		const element = target.nextElementSibling.firstElementChild;
		element.classList.add('show');

		console.log(target.nextElementSibling.firstElementChild);
		//e.target.style.visibility = 'visible';
		//h3.style.visibility = 'visible';
	}
});
meals.addEventListener('mouseout', (e) => {
	const target = e.target;
	if (e.target.classList.contains('image')) {
		const element = target.nextElementSibling.firstElementChild;
		element.classList.remove('show');
	}
});
