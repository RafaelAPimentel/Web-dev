var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButton = document.querySelectorAll(".mode");

init();

function init(){
	//mode buttons
	setupModeButton();
	setupSquares();


	reset();
}

function setupModeButton(){
	for (var i = 0; i < modeButton.length; i++) {
		modeButton[i].addEventListener("click",function(){
			modeButton[0].classList.remove("selected");
			modeButton[1].classList.remove("selected");
			this.classList.add("selected");

			this.textContent ==="Easy" ? numSquares = 3:numSquares=6;
			reset();

		});
	}
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++) {
	//add initial colors
	squares[i].style.background = colors[i];
	//add click listener to square

	squares[i].addEventListener("click",function(){
		//grab color of click square
		var clickedColor = this.style.background;
		//compare color to pickedColor
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			changeColors(clickedColor);
			h1.style.background = clickedColor;
			resetButton.textContent = "Play Again!";
		}
		else{
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again!";
		}
	})
}
}

function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new randomw color
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "new Colors";
	messageDisplay.textContent = "";
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
			
		}
		else{
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	//generate aLl New Colors
	reset();
})


function changeColors(color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//amake array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
		//random color
		arr.push(randomColor())
	}
	//return array
	return arr;
}
function randomColor(){
	//pick a red from 0-255
	var r = Math.floor(Math.random() *256);
	//pick a green from 0-255
	var g = Math.floor(Math.random() *256);
	//pick a blue from 0-255
	var b = Math.floor(Math.random() *256);
	return "rgb("+r+", "+g+", " +b+ ")";
}