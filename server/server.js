var state = require('./state')
var Player = require('./Player');

state.createMap();

var express = require('express');
var app = express();

var server = app.listen(3000);

app.use(express.static('../client'));

var io = require('socket.io')(server);

setInterval(tick, 100);

function tick() {
	attack();
	io.sockets.emit('tick', state);
}

io.sockets.on('connection', function(socket) {
	var randomSq = Math.round(Math.random(0)*(state.squares.length-1));
	state.players.push(new Player(socket.id, randomSq));

	socket.on('input', function(state) {
		movePlayer(state.playerID, state.input);
	});
});

function nextSqIdx(idx, direction) {
	var nextIdx = false;
	switch(direction) {
		case 'left':
			if(state.squares[idx].x > 0) {
				nextIdx = idx-1;
				break;
			}
		case 'right':
			if(state.squares[idx].x < cols-1) {
				nextIdx = idx+1;
				break;
			} else {
				nextIdx = false;
			}
		case 'up':
			if(state.squares[idx].y > 0) {
				nextIdx = idx-rows;
				break;
			}
		case 'down':
			if(state.squares[idx].y < rows-1) {
				nextIdx = idx+rows;
				break;
			}
		default: 
			nextIdx = false;
	}
	return nextIdx;
}

function movePlayer(playerID, direction) {

	for(var i = 0; i < state.players.length; i++) {
		if(playerID === state.players[i].id) {

			var player = state.players[i];

			var nextIdx = nextSqIdx(player.sqIdx, direction);

			if(nextIdx && !state.squares[nextIdx].occupied) {
				move(player, nextIdx);
			}
			break;
		}
	}

	function move(player, newIdx) {
		player.square.occupied = false;
		player.sqIdx = newIdx;
		player.square = state.squares[player.sqIdx];
		player.square.occupied = {type: 'player', value: player.id};
	}
}

function attack() {
	for(var i = 0; i < state.players.length; i++) {

	}
}