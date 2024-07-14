//contact

const nameRegex = /^[a-zA-Z]{1,}$/;
const emailRegex = /^\w{1,}@\w{1,}.[a-zA-Z]{2,}$/;
const phoneRegex = /(^\+?)(\d{3})-?(\d{3})-?(\d{4,6})$/;
const ageRegex = /^([1-9][0-9]?|[0]*([1-9]{1,2}|[1-9][0-9]))$/
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

let firstTime = {
    'name': false,
    'email': false,
    'phone': false,
    'age': false,
    'pass1': false,
    'pass2': false,
}

function resetForm(){
    $('form input+div').addClass('d-none');
    $('form input').val('');
    $('form button').addClass('disabled');

    firstTime = {
        'name': false,
        'email': false,
        'phone': false,
        'age': false,
        'pass1': false,
        'pass2': false,
    }
}

function initForm(){
    $('form input').keyup(function(e) {
        const id = e.target.id;
        const value = e.target.value;
        getGlobalValidations(id,value);
    })
}

function getNameValidation(value){
    firstTime.name = true;
    return nameRegex.test(value);

}
function getEmailValidation(value){
    firstTime.email = true;
    return emailRegex.test(value);

}
function getAgeValidation(value){
    firstTime.age = true;
    return ageRegex.test(value);

}
function getPhoneValidation(value){
    firstTime.phone = true;
    return phoneRegex.test(value);

}
function getPassValidation(value){
    firstTime.pass1 = true;
    return passRegex.test(value);

}
function getpass2Validation(){
    firstTime.pass2 = true;
    return $('form #pass1').val() === $('form #pass2').val();

}


function getGlobalValidations(id,value){
    let isValid = true;
    let v = false;

    switch (id) {
        case 'name':
            v = getNameValidation(value);
            if (!v) {
                isValid = false;
                $('form #name').next().removeClass('d-none');
            }
            else {
                $('form #name').next().addClass('d-none');
            }
            break;
        case 'email':
            v = getEmailValidation(value);
            if (!v) {
                isValid = false;
                $('form #email').next().removeClass('d-none');
            }
            else {
                $('form #email').next().addClass('d-none');
            }
            break;
        case 'phone':
            v = getPhoneValidation(value);
            if (!v) {
                isValid = false;
                $('form #phone').next().removeClass('d-none');
            }
            else {
                $('form #phone').next().addClass('d-none');
            }
            break;
        case 'age':
            v = getAgeValidation(value);
            if (!v) {
                isValid = false;
                $('form #age').next().removeClass('d-none');
            }
            else {
                $('form #age').next().addClass('d-none');
            }
            break;
        case 'pass1':
            v = getPassValidation(value);
            if (!v) {
                isValid = false;
                $('form #pass1').next().removeClass('d-none');
            }
            else {
                $('form #pass1').next().addClass('d-none');
            }
            break;
        case 'pass2':
            v = getpass2Validation(value);
            if (!v) {
                isValid = false;
                $('form #pass2').next().removeClass('d-none');
            }
            else {
                $('form #pass2').next().addClass('d-none');
            }
            break;
    }

    if (!firstTime['name'] || !firstTime['email'] || !firstTime['phone'] || !firstTime['age'] || !firstTime['pass1'] || !firstTime['pass2'] ){
        return;
    }

    if (isValid){
        $('form button').removeClass('disabled');
    }
    else {
        $('form button').addClass('disabled');
    }
}


resetForm();
initForm();
$('form button').click(function(e) {
    e.preventDefault();
})

//loading

$(document).ready(function(){
    $('#loading').fadeOut(500,function() {
        $('#loading').addClass('d-none');
    });
})


//nav

