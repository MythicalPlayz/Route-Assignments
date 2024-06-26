const emailRegex = /^\w+@\w+\.\w+$/;

const emailElement = document.getElementById('email');
const nameElement = document.getElementById('name');
const passElement = document.getElementById('password');
const statusElement = document.getElementById('status');
const userElement = document.getElementById('username');

var users = (localStorage.getItem('users')) ? JSON.parse(getkey('users')) : [];

function getkey(name){
    return localStorage.getItem(name);
}

function setkey(name,value = undefined){
    if (!value){
        localStorage.removeItem(name);
    }
    else {
        localStorage.setItem(name,value);
    }
}

function login(){

    statusElement.classList.add('d-none');

    const email = emailElement.value;
    const pass = passElement.value;

    if (isvalid(email,pass)) {
        location.href = 'home.html';
        return;
    }

    statusElement.innerHTML = 'Invalid Email/Password combination';
    statusElement.classList.remove('d-none');
}

function signup(){

    statusElement.classList.add('d-none');
    statusElement.classList.add('text-danger');
    statusElement.classList.remove('text-success');

    const name = nameElement.value;
    const email = emailElement.value;
    const pass = passElement.value;

    if (!name || !pass || !email) {
        statusElement.innerHTML = 'Missing Info';
        statusElement.classList.remove('d-none');
        return;
    }

    if (!emailRegex.test(email)) {
        statusElement.innerHTML = 'Invalid Email';
        statusElement.classList.remove('d-none');
        return;
    }

    if (!isemailunique(email)) {
        statusElement.innerHTML = 'Email already in use';
        statusElement.classList.remove('d-none');
        return;
    }

    const user = {
        'name': name, 
        'email': email, 
        'password': pass, 
    }

    users.push(user);
    setkey('users', JSON.stringify(users));

    statusElement.innerHTML = 'Success';
    statusElement.classList.remove('d-none');
    statusElement.classList.remove('text-danger');
    statusElement.classList.add('text-success');
}

function logout(){
    setkey('logged-user');
    location.href = 'index.html';
}

function isemailunique(value) {
    for (let user of users){
        if (user.email === value){
            return false;
        }
    }
    return true;
}

function isvalid(evalue, pvalue) {
    for (let user of users){
        if (user.email === evalue && user.password === pvalue){
            setkey('logged-user',JSON.stringify(user));
            return true;
        }
    }
    return false;
}

if (userElement){
    if (!getkey('logged-user')){
        location.href = 'index.html';
    }
    const user = JSON.parse(getkey('logged-user'));
    userElement.innerHTML = user.name;
}