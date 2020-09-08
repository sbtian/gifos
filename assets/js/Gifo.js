const API_KEY = 'WrOMn0LlbeoPwXBS9W5hxRx1AaehwFAp';
const API_URL = 'http://api.giphy.com/v1/gifs';
const PATH_TAG = `${API_URL}/search/tags?api_key=${API_KEY}&lang=es`;
const PATH_SEARCH = `${API_URL}/search?api_key=${API_KEY}&limit=12`;
const PATH_TRENDING = `http://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`;

class Gifo {

    constructor(){
        this.offset_global;
        this.selection;
        this.favoritos = [];
    }

    async search(value){
        let query = `${PATH_TAG}&q=${value}&limit=5`;
        let response = await fetch(query);
        let data = await response.json();
        return data.data;
    }

    async getTrending (){
        let query = `${PATH_TRENDING}`;
        let response = await fetch(query);
        let data = await response.json();    
        return data.data;
    }

    async getTrendingGifs (){
        let query = `${API_URL}/trending?api_key=${API_KEY}&limit=15`;
        let response = await fetch(query);
        let data = await response.json();    
        return data.data;
    }

    async getGifs (value, offset = 0){
        let query = `${PATH_SEARCH}&q=${value}&offset=${offset}`;
        let response = await fetch(query);
        let data = await response.json();    
        return data;
    }

    async getGifById(id){
        let query = `${API_URL}/${id}?api_key=${API_KEY}`;
        let response = await fetch(query);
        let data = await response.json();    
        return data.data;
    }

    showTrending(){
        this.getTrending().then((response) => {
            this.printTrending(response);
        })
    }

    showTrendingGif(){
        this.getTrendingGifs().then((response) => {
            this.printTrendingGif(response);
        })
    }

    printTrending(results){
        document.querySelector(".header__search--trending").innerHTML = '';
        let trending = document.querySelector(".header__search--trending");

        for (let i = 0; i < 5; i++) {
            trending.insertAdjacentHTML('beforeend',`${results[i]},`)            
        }
    }

    printTrendingGif(gifs){
        let trending = document.querySelector(".trending__carousel--items");
        gifs.forEach(e => {
            trending.insertAdjacentHTML('beforeend',`<li class="card" data-target="card"><img src="${e.images.fixed_width.webp}"></li>`) 
        });
    }
    
    
    autocomplete(value){
        this.search(value).then((response) => {
            if(response.length > 0 && value.length > 1){
                this.printAutocomplete(response) 
            }else if(value.length > 1){
                this.printNoResult(value);
            }else{
                this.cleanResult()
            }
        })
    }

    printAutocomplete(response){
        this.showResult();
        let lista = document.getElementById('search_results');
        response.forEach((e, i) => {
            let hr = i === 0 ? '<hr>' : '';
            lista.insertAdjacentHTML('beforeend',            
            `${hr}
            <li class="search__item">
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">            
                    <title>icon-search</title>
                    <desc>Created with Sketch.</desc>
                    <defs>
                        <path d="M8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,10.4865245 16.3185332,12.3138839 15.1766205,13.7610573 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3165825,20.0976311 18.6834175,20.0976311 18.2928932,19.7071068 L18.2928932,19.7071068 L13.7610573,15.1766205 C12.3138839,16.3185332 10.4865245,17 8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 Z M8.5,2 C4.91014913,2 2,4.91014913 2,8.5 C2,12.0898509 4.91014913,15 8.5,15 C10.2704128,15 11.8755097,14.2921984 13.0477521,13.1441339 L13.0928932,13.0928932 C13.1090201,13.0767663 13.1255608,13.0613054 13.1424811,13.0465104 C14.2921984,11.8755097 15,10.2704128 15,8.5 C15,4.91014913 12.0898509,2 8.5,2 Z" id="path-1"></path>
                    </defs>
                    <g id="GIFOS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="00-UI-Kit" transform="translate(-637.000000, -518.000000)">
                            <g id="-Nav-Desktop-Sticky" transform="translate(0.000000, 479.000000)">
                                <g id="icon-search" transform="translate(637.000000, 39.000000)">
                                    <mask id="mask-2" fill="white">
                                        <use xlink:href="#path-1"></use>
                                    </mask>
                                    <use fill="#9CAFC3" fill-rule="nonzero" xlink:href="#path-1"></use>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <a style="cursor:pointer" onclick="showGifs('${e.name}')">${e.name}</a>
            </li>`); 
        }); 
    }

    showResult(){
        document.getElementById('search_results').innerHTML = '';
        document.getElementById("search_results").style.display = "block";
        document.getElementById("svg_search").style.display = "block";
        document.getElementById("btn__ver").style.display = "initial";
        document.getElementById("search_input").className = "header__search--input-list"; 
        document.querySelector(".main__content--noResult").style.display = "none";
    }

