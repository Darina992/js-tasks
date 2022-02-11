//вешаем на скопку Старт обработчик для включения аудио
const audio = document.querySelector('#audio');
const playButton = document.querySelector('.button-play');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const nameSinger = document.querySelector('.name-singer');
const nameSong = document.querySelector('.name-song');
const playerImage = document.querySelector('.image');
const bodyImage = document.querySelector('body');
const lineMove = document.querySelector('.line-move');
const audioDuration = document.querySelector('.all-time');
const audioCurrentTime = document.querySelector('.time');
const input = document.querySelector('.line-input');
let isPlay = false;
let playNum = 0;
const songsArr = [
  {
   name: "Beyonce",
   song: "Don't Hurt Yourself",
   url: "./assets/audio/beyonce.mp3",
   img: "./assets/img/lemonade.png"
  },
  {
   name: "Dua Lipa",
   song: "Don't Start Now",
   url: "./assets/audio/dontstartnow.mp3",
   img: "./assets/img/dontstartnow.png"
  },
]
playButton.addEventListener("click",function() {
  playAudio(playNum);
});
nextButton.addEventListener("click",playNext);
previousButton.addEventListener("click",playPrev);
function playAudio(number) {
  audio.src = songsArr[number].url;
  changeNameImage(number);
  if(isPlay){
    isPlay = false;
    audio.currentTime = input.value;
    audio.pause();
    playerImage.classList.remove('transform');
    playerImage.classList.add('transform-back');
    playButton.classList.add('play');
    playButton.classList.remove('pause');
  } else{
    isPlay = true;
    audio.currentTime = input.value;
    audio.play();
    playerImage.classList.add('transform');
    playerImage.classList.remove('transform-back');
    playButton.classList.add('pause');
    playButton.classList.remove('play');
  }
};
function playNext(){
  playNum += 1;
  if(playNum > songsArr.length - 1){
    playNum = 0;
  }
  isPlay = (isPlay) ? false : true;
  playAudio(playNum);
  audio.currentTime = 0;
}
function playPrev(){
  playNum -= 1;
  if(playNum < 0){
    playNum = songsArr.length - 1;
  }
  isPlay = (isPlay) ? false : true;
  playAudio(playNum);
  audio.currentTime = 0;
}
function changeNameImage(number) {
  nameSinger.textContent = songsArr[number].name;
  nameSong.textContent = songsArr[number].song;
  playerImage.src = `${songsArr[number].img}`;
  bodyImage.style.backgroundImage = `url(${songsArr[number].img})`;
}
//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
input.addEventListener("change",changeTime);
function changeTime() {
  audio.currentTime = input.value;
}
function changeProgress() {
  input.value = `${audio.currentTime}`;
  if(audio.currentTime === audio.duration){
    playNext();
  }
}
//check audio percentage and update time accordingly
setInterval(() => {
  input.setAttribute('max',`${audio.duration}`)
  audioCurrentTime.textContent = getTimeCodeFromNum(audio.currentTime);
  audioDuration.textContent = getTimeCodeFromNum(audio.duration);
  changeProgress();
}, 500);
