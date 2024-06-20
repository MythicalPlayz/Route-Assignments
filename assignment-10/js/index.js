const siteNameInput = document.getElementById('name');
const siteUrlInput = document.getElementById('url');
const submitButton = document.getElementById('submit');
const closeButton = document.getElementById('close');
const failScreen = document.getElementById('fail-screen');
const table = document.getElementById('table');

var isNameValid = false;
var isURLValid = false;
var bookmarks = [];

const nameRegex = /.{3,}/;
const urlRegex = /^(https?:\/\/)?(w{3}\.)?(\w{1,}\.\w{2,})(\.\w{2,})*$/;
const httpRegex = /^(https?:\/\/)/

function verifyName(){
    const name = siteNameInput.value;
    const result = nameRegex.test(name);
    isNameValid = result;
}
function verifyUrl() {
    const url = siteUrlInput.value;
    const result = urlRegex.test(url);
    isURLValid = result;
}

function updateStyle(element,value){
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
    const newClass = (value) ? 'is-valid' : 'is-invalid';
    element.classList.add(newClass);
}

siteNameInput.addEventListener('input', function(){
    siteNameInput.classList.remove('first');
    verifyName();
    updateStyle(siteNameInput,isNameValid);
});

siteUrlInput.addEventListener('input', function(){
    siteUrlInput.classList.remove('first');
    verifyUrl();
    updateStyle(siteUrlInput,isURLValid);
});

submitButton.addEventListener('click',function() {
    if (isNameValid && isURLValid){
        addRow();
    }
    else {
        showFail(isNameValid,isURLValid);
    }
})


function showFail(isNameValid = false, isURLValid = false){
    const list = failScreen.querySelector('ul');
    const children = list.children;
    children[0].style.display = (isNameValid) ? 'none' : 'block';
    children[1].style.display = (isURLValid) ? 'none' : 'block';
    failScreen.classList.remove('d-none');
}

function hideFail(){
    failScreen.classList.add('d-none');
}

closeButton.addEventListener('click', hideFail);

function loadFromStorage(){
    if (localStorage.getItem('bookmarks')){
        const old = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(old);
        for (const index in old){
            addTable(index,old[index]);
        }
    }
}

loadFromStorage();

function saveToStorage(){
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}

function addTable(index, object){
    const container = 
    `
    <tr>
        <td>${Number(index) + 1}</td>
        <td>${object.name}</td>
        <td><button type="button" class="btn visit" onclick="visitUrl('${object.url}')"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteRow(${Number(index)})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
    `
    table.innerHTML += container;
}


function addRow(){
    const name = siteNameInput.value;
    const oldUrl = siteUrlInput.value;
    const regex = httpRegex.test(oldUrl);
    const newUrl  = (!regex) ? 'https://' +  oldUrl : oldUrl;
    const index = bookmarks.length;
    const object = {
        'name': name,
        'url': newUrl,
    }
    bookmarks[index] = object;
    addTable(index, object);
    saveToStorage();
}

function visitUrl(url){
    window.open(url, '_blank').focus();
}

function deleteRow(index){
    const children = table.children;
    const deletedElement = children[index];
    for (var indexloop = index + 1; indexloop < children.length; indexloop++){
        const element = children[indexloop];
        const oldIndex = Number(element.children[0].innerHTML);
        element.children[0].innerHTML = oldIndex - 1;
        element.children[3].innerHTML = element.children[3].innerHTML.replace(`deleteRow(${oldIndex})`, `deleteRow(${oldIndex - 1})`);
    }
    bookmarks.splice(index, 1);
    saveToStorage();
    deletedElement.remove();
}