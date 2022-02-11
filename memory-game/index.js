function MemoryView() {
  let myField = null;
  let grid = null;
  let result = null;
  let buttonRestartMemory = null;
  let buttonRecords = null;
  let recordsTable = null;

  this.init = function(conteiner) {
    myField = conteiner;
    grid = document.createElement('div');
    grid.classList.add('grid');
    myField.prepend(grid);
    result = document.createElement('h2');
    myField.prepend(result);
    recordsTable = document.createElement('div');
    recordsTable.classList.add('records');
    let a = `<table><tr><th>№</th><th>Количество попыток</th>`;
    for(let i = 1;i <= 10;i++){
      a += `<tr><td>${i}</td><td class="td"></td></tr>`;
    }
    a += `</table>`;
    recordsTable.innerHTML = a;
    console.log(recordsTable);
    myField.append(recordsTable);
    recordsTable.style.display = "none";
    buttonRestartMemory = document.createElement('button');
    buttonRecords = document.createElement('button');
    buttonRecords.classList.add('button-records');
    buttonRecords.textContent = "Рекорды";
    buttonRestartMemory.classList.add('button-restart-memory');
    buttonRestartMemory.textContent = "Начать заново!";
    myField.append(buttonRestartMemory,buttonRecords);
  }

  this.renderMemoryBoard = function(card){
    grid.appendChild(card);
  }
  this.renderMemoryResult = function(text){
    result.textContent = text;
  }
  this.showRecordsTable = function (items) {
    recordsTable.style.display = "block";
    grid.style.display = "none";
    let tdArr = myField.querySelectorAll('.td');
    for(let i = 0;i < Object.values(items).length;i++){
      tdArr[i].textContent = Object.values(items)[i];
    }
  }
  this.hideRecords = function () {
    recordsTable.style.display = "none";
    grid.style.display = "flex";
  }
}
function MemoryModel() {
  let myView = null;
  let that = this;
  const cardsArray = [
          {
            name : "tree1",
            image : "./assets/memory/tree1.png"
          },
          {
            name : "tree1",
            image : "./assets/memory/tree1.png"
          },
          {
            name : "tree2",
            image : "./assets/memory/tree2.png"
          },
          {
            name : "tree2",
            image : "./assets/memory/tree2.png"
          },
          {
            name : "tree3",
            image : "./assets/memory/tree3.png"
          },
          {
            name : "tree3",
            image : "./assets/memory/tree3.png"
          },
          {
            name : "tree4",
            image : "./assets/memory/tree4.png"
          },
          {
            name : "tree4",
            image : "./assets/memory/tree4.png"
          },
          {
            name : "tree5",
            image : "./assets/memory/tree5.png"
          },
          {
            name : "tree5",
            image : "./assets/memory/tree5.png"
          },
          {
            name : "tree6",
            image : "./assets/memory/tree6.png"
          },
          {
            name : "tree6",
            image : "./assets/memory/tree6.png"
          }
        ];
  let cardsChoosen = [];
  let cardsChoosenId = [];
  let cardsWon = [];
  let n = 0;
  let cards = null;
  let lastGames = null;
  this.init = function(view) {
    myView = view;
    this.memoryGame();
  }
  this.getLastGames = function () {
    if(localStorage.getItem("$_records")){
      let obj = JSON.parse(localStorage.getItem("$_records"));
      lastGames = [];
      for(let i = 0; i < Object.values(obj).length;i++){
        let a = Object.values(obj)[i];
        lastGames.push(a);
      }
    } else {
      lastGames = [];
    }
  }
  this.memoryGameCreateBoard = function(){
      for(let i = 0; i < cardsArray.length; i++){
        let card = document.createElement('img');
        card.setAttribute('src','./assets/memory/card2.png');
        card.setAttribute('data-id',i);
        myView.renderMemoryBoard(card);
      }
  }
  this.memoryGameFlipCard = function(event) {
      let cardId = event.getAttribute('data-id');
      //console.log(cardId,cardsChoosen,cardsChoosenId)
      cardsChoosen.push(cardsArray[cardId].name);
      cardsChoosenId.push(cardId);
      event.classList.toggle('rotated');
      event.setAttribute('src',cardsArray[cardId].image);
      if (cardsChoosen.length === 2){
        n++;
        setTimeout(that.memoryGameCheckForMatch,500);//если открыто 2 карты то через 0,5с вызываем емтод проверяющий соответсвие
      }
  }
  this.memoryGameCheckForMatch = function() {
    //check for match
      cards = document.querySelectorAll('img');
      let optionOneId = cardsChoosenId[0];
      let optionTwoId = cardsChoosenId[1];
      if(cardsChoosen[0] === cardsChoosen[1] && cardsChoosenId[0] !== cardsChoosenId[1]){
        cards[optionOneId].classList.toggle('rotated');
        cards[optionTwoId].classList.toggle('rotated');
        cards[optionOneId].setAttribute('src','./assets/memory/card.png');
        cards[optionTwoId].setAttribute('src','./assets/memory/card.png');
        cardsWon.push(cardsChoosen);
      } else {
        cards[optionOneId].classList.toggle('rotated');
        cards[optionTwoId].classList.toggle('rotated');
        cards[optionOneId].setAttribute('src','./assets/memory/card2.png');
        cards[optionTwoId].setAttribute('src','./assets/memory/card2.png');
      }
      cardsChoosen = [];
      cardsChoosenId = [];

      myView.renderMemoryResult(`Количесво попыток : ${n}`);
      if (cardsWon.length === cardsArray.length/2){
        myView.renderMemoryResult('Поздравляем!Игра окончена!Количество использованных попыток '+ n + '.');
        if(lastGames.length === 10){
          lastGames.unshift(n);
          lastGames.pop();
        } else{
          lastGames.unshift(n);
        }
        that.getFromLocalStorage();
      }

  }
  this.memoryGameRestart = function(cards) {
    myView.hideRecords();
    for(let i = 0; i < cards.length; i++){
      cards[i].setAttribute('src','./assets/memory/card2.png');
    }
    cardsChoosen = [];
    cardsChoosenId = [];
    cardsWon = [];
    n = 0;
    myView.renderMemoryResult(`Количество попыток : ${n}`);
    cardsArray.sort(() => 0.5 - Math.random());
  }
  this.memoryGame = function () {
    //cards options
    cardsArray.sort(() => 0.5 - Math.random());//тусуем карточки
    that.memoryGameCreateBoard();//строим поле
    that.setToLocalStorage();
    that.getLastGames();
    myView.renderMemoryResult(`Количество попыток: ${n}`);//выводим счет
  }
  this.getFromLocalStorage = function(){
    let itemsObj = JSON.parse(localStorage.getItem("$_records"));
    for(let i = 1;i <= lastGames.length;i++){
      itemsObj[i] = lastGames[i-1];
    }
    localStorage.setItem("$_records",JSON.stringify(itemsObj));
  }
  this.setToLocalStorage = function(){
    if(localStorage.getItem('$_records')){
      let obj = JSON.parse(localStorage.getItem("$_records"));
      localStorage.setItem("$_records",JSON.stringify(obj));
    } else {
      let obj = {
        1:"",
        2:"",
        3:"",
        4:"",
        5:"",
        6:"",
        7:"",
        8:"",
        9:"",
        10:"",
    }
    localStorage.setItem("$_records",JSON.stringify(obj));
   }
  }
  this.createRecordsTable = function () {
    let items = JSON.parse(localStorage.getItem("$_records"));
    myView.showRecordsTable(items);
  }
}
function MemoryController() {
  let myField = null;
  let myModel = null;
  let board = null;
  let buttonRestartMemory = null;
  this.init = function(model,conteiner) {
    myModel = model;
    myField = conteiner;
    board = myField.querySelector('.grid');
    buttonRestartMemory = myField.querySelector('.button-restart-memory');
    buttonRecords = myField.querySelector('.button-records');
    if(board && buttonRestartMemory){
      board.addEventListener("click",function(event){
        if(event.target.closest('img')){
          myModel.memoryGameFlipCard(event.target);
        }
    });
     buttonRestartMemory.addEventListener("click",function () {
       let cards = myField.querySelectorAll('img');
       myModel.memoryGameRestart(cards);
     });
     buttonRecords.addEventListener("click",function () {
      myModel.createRecordsTable();
     })
   }
  }

}

const view = new MemoryView();
const model = new MemoryModel();
const controller = new MemoryController();

const conteiner = document.querySelector('#root');
view.init(conteiner);
model.init(view);
controller.init(model,conteiner);
