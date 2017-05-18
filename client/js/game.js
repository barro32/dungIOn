
var player;

var players = [];

var cols, rows;
var w = 10;
var squares = [];

var ui = document.getElementsByClassName('ui');

function setup() {
	createCanvas(300, 300);

	cols = floor(width/w);
	rows = floor(height/w);

	for(var y = 0; y < rows; y++) {
		for(var x = 0; x < cols; x++) {
			squares.push(new Square(x, y));
		}
	}

	players[0] = new Player(0);
	players[0].hp = 100;
	players[1] = new Player(12);

}

function draw() {
	frameRate(2);
	background(0);
	for(var i = 0; i < squares.length; i++) {
		squares[i].show()
	}
	players[0].update();
	for(var i = players.length-1; i>=0; i--) {
		if(players[i].hp <= 0) {
			// drop bonus
			players[i].square.occupied = false;
			players.splice(i, 1);
		} else {
			players[i].show();
			players[i].attack();
		}
	}


	ui.lvl.innerText = players[0].lvl;
	ui.xp.innerText = players[0].xp;
	ui.hp.innerText = players[0].hp;
	ui.wep.innerText = players[0].wep;
	ui.spd.innerText = players[0].lvl;
}