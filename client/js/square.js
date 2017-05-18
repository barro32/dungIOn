function Square(x, y) {
	this.x = x;
	this.y = y;

	this.occupied = false;

	this.show = function() {
		var x = this.x*w;
		var y = this.y*w;
		stroke(255);
		noFill();
		rect(x, y, w, w);
	}
}