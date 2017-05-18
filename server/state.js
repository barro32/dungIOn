var Square = require('./square');

var state = {
	players: [],
	squares: [],

	cols: 30,
	rows: 30,
	createMap: function() {
		for(var y = 0; y < state.rows; y++) {
			for(var x = 0; x < state.cols; x++) {
				state.squares.push(new Square(x, y));
			}
		}
	}
}

module.exports = state;