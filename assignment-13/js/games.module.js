import { UI } from "./ui.module.js"
const ui = new UI();
const options = {
    method: 'GET',
    headers: {
    'x-rapidapi-key': '07e01ef667msh0ce46dd7ab91872p164530jsn14e1b148a58c',
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
const gamesListElement = document.getElementById('gameslist');
export class Games{
    constructor() {
        this.getGamesByCatagory('mmorpg');
    }
    getGamesByCatagory = async function(catname) {
        ui.showLoading();
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${catname}`;

        const response = await fetch(url, options);
        if (response.ok){
	        const result = await response.json();
            ui.showGamesList(result);
            const games = gamesListElement.querySelectorAll('.click');
            for (let game of games){
                const id = game.getAttribute('gid');
                game.addEventListener('click',() => {
                    this.getGameDetails(id);
                })
            }
        }
    }
    getGameDetails = async function (id) {
        ui.showLoading();
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
        const response = await fetch(url, options);
        if (response.ok){
	        const result = await response.json();
            ui.showGameDetails(result);
        }
    }
}