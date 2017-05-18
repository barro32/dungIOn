var socket;
var connected = false;

var player;
var players = [];

var w = 10;
var squares = [];

var input = [];

var ui = document.getElementsByClassName('ui');

function setup() {
	createCanvas(300, 300);
	noLoop();

	socket = io.connect('http://localhost:3000');

	socket.on('tick', function(data) {
		squares = data.squares;
		players = data.players;
		connected = true;
		redraw();
	});
}

function keyPressed() {
	if(keyCode === LEFT_ARROW)
		input.push('left');
	if(keyCode === RIGHT_ARROW)
		input.push('right');
	if(keyCode === UP_ARROW)
		input.push('up');
	if(keyCode === DOWN_ARROW)
		input.push('down');
}
function keyReleased() {
	if(keyCode === LEFT_ARROW) {
		for(var i = input.length-1; i>=0; i--) {
			if(input[i] == 'left')
				input.splice(i, 1);
		}
	}	
	if(keyCode === RIGHT_ARROW)
		for(var i = input.length-1; i>=0; i--) {
			if(input[i] == 'right')
				input.splice(i, 1);
		}
	if(keyCode === UP_ARROW)
		for(var i = input.length-1; i>=0; i--) {
			if(input[i] == 'up')
				input.splice(i, 1);
		}
	if(keyCode === DOWN_ARROW)
		for(var i = input.length-1; i>=0; i--) {
			if(input[i] == 'down')
				input.splice(i, 1);
		}
}

function draw() {
	background(0);
	if(connected) {

		for(var i = 0; i < players.length; i++) {
			if(socket.id === players[i].id) {
				player = players[i];
				drawUI();

				if(input.length) {
					socket.emit('input', {playerID: socket.id, input: input[input.length-1]});
				}
			}
		}
		for(var i = 0; i < squares.length; i++) {
			drawSquare(squares[i]);
		}
		for(var i = 0; i < players.length; i++) {
			drawPlayer(players[i]);
		}
	}
}

function drawSquare(square) {
	var x = square.x*w;
	var y = square.y*w;
	stroke(255);
	noFill();
	rect(x, y, w, w);
}

function drawPlayer(player) {
	fill(200);
	rect(player.square.x*w, player.square.y*w, w, w);
}

function drawUI() {
	ui.lvl.innerText = player.lvl;
	ui.xp.innerText = player.xp;
	ui.hp.innerText = player.hp;
	ui.wep.innerText = player.wep;
	ui.spd.innerText = player.lvl;
}