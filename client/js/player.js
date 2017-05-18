function Player(idx) {

	this.sqIdx = idx;
	this.square = squares[this.sqIdx];
	this.square.occupied = this;
	this.lvl = 1;
	this.wep = 1;
	this.spd = 1;
	this.hp = 10;
	this.xp = 0;

	var left;
	var right;
	var up;
	var down;

	this.update = function() {
		left = this.sqIdx-1;
		right = this.sqIdx+1;
		up = this.sqIdx-rows;
		down = this.sqIdx+rows;
		if(keyIsDown(LEFT_ARROW) && squares[left])
			this.move(left);
		if(keyIsDown(RIGHT_ARROW) && squares[right])
			this.move(right);
		if(keyIsDown(UP_ARROW) && squares[up])
			this.move(up);
		if(keyIsDown(DOWN_ARROW) && squares[down])
			this.move(down);
	}

	this.attack = function() {
		if(squares[left] && squares[left].occupied) {
			if(squares[left].occupied.hp <= this.lvl * this.wep) {
				this.xp+= squares[left].occupied.lvl;
			}
			squares[left].occupied.hp-= this.lvl * this.wep;
		}
		if(squares[right] && squares[right].occupied) {
			if(squares[right].occupied.hp <= this.lvl * this.wep) {
				this.xp+= squares[right].occupied.lvl;
			}
			squares[right].occupied.hp-= this.lvl * this.wep;
		}
		if(squares[up] && squares[up].occupied) {
			if(squares[up].occupied.hp <= this.lvl * this.wep) {
				this.xp+= squares[up].occupied.lvl;
			}
			squares[up].occupied.hp-= this.lvl * this.wep;
		}
		if(squares[down] && squares[down].occupied) {
			if(squares[down].occupied.hp <= this.lvl * this.wep) {
				this.xp+= squares[down].occupied.lvl;
			}
			squares[down].occupied.hp-= this.lvl * this.wep;
		}
	}

	this.move = function(newSqIdx) {
		if(!squares[newSqIdx].occupied) {
			this.square.occupied = false;
			this.sqIdx = newSqIdx;
			this.square = squares[this.sqIdx];
			this.square.occupied = this;
		}
	}

	this.show = function() {
		if(this.hp > 0) {
			fill(200);
			rect(this.square.x*w, this.square.y*w, 10, 10);
		} else {
			this.occupied = false;
		}
	}
}