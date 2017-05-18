var state = require('./state');

function Player(id, sqIdx) {
	this.id = id;
	this.sqIdx = sqIdx
	this.square = state.squares[sqIdx];
	this.square.occupied = {type: 'player', vaule: id};
	this.lvl = 1;
	this.xp = 0;
	this.hp = 100;
	this.wep = 1;
	this.spd = 1;
}

module.exports = Player;