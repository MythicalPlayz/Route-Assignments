const emailRegex = /^\w+@\w+\.\w+$/;
const userRegex = /^[a-zA-z]/

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

    if (!pass || !email) {
        statusElement.innerHTML = 'Missing Info';
        statusElement.classList.remove('d-none');
        return;
    }
    const status = isvalid(email,pass);
    if (status === 2) {
        location.href = 'home.html';
        return;
    }
    else if (status === 1){
        statusElement.innerHTML = 'Invalid Password';
    }
    else {
        statusElement.innerHTML = 'Invalid Email';
    }
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

    if (!userRegex.test(name)){
        statusElement.innerHTML = 'Invalid Name';
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
    location.href = 'index.html';
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
    let stat = 0;
    for (let user of users){
        if (user.email === evalue){
            stat++;
            if (user.password === pvalue){
                setkey('logged-user',JSON.stringify(user));
                stat++;
            }
            return stat;
        }
    }
    return stat;
}

if (userElement){
    if (!getkey('logged-user')){
        location.href = 'index.html';
    }
    const user = JSON.parse(getkey('logged-user'));
    userElement.innerHTML = user.name;
}