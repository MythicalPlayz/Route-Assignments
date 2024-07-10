"use strict";

import { Games } from "./games.module.js";

const navElement = document.getElementById('catagory');
const catButtons = navElement.querySelectorAll('p');

function show(){}

const games = new Games();



for (let button of catButtons){
    button.addEventListener('click',(e) => {
        navElement.querySelector('.text-primary').classList.replace('text-primary','text-white');
        e.target.classList.replace('text-white','text-primary');
        games.getGamesByCatagory(e.target.innerHTML);
    })
}