    cleanResult(){
        document.getElementById('search_results').innerHTML = '';
        document.getElementById("search_input").className = "header__search--input";
        document.getElementById("search_results").style.display = "none";
        document.getElementById("svg_search").style.display = "none";
        document.getElementById('gifs_resultado').innerHTML = '';
        document.getElementById('main_title').innerHTML = '';
        document.querySelector(".main__content").style.display = "none";
    }

    printNoResult(value){
        this.cleanResult()
        document.getElementById('main_title').innerHTML = value;
        document.querySelector(".main__content").style.display = "block";
        document.querySelector(".main__content--noResult").style.display = "flex";
        document.getElementById("btn__ver").style.display = "none";
    }

    showGifs(value){
        this.cleanResult();
        this.selection = value;
        this.offset_global = 12;
        this.getGifs(value, this.offset_global).then((result) => {
            this.printGif(result.data, value)
        })
    }

    printGif(gifs, value, more = 0){    
        document.getElementById('main_title').innerHTML = value;
        (more === 0) && (document.getElementById('gifs_resultado').innerHTML = '');
        document.querySelector(".main__content").style.display = "block";
        let resultado = document.getElementById('gifs_resultado');
        gifs.forEach(gif => {
            resultado.insertAdjacentHTML('beforeend',
                `<div class="main__content--item">
                    <a style="cursor:pointer"><img src="${gif.images.fixed_width.webp}"></a>
                    <div class="overlay">
                        <div class="overlay__content">
                            <div class="overlay__buttons">
                                <button class="button_favorito" onclick="setFavorito('${gif.id}')"></button>
                                <button class="button_download" onclick="downloadGif('${gif.images.downsized_medium.url}', '${gif.title}')"></a></button>
                                <button class="button_ver" onclick="verGif('${gif.id}')"></button>
                            </div>
                            <div class="overlay__detail">
                                <span>${gif.username}</span>
                                <span>${gif.title}</span>
                            </div>
                        </div>
                    </div>
                </div>`);                
        });
    }

    setFavorito(id){
        this.getGifById(id).then((gif) => {            
            this.favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
            this.favoritos.push(gif);
            localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
        });
        
    }

    getFavoritos(){
        this.favoritos = JSON.parse(localStorage.getItem('favoritos'));
        if(this.favoritos === null || this.favoritos.length === 0){
            document.querySelector(".main__favoritos--noResult").style.display = "flex";
        }else{
            console.log(this.favoritos);
            document.querySelector(".main__favoritos--noResult").style.display = "none";
            this.printFavoritos();
        }
    }

    printFavoritos(){
        let resultado = document.getElementById('favoritos_resultado');
        this.favoritos.forEach(gif => {
            resultado.insertAdjacentHTML('beforeend',
                `<div class="main__content--item">
                    <a style="cursor:pointer"><img src="${gif.images.fixed_width.webp}"></a>
                    <div class="overlay">
                        <div class="overlay__content">
                            <div class="overlay__buttons">
                                <button class="button_favorito" onclick="setFavorito('${gif.id}')"></button>
                                <button class="button_download" onclick="downloadGif('${gif.images.downsized_medium.url}', '${gif.title}')"></button>
                                <button class="button_ver" onclick="verGif('${gif.id}')"></button>
                            </div>
                            <div class="overlay__detail">
                                <span>${gif.username}</span>
                                <span>${gif.title}</span>
                            </div>
                        </div>
                    </div>
                </div>`);                
        });
    }

    downloadGif(url, title){
        fetch(url).then( async (img) => {
            const file = await img.blob();
            let a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = title;
            a.click();
        });

    }

    

    verMas() {
        this.offset_global += 12;    
        this.getGifs(this.selection, this.offset_global).then((res) => {
            this.printGif(res.data, this.selection, 1)
            this.offset_global = res.pagination.offset;
        });
    }

    verGif(gif){
        // // Get the modal
        var modal = document.getElementById("myModal");

        // // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

        // // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // // When the user clicks on the button, open the modal
        // btn.onclick = function() {
            modal.style.display = "flex";
        // }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        this.printGifModal(gif)
        

    }

    printGifModal(id){
        this.getGifById(id).then((gif) => {   
            let content = document.getElementById('modal__content--item');
            document.getElementById('modal__content--item').innerHTML = ''
            content.insertAdjacentHTML('beforeend',
                `<img src="${gif.images.original.webp}">
                <div class="modal__item--content">
                    <div class="modal__item__detail">
                        <span>${gif.username}</span>
                        <span>${gif.title}</span>
                    </div>
                    <div class="modal__item__buttons">
                        <button class="button_favorito" onclick="setFavorito('${gif.id}')"></button>
                        <button class="button_download" onclick="downloadGif('${gif.images.downsized_medium.url}', '${gif.title}')"></a></button>
                    </div>
                </div>`);

        })
    }

    
}