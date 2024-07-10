const loadingElement = document.getElementById('loading');
const gamesViewElement = document.getElementById('gamesview');
const gamesListElement = document.getElementById('gameslist');
const gamedetailsElement = document.getElementById('gamedetails');

export class UI {
    showGamesList = function(data){
        let container = '';
        for (let game of data) {
            container += `
            <div class="col-xl-3 col-lg-4 col-md-6 col-12 p-3 click" gid=${game.id}>
                    <div class="border border-black rounded overflow-hidden game h-100 p-0 d-flex flex-column justify-content-between">
                        <div class="d-flex flex-column justify-content-between">
                            <div class="image-holder p-3">
                                <img src="${game.thumbnail}" alt="" class="w-100 rounded">
                            </div>
                            <div class="d-flex flex-column">
                                <div class="d-flex justify-content-between p-2 align-items-baseline my-2">
                                    <h4 class="m-0 h6">${game.title}</h4>
                                    <p class="bg-primary rounded py-1 px-2 m-0">Free</p>
                                </div>
                                <p class="text-center text-white-50 alt-font fs-s px-2">${game.short_description.split(" ", 8).join(" ")}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between border-0 border-top p-2 border-black w-100">
                            <p class="bg-color-2 rounded py-1 px-2 m-0 fs-s">${game.genre}</p>
                            <p class="bg-color-2 rounded py-1 px-2 m-0 fs-s">${game.platform}</p>
                        </div>
                    </div>
                </div>
            </div>`
        }
        gamesListElement.innerHTML = container;
        this.hideLoading();
    }

    showGameDetails = function(data){
        let container = `
            <div class="row" id="gameid">
                <div class="image-holder col-lg-4 col-12">
                    <img src="${data.thumbnail}" alt="" class="w-100">
                </div>
                <div class="col-lg-8 col-12 d-flex flex-column p-3 text-white">
                    <h4 class="h1">Title: ${data.title}</h4>
                    <p>Category: <span class="bg-primary mx-1 text-black px-2 py-1 rounded">${data.genre}</span></p>
                    <p>Platform: <span class="bg-primary mx-1 text-black px-2 py-1 rounded">${data.platform}</span></p>
                    <p>Status: <span class="bg-primary mx-1 text-black px-2 py-1 rounded">${data.status}</span></p>
                    <p>${data.description}</p>
                    <a href="${data.freetogame_profile_url}" class="text-decoration-none text-white border border-warning p-2 rounded" style="width: fit-content;">Show Game</a>
                </div>
            </div>`
        gamedetailsElement.querySelector('#gameid').innerHTML = container;
        this.hideLoading();
        gamedetailsElement.classList.remove('d-none');
        gamesViewElement.classList.add('d-none');
    }
    showLoading = function() {
        loadingElement.classList.remove('d-none');
    }
    hideLoading = function() {
        loadingElement.classList.add('d-none');
    }
}

gamedetailsElement.querySelector('i').addEventListener('click',() => {
    gamesViewElement.classList.remove('d-none');
    gamedetailsElement.classList.add('d-none');
})