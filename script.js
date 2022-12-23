var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var pt1 = document.getElementById("pt1");
var pt2 = document.getElementById("pt2");
var pm1 = document.getElementById("pm1");
var ps1 = document.getElementById("ps1");
var pm2 = document.getElementById("pm2");
var ps2 = document.getElementById("ps2");

p1.addEventListener("click", player1click);
p2.addEventListener("click", player2click);

var sta = document.getElementById("standard");
var inc = document.getElementById("increment");
var bvi = document.getElementById("bvi");


sta.addEventListener("click", selectsta);
inc.addEventListener("click", selectinc);



var game = {};
game.started = false;
game.end = false;

var time1 = {};
var time2 = {};

game.settings = {};
game.settings.mode = "standard";
game.settings.startingtime = 10 * 60;
game.settings.bvi = 10;






function player1click(){
	if (game.started == false && game.end == false){
		game.started = true;
		game.turn = 1;
	}
	if (game.turn == 1 && game.end == false){
		console.log("clicked2");
		game.turn = 2
		p1.innerHTML = "";
		p2.innerHTML = "End Turn";
		if(time1.byomi == true){
			time1.time = game.settings.bvi;
			pm1.innerHTML = format(Math.floor(time1.time / 60));
			ps1.innerHTML = format(Math.floor(time1.time % 60));
		}
		time2.interval = setInterval(countdown2, 1000);
		clearInterval(time1.interval);
	}
}



function player2click(){
	if (game.started == false && game.end == false){
		game.started = true;
		game.turn = 2;
	}
	if (game.turn == 2 && game.end == false){
		console.log("clicked2");
		game.turn = 1
		p2.innerHTML = "";
		p1.innerHTML = "End Turn";
		if(time2.byomi == true){
			time2.time = game.settings.bvi;
			pm2.innerHTML = format(Math.floor(time2.time / 60));
			ps2.innerHTML = format(Math.floor(time2.time % 60));
		}
		time1.interval = setInterval(countdown1, 1000);
		clearInterval(time2.interval);
	}
	
}

function countdown1(){
	
	if (time1.time > 0){
		time1.time -= 1;
		
		console.log("running");
		
	}
	if(time1.time == 0){
			if(time1.byomi == true){
				game.end = true;
				pt1.style.color = "red";
			}else {
				pt1.style.color = "darkorange";
				time1.byomi = true;
				time1.time = game.settings.bvi;
			}
		}
	pm1.innerHTML = format(Math.floor(time1.time / 60));
	ps1.innerHTML = format(Math.floor(time1.time % 60));
}

function countdown2(){
	
	if (time2.time > 0){
		time2.time -= 1;
		
		console.log("running");
		
	}
	if(time2.time == 0){
			if(time2.byomi == true){
				game.end = true;
				pt2.style.color = "red";
			}else {
				pt2.style.color = "darkorange";
				time2.byomi = true;
				time2.time = game.settings.bvi;
			}
		}
	pm2.innerHTML = format(Math.floor(time2.time / 60));
	ps2.innerHTML = format(Math.floor(time2.time % 60));
}

function format(x){
	if (x < 10){
		return "0" + x;
	}
	else return x;
}


function setup(seconds, bvi, byomi){
	min = Math.floor(seconds / 60);
	sec = Math.floor(seconds % 60);
	
	if (byomi == "standard"){
		game.byomi = true;
		game.settings.bvi = bvi;
	}else{
		game.byomi = false;
		game.settings.increment = bvi;
	}
	
	time1.time = seconds;
	time1.byomi = false;
	time2.time = seconds;
	time2.byomi = false;
	
	pm1.innerHTML = format(Math.floor(time1.time / 60));
	ps1.innerHTML = format(Math.floor(time1.time % 60));
	pm2.innerHTML = format(Math.floor(time2.time / 60));
	ps2.innerHTML = format(Math.floor(time2.time % 60));
	
}


var clock = document.getElementById("clock");
var settings = document.getElementById("settings");

function show(x){
	clock.style.display = "none";
	settings.style.display = "none";

	x.style.display = "block";
}

var btnset = document.getElementById("btnsettings");
var btnsave = document.getElementById("save");

btnset.addEventListener("click", gotosettings);
save.addEventListener("click", gotoclock);

function selectsta(){
	bvi.innerHTML = "Byomi";
	game.settings.mode = "standard";
}

function selectinc(){
	bvi.innerHTML = "Increment";
	game.settings.mode = "increment";
}

var settingstartingtime = document.getElementById("sst");
var settingbvi = document.getElementById("sbvi");

function gotosettings(){
	var temp1 = format(Math.floor(game.settings.startingtime / 60));
	var temp2 = format(Math.floor(game.settings.startingtime % 60));
	settingstartingtime.innerHTML = temp1 + ":" + temp2;
	var temp3 = format(Math.floor(game.settings.bvi / 60));
	var temp4 = format(Math.floor(game.settings.bvi % 60));
	settingbvi.innerHTML = temp3 + ":" + temp4;
	
	
	show(settings);
}

function gotoclock(){
	
	setup(game.settings.startingtime, game.settings.bvi, game.settings.mode);
	clearInterval(time1.interval);
	clearInterval(time2.interval);
	
	p1.innerHTML = "Start";
	p2.innerHTML = "Start";
	
	game.started = false;
	game.end = false;
	
	show(clock);
	
}

var btnsstup = document.getElementById("sstup");
var btnsstdown = document.getElementById("sstdown");
var btnbviup = document.getElementById("bviup");
var btnbvidown = document.getElementById("bvidown");


btnsstup.addEventListener("click", sstup);
btnsstdown.addEventListener("click", sstdown);
btnbviup.addEventListener("click", bviup);
btnbvidown.addEventListener("click", bvidown);

function sstup(){
	game.settings.startingtime += 60;
	var temp1 = format(Math.floor(game.settings.startingtime / 60));
	var temp2 = format(Math.floor(game.settings.startingtime % 60));
	settingstartingtime.innerHTML = temp1 + ":" + temp2;
	
}

function sstdown(){
	if (game.settings.startingtime > 0){
		game.settings.startingtime -= 60;
		var temp1 = format(Math.floor(game.settings.startingtime / 60));
		var temp2 = format(Math.floor(game.settings.startingtime % 60));
		settingstartingtime.innerHTML = temp1 + ":" + temp2;
	}
}

function bviup(){
	game.settings.bvi += 5;
	var temp3 = format(Math.floor(game.settings.bvi / 60));
	var temp4 = format(Math.floor(game.settings.bvi % 60));
	settingbvi.innerHTML = temp3 + ":" + temp4;
}
function bvidown(){
	if (game.settings.bvi > 0){
		game.settings.bvi -= 5;
		var temp3 = format(Math.floor(game.settings.bvi / 60));
		var temp4 = format(Math.floor(game.settings.bvi % 60));
		settingbvi.innerHTML = temp3 + ":" + temp4;
	}
}

gotosettings();