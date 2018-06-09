var audioX = document.getElementById('audioX');
var audioO = document.getElementById('audioO');
var audioSalut = document.getElementById('audioSalut');

var user = 'O'; 
var counter = 1; 
var num = 20; 

var table = document.getElementById('table'); 
var input = document.getElementById('input'); 
var button = document.getElementById('button'); 
var step = document.getElementById('step'); 
var winner = document.getElementById('winner'); 

var scoreX = document.getElementById('scoreX');
var scoreO = document.getElementById('scoreO');

var numOfScoreX = 0;
var numOfScoreO = 0;


toDefineNum(input); 

// 9) представление на экране пользователя 

function toDefineNum(elem){ 
	elem.addEventListener('keyup', function func2(ev){ 
		if(ev.keyCode == 13){ 
		
			num = +elem.value; 
			table.innerHTML = ''; 
			if(num >= 10 && num <= 30){ 
				this.parentElement.style.border = '2px solid black'; 
				this.parentElement.style.borderRadius = '3px'; 
				getCell(num); 
			}else{ 
				alert('Введите число от 10 до 30'); 
				this.parentElement.style.border = '2px solid red'; 
				this.parentElement.style.borderRadius = '3px'; 
				this.value = ''; 
				num = 20; 
				getCell(num); 
			}; 
		}; 
	}); 
	elem.addEventListener('click', function(){ 
		this.placeholder = ''; 
		this.style.backgroundColor = 'yellow'; 
	}); 
	elem.addEventListener('blur', function(){ 
		this.placeholder = 'от 10 до 30'; 
		this.style.backgroundColor = 'lightgrey'; 
		this.value = '';
	}); 
} 

toBeginAgain(button); 

// 10) начать игру сначала

function toBeginAgain(elem){ 
	elem.addEventListener('click', function(){ 
		audioSalut.pause();
		audioX.play(); 
		winner.innerHTML = '?'; 
		table.innerHTML = ''; 
		getCell(num); 
	}); 
} 

getCell(num); 

// 1) генерация игровой консоли 

function getCell(num){ 
	for(var i = 0; i < num; i++){ 
		var row = table.insertRow(i); 
		row.dataset.row = i + 1; 
		for(var j = 0; j < num; j++){ 
			var cell = row.insertCell(j); 
			// cell.innerHTML = counter; 
			cell.dataset.cell = counter++; 
			cell.addEventListener('click', mainFunc); 
			cell.innerHTML = ''; // можно добавить ❉
		}; 
	}; 
} 

// 2) - исполнение события 

function mainFunc(){  	
	var elem = this; 
	this.innerHTML = changeUser(elem); 
		toStep(step.innerHTML, step); 
		toCheckOutToHorizontally(toAnalizGame().arrMarkedOfX); 
		toCheckOutToHorizontally(toAnalizGame().arrMarkedOfO); 
		toCheckOutToVerticallyAndDiagonally(toAnalizGame().arrMarkedOfX[0], 0); 
		toCheckOutToVerticallyAndDiagonally(toAnalizGame().arrMarkedOfO[0], 0); 
		toCheckOutToVerticallyAndDiagonally(toAnalizGame().arrMarkedOfX[0], 1); 
		toCheckOutToVerticallyAndDiagonally(toAnalizGame().arrMarkedOfO[0], 1); 
		toCheckOutToVerticallyAndDiagonally(toAnalizGame().arrMarkedOfX[0], -1); 
		toCheckOutToVerticallyAndDiagonally(toAnalizGame().arrMarkedOfO[0], -1); 
		this.removeEventListener('click', mainFunc); 
} 

// 6) проверка победителя по диагонали и вертикали в зависимости от параметра 

function toCheckOutToVerticallyAndDiagonally(arr, n){ 
	for(var i = 0; i < arr.length; i++){ 
		var counter = 0; 
		for(var j = 0; j < arr.length; j++){ 
			if(arr[i] == arr[j] - (num + n) || arr[i] == arr[j] - (num + n) * 2 || arr[i] == arr[j] - (num + n) * 3 || arr[i] == arr[j] - (num + n) * 4){ 
				counter++; 
				if(counter == 4){ 
					toStep(step.innerHTML, winner); 
					untie(); 
					return; 
				}; 
			}; 
		}; 
	}; 
} 

// 5) проверка победителя по горизонтали 

function toCheckOutToHorizontally(arr){ 
	arr.sort((a, b) => {return a - b}); 
	var num = 0; 
	for(var i = 1; i <= arr[0].length; i++){ 
		if(arr[0][i - 1] == arr[0][i] - 1 && arr[1][i - 1] == arr[1][i]){ 
			num++; 
			if(num == 4){ 
				toStep(step.innerHTML, winner); 
				// отвязать события 
				untie(); 
				return; 
			}; 
		}else{ 
			num = 0; 
		}; 
	}; 
} 

// 4) Анализ игровой консоли (определение нажатых мышью элемертов таблиц) 

function toAnalizGame(){ 
	var td = table.querySelectorAll('td'); 
	var arrOfMarked = { 
		arrMarkedOfX: [[], []], 
		arrMarkedOfO: [[], []] 
	}; 
	for(var i = 0; i < td.length; i++){ 
		if(td[i].classList.contains('X')){ 
			arrOfMarked.arrMarkedOfX[0].push(td[i].dataset.cell); 
			arrOfMarked.arrMarkedOfX[1].push(td[i].parentElement.dataset.row); 
		}; 
		if(td[i].classList.contains('O')){ 
			arrOfMarked.arrMarkedOfO[0].push(td[i].dataset.cell); 
			arrOfMarked.arrMarkedOfO[1].push(td[i].parentElement.dataset.row); 
		}; 
	}; 
	return arrOfMarked; 
} 

// 3) изменение имени игрока 

function changeUser(clickedElem){ // для О 
	if(user == 'X'){ 
		clickedElem.classList.add('O'); 
		user = 'O'; 
	}else{ // для Х 
		clickedElem.classList.add('X'); 
		user = 'X'; 
	}; 
	return user; 
} 

// 7) определение победителя в span 

function toStep(text, elem){
	if(text == 'O'){ 
		audioX.play();
		elem.innerHTML = 'X'; 
	}else{ 
		audioO.play();
		elem.innerHTML = 'O'; 
	}; 	
} 

// 8) отвязка событий оставшихся td элементов 

function untie(){ 
	var td = table.querySelectorAll('td'); 
	for(var i = 0; i < td.length; i++){ 
		if(!td[i].classList.contains('X') && !td[i].classList.contains('O')){ 
			td[i].classList.add('W'); 
			td[i].innerHTML = ''; // можно добавить ❉
		} 
		td[i].removeEventListener('click', mainFunc); 
	}; 
	audioSalut.play();
	if(winner.innerHTML == 'X') scoreX.innerHTML = ++numOfScoreX;
	if(winner.innerHTML == 'O') scoreO.innerHTML = ++numOfScoreO;
} 