function showNav(){
    $('aside').animate({
        left: '0px'
    }, 500)
    $('#menu').addClass('fa-x');
    for (let i = 0; i < 5; i++) {
        $('aside li').eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
    
}

function hideNav(){
    $('aside').animate({
        left: '-260px'
    }, 500)
    $('#menu').removeClass('fa-x');
        $('aside li').animate({
            top: `${$('aside li').outerWidth()}px`
    }, 500)
}

let hidden = true;
hideNav();

$('#menu').click(function(){
    if (hidden)
        showNav();
    else
        hideNav();
    hidden = !hidden;
})

//home
async function getMenuHome(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    if (!response.ok){
        alert('API did not return success');
        return;
    }
    let data = await response.json();
    const meals = data.meals;
    let container = '';
    for (const meal of meals){
        container += 
        `<div class="col-md-3 ps-5 ps-md-0">
                <div class="image-holder position-relative click rounded overflow-hidden hover" onclick=getDetails(${meal.idMeal})>
                    <img class="w-100" src=${meal.strMealThumb} alt="" />
                    <div class="position-absolute item bg-white bg-opacity-75 food-hover w-100 h-100 d-flex align-items-center">
                        <h3 class="px-2 w-100 text-black m-0 text-center text-lg-start">${meal.strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    $('#home .row').html(container);
}
getMenuHome();

let currentPage = 'home';

//details
async function getDetails(id){
    $(`#${currentPage}`).addClass('d-none');
    $('#loading').removeClass('d-none');
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!response.ok){
        alert('API did not return success');
        return;
    }
    let data = await response.json();
    const meal = data.meals[0];

    let container =
    `<div class="col-md-4 ps-5 ps-md-0">
                <div class="food-image">
                    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded">
                </div>
                <h3>${meal.strMeal}</h3>
            </div>
            <div class="col-md-8 ps-5 ps-md-0">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bold">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bold">Catagory : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="recipes list-unstyled d-flex g-3 flex-wrap">`

    let ingredientindex = 1
    while (true){
        if (!meal[`strIngredient${ingredientindex}`]){
            break
        }
        container += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${ingredientindex}`]} ${meal[`strIngredient${ingredientindex}`]}</li>`
        ingredientindex++;
    }
    container += `</ul>
                <h3>Tags :</h3>
                <ul class="tags list-unstyled d-flex g-3 flex-wrap">`

    const tags =  (meal.strTags) ? meal.strTags.split(',') : [];
    for (const tag of tags){
        container += `<li class="alert alert-danger m-2 p-1">${tag}</li>`
    }

    container += `</ul>
                <div class="links d-flex w-100">
                    <a href=${(meal.strSource) ? meal.strSource : '#'} class="btn btn-success mx-1" target="_blank">Source</a>
                    <a href="${(meal.strYoutube) ? meal.strYoutube : '#'}" class="btn btn-danger mx-1" target="_blank">Youtube</a>
                </div>
            </div>`

    $('#details .row').html(container);
    $('#loading').fadeOut(500,function() {
        $('#loading').addClass('d-none');
        $('#details').removeClass('d-none');
        currentPage = 'details';
    });
}

//nav navigations
$('aside li').click(function(e){
    const page = e.target.getAttribute('page');
    $(`#${currentPage}`).addClass('d-none');
    $(`#${page}`).removeClass('d-none');

    if (page === 'contact' || page === 'search'){

        if (page === 'contact')
            resetForm();
        else
            resetSearch();

        hideNav();
        currentPage = page;
        return;
    }

    $(`#loading`).removeClass('d-none');

    switch (page){
        case 'categories':
            loadCategoriesPage();
        break;
        case 'area':
            loadAreaPage();
        break;
        case 'ingredients':
            loadIngredientsPage();
        break;
    }
    hideNav();
    currentPage = page;
})

//list Page
async function loadCategoriesPage(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    if (!response.ok){
        alert('API did not return success');
        return;
    }
    let data = await response.json();
    const categories = data.categories;
    let container = '';

    for (const cat of categories){
        container += 
        `<div class="col-md-3 ps-5 ps-md-0">
                <div class="image-holder position-relative click rounded overflow-hidden hover click" onclick=showFoodFilter('c','${cat.strCategory}')>
                    <img class="w-100" src=${cat.strCategoryThumb} alt="" />
                    <div
                        class="position-absolute item bg-white bg-opacity-75 food-hover w-100 h-100 d-flex flex-column justify-content-around text-center">
                        <h3 class="px-1 text-black m-0">${cat.strCategory}</h3>
                        <p>${cat.strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }

    $('#categories .row').html(container);

    $('#loading').fadeOut(500,function() {
        $('#loading').addClass('d-none');
    });
}

async function loadAreaPage(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    if (!response.ok){
        alert('API did not return success');
        return;
    }
    let data = await response.json();
    const areas = data.meals;
    let container = '';

    for (const area of areas){
        container += 
        `<div class="col-md-3 text-white click d-flex flex-column justify-content-center align-items-center click" onclick=showFoodFilter('a','${area.strArea}')>
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${area.strArea}</h3>
        </div>`
    }

    $('#area .row').html(container);

    $('#loading').fadeOut(500,function() {
        $('#loading').addClass('d-none');
    });
}

async function loadIngredientsPage(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    if (!response.ok){
        alert('API did not return success');
        return;
    }
    let data = await response.json();
    const ingredients = data.meals.slice(0,20);
    let container = '';

    for (const ingredient of ingredients){
        container += 
        `<div class="col-md-3 text-white click d-flex flex-column justify-content-center align-items-center click text-center ps-5 ps-md-0 px-2" onclick=showFoodFilter('i','${ingredient.strIngredient}')>
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredient.strIngredient}</h3>
                <p class="m-0">${(ingredient.strDescription) ? ingredient.strDescription.split(" ").slice(0,20).join(" ") : ''}</p>
            </div>`
    }

    $('#ingredients .row').html(container);

    $('#loading').fadeOut(500,function() {
        $('#loading').addClass('d-none');
    });
}

async function showFoodFilter(filter,cat){
    $(`#${currentPage}`).addClass('d-none');
    $('#loading').removeClass('d-none');
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${filter}=${cat}`);
    if (!response.ok){
        alert('API did not return success');
        return;
    }
    let data = await response.json();

    const meals = data.meals;

    let container = '';
    for (const meal of meals){
        container += 
        `<div class="col-md-3 ps-5 ps-md-0">
                <div class="image-holder position-relative click rounded overflow-hidden hover" onclick=getDetails(${meal.idMeal})>
                    <img class="w-100" src=${meal.strMealThumb} alt="" />
                    <div class="position-absolute item bg-white bg-opacity-75 food-hover w-100 h-100 d-flex align-items-center">
                        <h3 class="w-100 text-black m-0 px-2 text-center text-lg-start">${meal.strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    $('#home .row').html(container);
    $('#home').removeClass('d-none');
    currentPage = 'home';
    $('#loading').fadeOut(500,function() {
        $('#loading').addClass('d-none');
    });
}

//search

async function search(type,name){
    $('#inner-loading').removeClass('d-none');
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${type}=${name}`);
    if (!response.ok){
        alert('API did not return success');
        return;
    }
    let data = await response.json();
    const meals = data.meals;
    let container = '';
    try {
        for (const meal of meals){
            container +=
            `<div class="col-md-3">
                <div class="image-holder position-relative click rounded overflow-hidden hover" onclick=getDetails(${meal.idMeal})>
                    <img class="w-100" src=${meal.strMealThumb} alt="" />
                    <div class="position-absolute item bg-white bg-opacity-75 food-hover w-100 h-100 d-flex align-items-center">
                        <h3 class="w-100 text-black m-0 px-2 text-center text-lg-start">${meal.strMeal}</h3>
                    </div>
                </div>
            </div>`
        }
    }
    catch {
        container = '<h3 class="text-center text-white m-0 mx-auto">Could not find meals</h3>'
    }

    $('#search .row').eq(1).html(container);
    $('#inner-loading').fadeOut(500,function() {
        $('#inner-loading').addClass('d-none');
    });
}

$('#search input').keyup(function(e){
    const element = e.target;
    const input = element.value;
    const type = (element.id === 'food-name' || !input) ? 's' : 'f';
    search(type,input);
})

function resetSearch(){
    $(`#search input`).val('');
    $('#search .row').eq(1).html('');
}