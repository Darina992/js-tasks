const url = "https://api.themoviedb.org/3/movie/5?api_key=cc8242a4b4d30a804230564cfe9e68ab";
//https://api.themoviedb.org/3/movie/550?api_key=cc8242a4b4d30a804230564cfe9e68ab4
//https://api.themoviedb.org/3/search/movie?query=spring&api_key=3fd2be6f0c70a2a598f084ddfb75487c
const urlPopular = "https://api.themoviedb.org/3/movie/popular?api_key=cc8242a4b4d30a804230564cfe9e68ab&language=en-US&page=1"
const conteiner = document.querySelector('.conteiner-image');
const mainTitle = document.querySelector('.main-title');
const input = document.querySelector('input');
const clearInput = document.querySelector('.clear-input');
async function getData(url){
  conteiner.textContent = "";
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  createBlocks(data)
}
getData(urlPopular)
function createBlocks(data) {
  for(let i = 0; i < 20;i++){
    let block = document.createElement('div');
    let img = document.createElement('div');
    let titleConteiner = document.createElement('div');
    let title = document.createElement('div');
    let rate = document.createElement('div');
    let overview = document.createElement('div');
    titleConteiner.classList.add('title-conteiner');
    title.classList.add('title');
    rate.classList.add('rate');
    img.classList.add('image');
    block.classList.add('block');
    overview.classList.add('overview');
    if(data.results[i].backdrop_path){
      img.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${data.results[i].backdrop_path})`;
    } else{
      img.style.backgroundImage = `url(./camera.png)`;
    }
    title.textContent = `${data.results[i].title}`;
    rate.textContent = `${data.results[i].vote_average}`;
    if(data.results[i].overview){
      overview.textContent = `${data.results[i].overview}`;
    } else {
      overview.textContent = "Coming soon...";
    }
    titleConteiner.prepend(title,rate);
    block.prepend(img,titleConteiner,overview);
    conteiner.append(block);
  }
}
function searchMovie(name) {
  const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`
  mainTitle.textContent = `Search results: ${name}`;
  getData(urlSearch);
}
input.addEventListener("change",function (event) {
  searchMovie(input.value)
})
clearInput.addEventListener("click",function () {
  input.value = "";
  mainTitle.textContent = "Top 20 popular movies";
  getData(urlPopular);
})
